import { forwardRef, useImperativeHandle, useState, Ref } from "react";
import { Controller, useForm } from "react-hook-form";

import copy from "clipboard-copy";
import { classNames } from "primereact/utils";

import { YES_NO_OPTIONS } from "@/assets/constants/constants";
import { FormButtons } from "@/components/form-buttons";
import { FormGrid } from "@/components/form-grid";
import { Label } from "@/components/label";
import { Dialog } from "@/components/primereact/dialog";
import { InputText } from "@/components/primereact/inputtext";
import { SelectButton } from "@/components/primereact/selectbutton";
import { handleFormErrors } from "@/helpers/handle-form-errors";
import { useHttp, useLoading, useToast } from "@/hooks";
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
    const { showInfo } = useToast();

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
            header="Incluindo chave de API"
            visible={visible}
            onHide={close}
            style={{ width: "35vw" }}
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
                        <Label htmlFor="active">Ativa?</Label>
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
                <div className="pt-3">
                    <span>Copie sua nova chave agora. Você não consegui-rá vê-la novamente.</span>
                    <pre className="app-code">
                        <code>
                            <div className="flex flex-wrap align-items-center justify-content-between">
                                {newAPIKey}
                                <button
                                    type="button"
                                    className="p-link"
                                    onClick={async () => {
                                        await copy(newAPIKey);
                                        showInfo({
                                            summary: "Info",
                                            detail: "Chave de API copiada com sucesso.",
                                            life: 2000,
                                        });
                                    }}
                                >
                                    <i className={`pi pi-fw pi-copy text-xl text-blue-500`} />
                                </button>
                            </div>
                        </code>
                    </pre>
                </div>
            )}
        </Dialog>
    );
};

export const ModalAddAPIKey = forwardRef(Modal);
