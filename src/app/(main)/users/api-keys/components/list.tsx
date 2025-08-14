"use client";
import { useRef } from "react";

import { classNames } from "primereact/utils";

import * as presets from "@/assets/constants/presets";
import { Button } from "@/components/primereact/button";
import { ColumnTableProps, Table, TableRef } from "@/components/table";
import { Title } from "@/components/title";

import { ModalAddAPIKey, ModalAddAPIKeyRef } from "./modal-add-api-key";

export const ServicesList = () => {
    const tableRef = useRef<TableRef>(null);
    const modalAddAPIKeyRef = useRef<ModalAddAPIKeyRef>(null);

    const refreshList = async () => {
        await tableRef.current?.findData();
    };

    const statusBodyTemplate = (value: boolean) => {
        return (
            <i
                className={classNames("pi", {
                    "text-green-500 pi-check-circle": value,
                    "text-pink-500 pi-times-circle": !value,
                })}
            />
        );
    };

    const actionBodyTemplate = () => {
        return <Button {...presets.BUTTON_COLUMN_EDIT} disabled />;
    };

    const columns: ColumnTableProps[] = [
        { field: "alias", header: "Descrição" },
        {
            field: "active",
            header: "Ativa?",
            align: "center",
            style: { width: "10%" },
            body: (e) => statusBodyTemplate(e.active),
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
            <Title text="API Keys" />
            <Button {...presets.BUTTON_ADD} onClick={() => modalAddAPIKeyRef.current?.open()} />
        </div>
    );

    return (
        <>
            <Table ref={tableRef} columns={columns} url="/projects/api-keys" header={header} paginator />
            <ModalAddAPIKey ref={modalAddAPIKeyRef} onSave={refreshList} />
        </>
    );
};
