import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";

import { FormButtons } from "@/components/form-buttons";
import { FormGrid } from "@/components/form-grid";
import { Label } from "@/components/label";
import { Dialog } from "@/components/primereact/dialog";
import { InputText } from "@/components/primereact/inputtext";
import { handleFormErrors } from "@/helpers/handle-form-errors";
import { useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { Observium } from "@/types";

type FormValues = {
    id?: string;
    name: string;
};

const defaultValues: FormValues = {
    name: "",
};

type ModalAddProjectProps = {
    onSave: () => Promise<void>;
};

export type ModalAddWorkspaceRef = {
    open(workspace?: Observium.Workspace, readOnly?: boolean): void;
};

const Modal = ({ onSave }: ModalAddProjectProps, ref: Ref<ModalAddWorkspaceRef>) => {
    const [visible, setVisible] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [readOnly, setReadOnly] = useState(false);
    const [loading, suspend] = useLoading();
    const { httpPost, httpPatch } = useHttp();

    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
        reset,
    } = useForm<FormValues>({ defaultValues });

    const onSubmit = (values: FormValues) => {
        const handlers: HttpResponseHandler = {
            success: async () => {
                await onSave();
                close();
            },
            422: ({ err }) => {
                const { errors } = err!;
                const formErrors = handleFormErrors<FormValues>(errors);
                Object.entries(formErrors).forEach(([k, v]) => {
                    setError(k as keyof FormValues, { message: v });
                });
            },
        };
        if (addMode) suspend(async () => await httpPost({ url: "/organizations/workspaces", body: values }, handlers));
        else suspend(async () => await httpPatch({ url: `/organizations/workspaces/${values.id}`, body: values }, handlers));
    };

    const open = (workspace?: Observium.Workspace, readOnly?: boolean) => {
        setReadOnly(!!readOnly);
        setVisible(true);
    };

    const close = () => {
        reset();
        setAddMode(true);
        setReadOnly(false);
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({ open }));

    const header = addMode ? "Incluindo workspace" : "Editando workspace";

    return (
        <Dialog header={header} visible={visible} onHide={close} style={{ width: "50vw" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGrid.Row>
                    <FormGrid.Col>
                        <Label htmlFor="name" required>
                            Nome da workspace
                        </Label>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="name"
                                    {...field}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </FormGrid.Col>
                </FormGrid.Row>
                <FormButtons loading={loading} resetButton={{ onClick: close }} />
            </form>
        </Dialog>
    );
};

export const ModalAddWorkspace = forwardRef(Modal);
