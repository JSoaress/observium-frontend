/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";

import axios, { GenericAbortSignal } from "axios";

import { useAuth } from "@/features/auth";

import { useToast } from ".";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type HttpRequest = {
    url: string;
    body?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string | string[]>;
};

type HttpRequestFull = HttpRequest & {
    method: HttpMethod;
    signal?: GenericAbortSignal;
};

type HttpGetRequest = HttpRequest & {
    signal: GenericAbortSignal;
};

type ResponseOrError<D> = {
    err?: {
        message: string;
        [x: string]: any;
    };
    data?: D;
};

type SuccessResponseHandler<D> = {
    statusCode: number;
    data?: D;
};

type ErrorResponseHandler = {
    statusCode: number;
    err?: Error;
};

export type HttpResponseHandler<D = any> = {
    [x: number]: (response: ResponseOrError<D>) => Promise<void> | void;
    success?: (response: SuccessResponseHandler<D>) => Promise<void> | void;
    error?: (response: ErrorResponseHandler) => Promise<void> | void;
};

const api = axios.create({
    baseURL: process.env.API_URL,
});

export const useHttp = () => {
    const { accessToken } = useAuth();
    const { showWarning, showError } = useToast();

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use((config) => {
            if (!config.headers?.Authorization && accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });
        return () => api.interceptors.request.eject(requestIntercept);
    }, [accessToken]);

    const request = useCallback(
        async <D = any,>({ body: data, ...input }: HttpRequestFull, handlers?: HttpResponseHandler<D>) => {
            try {
                const { status, data: output = {} as D } = await api.request<D>({ ...input, data });
                if (!handlers) return;
                const handler = handlers[status];
                if (handlers.success) handlers.success({ statusCode: status, data: output });
                else if (handler) handler({ data: output });
            } catch (error) {
                if (error instanceof axios.AxiosError) {
                    const defaultHandlers: HttpResponseHandler = {
                        401: () => {
                            showWarning({
                                summary: "Acesso expirado!",
                                detail: "Você não está autenticado, faça login novamente.",
                                life: 2000,
                            });
                        },
                        403: () => {
                            showWarning({
                                summary: "Aviso!",
                                detail: "Você não tem permissão para acessar o recurso solicitado.",
                                life: 2000,
                            });
                        },
                        404: () => {
                            showWarning({
                                summary: "Opsss",
                                detail: "O recurso não foi encontrado.",
                                life: 2000,
                            });
                        },
                        500: () => {
                            if (error.code === "ERR_CONNECTION_REFUSED") {
                                showError({
                                    summary: "Erro :(",
                                    detail: "A API não está indisponível no momento.",
                                    life: 2000,
                                });
                            } else if (error.code !== "ERR_CANCELED")
                                showError({
                                    summary: "Erro :(",
                                    detail: "Desculpe, não foi possível completar a requisição.",
                                    life: 2000,
                                });
                        },
                    };
                    const { status = 500, data } = error.response || {};
                    const errorHandlers: HttpResponseHandler = { ...defaultHandlers, ...handlers };
                    if (!errorHandlers) return;
                    const handler = errorHandlers[status];
                    if (errorHandlers.error) errorHandlers.error({ statusCode: status, err: data });
                    else if (handler) handler({ err: data });
                } else {
                    showError({
                        summary: "Erro :(",
                        detail: `Erro ao enviar a requisição. MOTIVO: ${error}`,
                        life: 2000,
                    });
                }
            }
        },
        [showError, showWarning],
    );

    const httpGet = useCallback(
        async <D = any,>(input: HttpGetRequest, handlers?: HttpResponseHandler<D>) => {
            await request({ ...input, method: "get" }, handlers);
        },
        [request],
    );

    const httpPost = useCallback(
        async <D = any,>(input: HttpRequest, handlers?: HttpResponseHandler<D>) => {
            await request({ ...input, method: "post" }, handlers);
        },
        [request],
    );

    const httpPut = useCallback(
        async <D = any,>(input: HttpRequest, handlers?: HttpResponseHandler<D>) => {
            await request({ ...input, method: "put" }, handlers);
        },
        [request],
    );

    const httpPatch = useCallback(
        async <D = any,>(input: HttpRequest, handlers?: HttpResponseHandler<D>) => {
            await request({ ...input, method: "patch" }, handlers);
        },
        [request],
    );

    const httpDelete = useCallback(
        async <D = any,>(input: HttpRequest, handlers?: HttpResponseHandler<D>) => {
            await request({ ...input, method: "delete" }, handlers);
        },
        [request],
    );

    return { httpGet, httpPost, httpPut, httpPatch, httpDelete };
};
