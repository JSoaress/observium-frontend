import { useRef } from "react";

import { FilterMatchMode } from "primereact/api";

import { BUTTON_COLUMN_BASE } from "@/assets/constants/presets";
import { Button } from "@/components/primereact/button";
import { DataTableFilterMeta, ColumnFilterElementTemplateOptions } from "@/components/primereact/datatable";
import { InputText } from "@/components/primereact/inputtext";
import { Tag } from "@/components/primereact/tag";
import { ColumnTableProps, Table } from "@/components/table";
import { Title } from "@/components/title";
import { Observium } from "@/types";

import { ModalEventDetails, ModalEventDetailsRef } from "../../../dashboard/components";
import { DropdownLogLevels } from "./dropdown-log-levels";
import { DropdownLogTypes } from "./dropdown-log-type";

type EventListProps = {
    projectId: string;
};

const defaultFilters: DataTableFilterMeta = {
    type: { value: "", matchMode: FilterMatchMode.EQUALS },
    level: { value: "", matchMode: FilterMatchMode.EQUALS },
    path: { value: "", matchMode: FilterMatchMode.EQUALS },
};

export const EventList = ({ projectId }: EventListProps) => {
    const modalEventDetailsRef = useRef<ModalEventDetailsRef>(null);

    const typeBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        if (rowData.type === "HTTP") {
            return (
                <span>
                    <i className="pi pi-fw pi-code text-blue-500 mr-2" />
                    {rowData.type}
                </span>
            );
        }
        if (rowData.type === "SERVER-ACTION") {
            return (
                <span>
                    <i className="pi pi-fw pi-sync text-green-500 mr-2" />
                    {rowData.type}
                </span>
            );
        }
        return (
            <span>
                <i className="pi pi-fw pi-clone text-red-500 mr-2" />
                {rowData.type}
            </span>
        );
    };

    const levelBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        if (rowData.level === "silly" || rowData.level === "debug")
            return <Tag value={rowData.level.toUpperCase()} severity="success" />;
        if (rowData.level === "info") return <Tag value={rowData.level.toUpperCase()} severity="info" />;
        if (rowData.level === "warn") return <Tag value={rowData.level.toUpperCase()} severity="warning" />;
        return <Tag value={rowData.level.toUpperCase()} severity="danger" />;
    };

    const statusBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        return <span>{rowData.statusCode || rowData.statusText}</span>;
    };

    const actionBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        return (
            <Button
                {...BUTTON_COLUMN_BASE}
                icon="pi pi-eye"
                severity="info"
                onClick={() => modalEventDetailsRef.current?.open(rowData.id)}
            />
        );
    };

    const typeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <DropdownLogTypes value={options.value} onChange={(e) => options.filterCallback(e.target.value)} />;
    };

    const levelFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <DropdownLogLevels value={options.value} onChange={(e) => options.filterCallback(e.target.value)} />;
    };

    const pathFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputText value={options.value} onChange={(e) => options.filterCallback(e.target.value)} />;
    };

    const columns: ColumnTableProps[] = [
        {
            field: "type",
            header: "Tipo",
            style: { width: "12%" },
            filter: true,
            showFilterMenuOptions: false,
            filterElement: typeFilterTemplate,
            body: typeBodyTemplate,
        },
        {
            field: "level",
            header: "Level",
            style: { width: "10%" },
            filter: true,
            showFilterMenuOptions: false,
            filterElement: levelFilterTemplate,
            body: levelBodyTemplate,
        },
        { field: "path", header: "Path", filter: true, showFilterMenuOptions: false, filterElement: pathFilterTemplate },
        { field: "method", header: "Método" },
        { field: "status", header: "Status", body: statusBodyTemplate },
        { field: "createdAt", header: "Data criação", format: "date", dateFormat: "dd/MM/yyyy HH:mm:ss" },
        {
            field: "_actions",
            header: "Ações",
            style: { width: "10%" },
            body: actionBodyTemplate,
        },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Title text="Logs" />
        </div>
    );

    return (
        <>
            <Table
                columns={columns}
                url={projectId ? `/projects/${projectId}/logs?sort=-createdAt` : ""}
                header={header}
                filters={defaultFilters}
                paginator
            />
            <ModalEventDetails ref={modalEventDetailsRef} />
        </>
    );
};
