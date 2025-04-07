import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";

import { BUTTON_SUBMIT } from "@/assets/constants/presets";
import { Label } from "@/components/label";
import { Button } from "@/components/primereact/button";
import { Dialog } from "@/components/primereact/dialog";
import { InputText } from "@/components/primereact/inputtext";
import { useAuth } from "@/features/auth";
import { useLoading, useHttp, useToast } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { SharkPrinter } from "@/types";

export type ModalUpdateUserRef = {
    open(): void;
};

type FormValues = {
    name: string;
};

const Modal = (_: void, ref: Ref<ModalUpdateUserRef>) => {
    const { user, updateUser } = useAuth();
    const defaultValues: FormValues = {
        name: user?.name || "",
    };

    const [visible, setVisible] = useState(false);
    const [loading, suspend] = useLoading();
    const { showSuccess } = useToast();
    const { httpPut } = useHttp();

    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm<FormValues>({ defaultValues });

    const close = () => {
        setVisible(false);
    };

    const open = () => {
        setVisible(true);
    };

    useImperativeHandle(ref, () => ({ open }));

    const onSubmit = async (data: FormValues) => {
        const handlers: HttpResponseHandler<SharkPrinter.User> = {
            200: ({ data }) => {
                const { name } = data!;
                showSuccess({
                    summary: "Sucesso.",
                    detail: "Dados alterados com sucesso.",
                    life: 2000,
                });
                updateUser({ ...user!, name });
                close();
            },
            422: ({ err }) => {
                const { errors } = err!;
                Object.entries(errors).forEach(([k, v]) => {
                    setError(k as keyof FormValues, { message: (v as string[]).join(" ") });
                });
            },
        };
        suspend(async () => await httpPut({ url: "/users", body: data }, handlers));
    };

    return (
        <Dialog header="Meu perfil" visible={visible} onHide={close} style={{ width: "30vw" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <Label htmlFor="name" required label="Nome" />
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <InputText
                                    id="current-password"
                                    {...field}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </div>
                </div>
                <Button {...BUTTON_SUBMIT} label="Alterar" loading={loading} />
            </form>
        </Dialog>
    );
};

export const ModalUpdateUser = forwardRef(Modal);
