"use client";
import { useRef } from "react";

import * as presets from "@/assets/constants/presets";
import { Button } from "@/components/primereact/button";
import { ColumnTableProps, Table, TableRef } from "@/components/table";
import { Title } from "@/components/title";

import { ModalAddWorkspace, ModalAddWorkspaceRef } from "./modal-add-workspace";

const URL = "/organizations/workspaces";

export const WorkspacesList = () => {
    const tableRef = useRef<TableRef>(null);
    const modalAddWorkspaceRef = useRef<ModalAddWorkspaceRef>(null);

    const refreshList = async () => {
        await tableRef.current?.findData();
    };

    const actionBodyTemplate = () => {
        return <Button {...presets.BUTTON_COLUMN_EDIT} disabled />;
    };

    const columns: ColumnTableProps[] = [
        { field: "name", header: "Nome" },
        {
            field: "_actions",
            header: "Ações",
            style: { width: "10%" },
            body: actionBodyTemplate,
        },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Title text="Workspaces" />
            <Button {...presets.BUTTON_ADD} onClick={() => modalAddWorkspaceRef.current?.open()} />
        </div>
    );

    return (
        <>
            <Table ref={tableRef} url={URL} columns={columns} header={header} paginator />
            <ModalAddWorkspace ref={modalAddWorkspaceRef} onSave={refreshList} />
        </>
    );
};
