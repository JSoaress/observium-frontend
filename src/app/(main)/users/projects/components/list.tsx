"use client";
import { useRef } from "react";

import * as presets from "@/assets/constants/presets";
import { Button } from "@/components/primereact/button";
import { ColumnTableProps, Table, TableRef } from "@/components/table";
import { Title } from "@/components/title";

import { ModalAddProject, ModalAddProjectRef } from "./modal-add-project";

const URL = "/organizations/workspaces/projects";

export const ProjectsList = () => {
    const tableRef = useRef<TableRef>(null);
    const modalAddProjectRef = useRef<ModalAddProjectRef>(null);

    const refreshList = async () => {
        await tableRef.current?.findData();
    };

    const actionBodyTemplate = () => {
        return <Button {...presets.BUTTON_COLUMN_EDIT} disabled />;
    };

    const columns: ColumnTableProps[] = [
        { field: "name", header: "Nome" },
        { field: "slug", header: "Slug" },
        { field: "url", header: "Url" },
        {
            field: "_actions",
            header: "Ações",
            style: { width: "10%" },
            body: actionBodyTemplate,
        },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Title text="Projetos" />
            <Button {...presets.BUTTON_ADD} onClick={() => modalAddProjectRef.current?.open()} />
        </div>
    );

    return (
        <>
            <Table ref={tableRef} url={URL} columns={columns} header={header} paginator />
            <ModalAddProject ref={modalAddProjectRef} onSave={refreshList} />
        </>
    );
};
