/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
import { useState } from "react";

import {
    AutoComplete as AutoCompletePR,
    AutoCompleteProps as AutoCompletePropsPR,
    AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

import { useLoading, useHttp } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

export type AutoCompleteProps = AutoCompletePropsPR & {
    url: string;
};

export const AutoComplete = ({ url, ...props }: AutoCompleteProps) => {
    const [data, setData] = useState([]);
    const { httpGet } = useHttp();
    const [loading, suspend] = useLoading();

    async function fetchData(event: AutoCompleteCompleteEvent) {
        if (!url || props?.disabled) return;
        const handlers: HttpResponseHandler<{ count: number; results: any }> = {
            200: async ({ data }) => {
                const { results = [] } = data || {};
                setData(results);
            },
        };
        const controller = new AbortController();
        suspend(async () => await httpGet({ url: url + event.query, signal: controller.signal }, handlers));
        return () => controller.abort();
    }

    return (
        <AutoCompletePR
            suggestions={data}
            completeMethod={fetchData}
            disabled={loading || props.disabled}
            delay={1500}
            {...props}
        />
    );
};
