import { forwardRef, useImperativeHandle, useState, Ref } from "react";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";

import { YES_NO_OPTIONS } from "@/assets/constants/constants";
import { FormButtons } from "@/components/form-buttons";
import { FormGrid } from "@/components/form-grid";
import { Label } from "@/components/label";
import { Dialog } from "@/components/primereact/dialog";
import { InputText } from "@/components/primereact/inputtext";
import { SelectButton } from "@/components/primereact/selectbutton";
import { handleFormErrors } from "@/helpers/handle-form-errors";
import { useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { Observium } from "@/types";

type FormValues = {
    id?: string;
    alias: string;
    active: boolean;
};

const defaultValues: FormValues = {
    alias: "",
    active: true,
};

type ModalAddAPIKeyProps = {
    onSave: () => Promise<void>;
};

export type ModalAddAPIKeyRef = {
    open(): void;
};

const Modal = ({ onSave }: ModalAddAPIKeyProps, ref: Ref<ModalAddAPIKeyRef>) => {
    const [visible, setVisible] = useState(false);
    const [addMode, setAddMode] = useState(true);
    const [newAPIKey, setNewAPIKey] = useState<string>("");
    const [loading, suspend] = useLoading();
    const { httpPost } = useHttp();

    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
        reset,
    } = useForm<FormValues>({ defaultValues });

    const onSubmit = (values: FormValues) => {
        const handlers: HttpResponseHandler<Observium.APIKey> = {
            201: async ({ data }) => {
                const { key } = data!;
                setNewAPIKey(key);
            },
            422: ({ err }) => {
                const { errors } = err!;
                const formErrors = handleFormErrors<FormValues>(errors);
                Object.entries(formErrors).forEach(([k, v]) => {
                    setError(k as keyof FormValues, { message: v });
                });
            },
        };
        suspend(async () => await httpPost({ url: "/users/api-keys", body: values }, handlers));
    };

    const open = () => {
        setVisible(true);
    };

    const close = async () => {
        if (newAPIKey) await onSave();
        reset();
        setAddMode(true);
        setNewAPIKey("");
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({ open }));

    return (
        <Dialog
            header="Incluindo API Key"
            visible={visible}
            onHide={close}
            style={{ width: "50vw" }}
            headerClassName="background-pink"
            contentClassName="background-pink"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGrid.Row>
                    <FormGrid.Col md="10">
                        <Label htmlFor="alias" required>
                            Descrição
                        </Label>
                        <Controller
                            control={control}
                            name="alias"
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="alias"
                                    {...field}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.alias && <small className="p-error">{errors.alias.message}</small>}
                    </FormGrid.Col>
                    <FormGrid.Col md="2">
                        <Label htmlFor="active">Ativo?</Label>
                        <Controller
                            control={control}
                            name="active"
                            render={({ field, fieldState }) => (
                                <SelectButton
                                    id="active"
                                    {...field}
                                    disabled={addMode}
                                    options={YES_NO_OPTIONS}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.active && <small className="p-error">{errors.active.message}</small>}
                    </FormGrid.Col>
                </FormGrid.Row>
                <FormButtons loading={loading} resetButton={{ onClick: close }} />
            </form>
            {newAPIKey && (
                <div>
                    <span>
                        Sua nova chave de API é: <b>{newAPIKey}</b>. Copie e guarde-a em um local seguro, pois ela não será
                        visível novamente.
                    </span>
                </div>
            )}
        </Dialog>
    );
};

export const ModalAddAPIKey = forwardRef(Modal);
