"use client";
import { formatDate } from "@/helpers/formatters";

import { FormGrid } from "../form-grid";
import { Label } from "../label";
import { InputText } from "../primereact/inputtext";

export type TimestampsPanelProps = {
    data: Record<string, unknown>;
    createdAtField?: string;
    createdByField?: string;
    updatedAtField?: string;
    updatedByField?: string;
};

export const TimestampsPanel = ({
    data,
    createdAtField = "createdAt",
    createdByField = "createdBy",
    updatedAtField = "updatedAt",
    updatedByField = "updatedBy",
}: TimestampsPanelProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getNestedProp = (rowData: Record<string, any>, field: string) =>
        field.split(".").reduce((obj, key) => (obj && key in obj ? obj[key] : null), rowData);

    const createdAtValue = formatDate(getNestedProp(data, createdAtField) as unknown as string, "dd/MM/yyyy HH:mm");
    const createdByValue = getNestedProp(data, createdByField) as unknown as string;
    const updatedAtValue = formatDate(getNestedProp(data, updatedAtField) as unknown as string, "dd/MM/yyyy HH:mm");
    const updatedByValue = getNestedProp(data, updatedByField) as unknown as string;

    return (
        <FormGrid.Row>
            <FormGrid.Col md="2">
                <Label htmlFor="created-at">Cadastrado em</Label>
                <InputText id="created-at" disabled value={createdAtValue || ""} />
            </FormGrid.Col>
            <FormGrid.Col md="4">
                <Label htmlFor="created-by">Cadastrado por</Label>
                <InputText id="created-by" disabled value={createdByValue || ""} />
            </FormGrid.Col>
            <FormGrid.Col md="2">
                <Label htmlFor="updated-at">Alterado em</Label>
                <InputText id="updated-at" disabled value={updatedAtValue || ""} />
            </FormGrid.Col>
            <FormGrid.Col md="4">
                <Label htmlFor="updated-by">Alterado por</Label>
                <InputText id="updated-by" disabled value={updatedByValue || ""} />
            </FormGrid.Col>
        </FormGrid.Row>
    );
};
