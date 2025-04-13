/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, Ref } from "react";

import {
    DataTable,
    DataTableBaseProps,
    Column,
    DataTableValueArray,
    ColumnProps,
    DataTableFilterMeta,
    DataTablePageEvent,
    DataTableSortEvent,
    DataTableFilterEvent,
} from "@/components/primereact/datatable";
import { formatCurrency, formatDate } from "@/helpers/formatters";
import { useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

export type ColumnTableProps = Omit<ColumnProps, "field"> & {
    field: "_expander" | "_actions" | string;
    format?: "currency" | "date";
    dateFormat?: string;
};

type TableProps<TValue extends DataTableValueArray> = DataTableBaseProps<TValue> & {
    url?: string;
    columns: ColumnTableProps[];
    afterSearch?: (data: any) => Promise<any>;
};

type LazyTableState = {
    first: number;
    rows: number;
    page: number;
    sortField?: string;
    sortOrder?: 0 | 1 | -1 | null;
    filters?: DataTableFilterMeta;
};

export type TableRef = {
    findData: () => Promise<void>;
};

const Component = <TValue extends DataTableValueArray>(
    { columns, url, afterSearch, filters, ...props }: TableProps<TValue>,
    ref: Ref<TableRef>,
) => {
    const [data, setData] = useState<TValue>();
    const [records, setRecords] = useState(0);
    const [lazyParams, setLazyParams] = useState<LazyTableState>({
        first: 0,
        rows: 20,
        page: 0,
        filters,
    });
    const [loading, suspend] = useLoading();
    const { httpGet } = useHttp();

    const findData = useCallback(
        async (signal: AbortSignal) => {
            if (!url) return;
            const [urlBase, options] = url.split("?");
            const limit = lazyParams.rows || 20;
            const offset = limit * lazyParams.page || 0;
            const params: Record<string, unknown> = { limit, offset };
            options?.split("&").forEach((opt) => {
                const [k, v] = opt.split("=");
                params[k] = v;
            });
            if (lazyParams.filters) {
                Object.entries(lazyParams.filters).forEach(([col, filter]) => {
                    const [constraint] = filter.constraints;
                    if (constraint.value instanceof Date)
                        params[col] = formatDate(constraint.value, "yyyy-MM-ddT03:00:00:00");
                    else params[col] = constraint.value;
                });
            }
            const handlers: HttpResponseHandler<{ count: number; results: any }> = {
                200: async ({ data }) => {
                    const { count, results } = data!;
                    const processedData = typeof afterSearch === "function" ? await afterSearch(results) : results;
                    setData(processedData);
                    setRecords(count);
                },
            };
            suspend(async () => await httpGet({ url: urlBase, params, signal }, handlers));
        },
        [url, httpGet, suspend, lazyParams, afterSearch],
    );

    const fetch = useCallback(async () => {
        const controller = new AbortController();
        await findData(controller.signal);
        return () => controller.abort();
    }, [findData]);

    useImperativeHandle(ref, () => ({
        findData: async () => {
            await fetch();
        },
    }));

    useEffect(() => {
        if (!props.value) fetch();
        else setData(props.value);
    }, [props.value, fetch, findData]);

    const dynamicColumns = columns.map((col) => {
        const { align, field, format, dateFormat = "dd/MM/yyyy", ...rest } = col;
        let alignColumn = field === "_actions" ? "center" : align;
        if (field === "_expander") {
            rest.expander = true;
            rest.style = { width: "5rem" };
        }
        const getNestedProp = (rowData: Record<string, any>, field: string) =>
            field.split(".").reduce((obj, key) => (obj && key in obj ? obj[key] : null), rowData);
        if (format === "currency") {
            alignColumn = "right";
            rest.body = (e) => formatCurrency(getNestedProp(e, field) as unknown as number, false);
        }
        if (format === "date") {
            rest.body = (e) => formatDate(getNestedProp(e, field) as unknown as Date, dateFormat);
        }
        return <Column key={field} field={field} align={alignColumn} {...rest} />;
    });

    const onPage = (event: DataTablePageEvent) => {
        setLazyParams((old) => ({ ...old, ...event }));
    };

    const onSort = (event: DataTableSortEvent) => {
        setLazyParams((old) => ({ ...old, ...event }));
    };

    const onFilter = (event: DataTableFilterEvent) => {
        event["first"] = 0;
        setLazyParams((old) => ({ ...old, ...event }));
    };

    return (
        <DataTable
            value={data}
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            paginatorClassName="background-pink"
            currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords}"
            rowsPerPageOptions={[10, 20, 50, 100]}
            loading={loading}
            emptyMessage="Nenhum registro encontrado."
            totalRecords={records}
            rows={lazyParams?.rows || 20}
            first={lazyParams.first}
            onPage={onPage}
            onSort={onSort}
            sortField={lazyParams.sortField}
            sortOrder={lazyParams.sortOrder}
            onFilter={onFilter}
            filters={lazyParams.filters}
            size="small"
            lazy={!!url}
            {...props}
        >
            {dynamicColumns}
        </DataTable>
    );
};

export const Table = forwardRef(Component);
