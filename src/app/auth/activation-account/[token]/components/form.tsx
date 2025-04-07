"use client";
import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { APP_ROUTES } from "@/assets/constants/app-routes";
import { Button } from "@/components/primereact/button";
import { InputText } from "@/components/primereact/inputtext";
import { useHttp, useLoading, useToast } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

export const Form = () => {
    const params = useParams();

    const [token, setToken] = useState(params.token || "");
    const router = useRouter();
    const [loading, suspend] = useLoading();
    const { httpPost } = useHttp();
    const { showSuccess, showWarning } = useToast();

    async function handleSubmit() {
        const handlers: HttpResponseHandler = {
            204: () => {
                showSuccess({
                    summary: "Sucesso",
                    detail: "Conta ativada com sucesso.",
                    life: 2000,
                });
                setTimeout(() => router.push(APP_ROUTES.public.login), 2000);
            },
            400: () => {
                showWarning({
                    summary: "Falha",
                    detail: "O token de ativação não foi fornecido.",
                    life: 3000,
                });
            },
            401: () => {
                showWarning({
                    summary: "Falha",
                    detail: "O token de ativação fornecido não é válido.",
                    life: 3000,
                });
            },
            404: () => {
                showWarning({
                    summary: "Falha",
                    detail: "O token de ativação fornecido não existe.",
                    life: 3000,
                });
            },
        };
        suspend(async () => await httpPost({ url: `/users/activate/${token}` }, handlers));
    }

    return (
        <>
            <div className="flex align-items-center justify-content-center">
                <InputText
                    id="token"
                    type="text"
                    placeholder="Token de confirmação"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={{ padding: "1rem" }}
                    className="w-full md:w-30rem mb-5"
                />
            </div>
            <Button label="Confirmar" loading={loading} className="w-full text-xl p-3" onClick={handleSubmit} />
        </>
    );
};
