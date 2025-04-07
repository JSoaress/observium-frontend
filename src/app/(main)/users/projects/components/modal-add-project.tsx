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
import { SharkDev } from "@/types";

type FormValues = {
    id?: string;
    name: string;
    description: string;
    slug: string;
    url: string;
};

const defaultValues: FormValues = {
    name: "",
    description: "",
    slug: "",
    url: "",
};

type ModalAddProjectProps = {
    onSave: () => Promise<void>;
};

export type ModalAddProjectRef = {
    open(plan?: SharkDev.PlanDetailed, readOnly?: boolean): void;
};

const Modal = ({ onSave }: ModalAddProjectProps, ref: Ref<ModalAddProjectRef>) => {
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
        if (addMode) suspend(async () => await httpPost({ url: "/projects", body: values }, handlers));
        else suspend(async () => await httpPatch({ url: `/projects/${values.id}`, body: values }, handlers));
    };

    const open = (plan?: SharkDev.PlanDetailed, readOnly?: boolean) => {
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

    const header = addMode ? "Incluindo projeto" : "Editando projeto";

    return (
        <Dialog
            header={header}
            visible={visible}
            onHide={close}
            style={{ width: "50vw" }}
            headerClassName="background-pink"
            contentClassName="background-pink"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGrid.Row>
                    <FormGrid.Col md="3">
                        <Label htmlFor="name" required>
                            Nome do projeto
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
                    <FormGrid.Col md="9">
                        <Label htmlFor="description">Descrição</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="description"
                                    {...field}
                                    disabled={readOnly}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </FormGrid.Col>
                    <FormGrid.Col md="3">
                        <Label htmlFor="slug" required>
                            Slug
                        </Label>
                        <Controller
                            control={control}
                            name="slug"
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="slug"
                                    {...field}
                                    disabled={readOnly}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.slug && <small className="p-error">{errors.slug.message}</small>}
                    </FormGrid.Col>
                    <FormGrid.Col md="4">
                        <Label htmlFor="url">Url</Label>
                        <Controller
                            control={control}
                            name="url"
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="url"
                                    {...field}
                                    disabled={readOnly}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.url && <small className="p-error">{errors.url.message}</small>}
                    </FormGrid.Col>
                </FormGrid.Row>
                <FormButtons loading={loading} resetButton={{ onClick: close }} />
            </form>
        </Dialog>
    );
};

export const ModalAddProject = forwardRef(Modal);
