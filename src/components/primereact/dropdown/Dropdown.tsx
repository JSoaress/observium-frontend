/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
import { useCallback, useEffect, useState } from "react";

import { Dropdown as DropdownPR, DropdownProps as DropdownPropsPR } from "primereact/dropdown";

import { useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

type DropdownProps = DropdownPropsPR & {
    url?: string;
    fetch?: boolean;
    onData?: (data: any) => void;
};

export const Dropdown = ({ options, url, onData, fetch = true, placeholder = "Selecione", ...props }: DropdownProps) => {
    const [data, setData] = useState(options);
    const [loading, suspend] = useLoading();
    const { httpGet } = useHttp();

    const fetchData = useCallback(
        async (signal: AbortSignal) => {
            if (!url || !fetch) return null;

            const handlers: HttpResponseHandler<{ count: number; results: any }> = {
                200: async ({ data }) => {
                    const { results = [] } = data || {};
                    setData(results);
                    if (onData) onData(results);
                },
            };
            suspend(async () => await httpGet({ url, signal }, handlers));
        },
        [url, fetch, suspend, httpGet, onData],
    );

    useEffect(() => {
        if (options instanceof Array) setData(options);
        else {
            const controller = new AbortController();
            fetchData(controller.signal);
            return () => controller.abort();
        }
    }, [fetchData, options]);

    const customPlaceholder = !loading ? (
        placeholder
    ) : (
        <span>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "1rem", float: "right", marginTop: "3px" }} /> Buscando
            informações...
        </span>
    );

    return (
        <DropdownPR
            options={data}
            placeholder={customPlaceholder as string}
            emptyMessage="Nenhum registro disponível"
            emptyFilterMessage="Nenhum registro encontrado"
            showClear
            disabled={loading || props.disabled}
            {...props}
        />
    );
};
