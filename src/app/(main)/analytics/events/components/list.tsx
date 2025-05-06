import { useRef } from "react";

import { FilterMatchMode } from "primereact/api";

import { LOG_LEVELS, LOG_TYPES } from "@/assets/constants/constants";
import { BUTTON_COLUMN_BASE } from "@/assets/constants/presets";
import { Button } from "@/components/primereact/button";
import { DataTableFilterMeta, ColumnFilterElementTemplateOptions } from "@/components/primereact/datatable";
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
        const logType = LOG_TYPES.find((type) => type.value === rowData.type);
        if (!logType)
            return (
                <span>
                    <i className="pi pi-fw pi-wave-pulse mr-2" />
                    {rowData.type}
                </span>
            );
        return (
            <span>
                <i className={`pi pi-fw ${logType.icon} mr-2`} />
                {logType.label}
            </span>
        );
    };

    const levelBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        const logLevel = LOG_LEVELS.find((level) => level.value === rowData.level);
        if (!logLevel) return <Tag value={rowData.level.toUpperCase()} severity="danger" />;
        return <Tag value={logLevel.label.toUpperCase()} severity={logLevel.severity} />;
    };

    const messageBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        if (rowData.message.length > 60) return `${rowData.message.substring(0, 60)}...`;
        return rowData.message;
    };

    const tagsBodyTemplate = (rowData: Observium.SimplifiedLog) => {
        return <span>{rowData.tags.join(", ")}</span>;
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

    const columns: ColumnTableProps[] = [
        {
            field: "type",
            header: "Tipo",
            style: { width: "10%" },
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
        { field: "message", header: "Mensagem", body: messageBodyTemplate },
        { field: "tags", header: "Tags", body: tagsBodyTemplate },
        {
            field: "createdAt",
            header: "Data criação",
            format: "date",
            dateFormat: "dd/MM/yyyy HH:mm:ss",
            style: { width: "15%" },
        },
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
