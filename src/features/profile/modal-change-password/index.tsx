import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";

import { BUTTON_SUBMIT } from "@/assets/constants/presets";
import { Label } from "@/components/label";
import { Button } from "@/components/primereact/button";
import { Dialog } from "@/components/primereact/dialog";
import { Password } from "@/components/primereact/password";
import { useAuth } from "@/features/auth";
import { useHttp, useLoading, useToast } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

export type ModalChangePasswordRef = {
    open(): void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

type FormValues = {
    currentPassword: string;
    newPassword: string;
};

const defaultValues: FormValues = {
    currentPassword: "",
    newPassword: "",
};

const Modal = (props: Props, ref: Ref<ModalChangePasswordRef>) => {
    const [visible, setVisible] = useState(false);
    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm<FormValues>({ defaultValues });
    const { logout } = useAuth();
    const [loading, suspend] = useLoading();
    const { httpPost } = useHttp();
    const { showSuccess } = useToast();

    const open = () => {
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({ open }));

    const onSubmit = async (data: FormValues) => {
        const handlers: HttpResponseHandler = {
            204: () => {
                showSuccess({
                    summary: "Sucesso.",
                    detail: "Senha alterada com sucesso. Será necessário refazer o login.",
                    life: 2000,
                });
                setTimeout(async () => {
                    await logout();
                }, 2000);
            },
            401: ({ err }) => {
                setError("currentPassword", { message: err?.message });
            },
            422: ({ err }) => {
                if (!err?.message.startsWith("Erro de validação")) {
                    setError("newPassword", { message: err?.message });
                }
            },
        };
        suspend(async () => await httpPost({ url: "/users/change-password", body: data }, handlers));
    };

    return (
        <Dialog header="Alterar senha" visible={visible} onHide={close} style={{ width: "20vw" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <Label htmlFor="current-pass" required label="Senha atual" />
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Password
                                    inputId="current-password"
                                    {...field}
                                    toggleMask
                                    feedback={false}
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.currentPassword && <small className="p-error">{errors.currentPassword.message}</small>}
                    </div>
                </div>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <Label htmlFor="new-pass" required label="Nova senha" />
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Password
                                    inputId="new-password"
                                    {...field}
                                    placeholder="Senha"
                                    toggleMask
                                    className={classNames({ "p-invalid": fieldState.invalid })}
                                />
                            )}
                        />
                        {errors.newPassword && <small className="p-error">{errors.newPassword.message}</small>}
                    </div>
                </div>
                <Button {...BUTTON_SUBMIT} label="Alterar" loading={loading} />
            </form>
        </Dialog>
    );
};

export const ModalChangePassword = forwardRef(Modal);
