import { forwardRef, Ref, useImperativeHandle, ReactNode } from "react";

import { confirmDialog } from "@/components/primereact/confirmdialog";
import { useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";

export type DeleteRef = {
    loading: boolean;
    handleClick: () => Promise<void>;
};

export type DeleteProps = {
    url: string;
    id: string;
    requireConfirmation?: boolean;
    confirmationMessage?: string | ReactNode;
    handlers?: HttpResponseHandler;
    onDelete?: () => void;
};

const Component = (
    { url, id, requireConfirmation, confirmationMessage = "Confirma a exclusão do item?", handlers, onDelete }: DeleteProps,
    ref: Ref<DeleteRef>,
) => {
    const { httpDelete } = useHttp();
    const [loading, suspend] = useLoading();

    const handleSubmit = async () => {
        const deleteHandlers: HttpResponseHandler = {
            204: () => {
                if (onDelete) onDelete();
            },
        };
        const urlDelete = url.split("/").filter(Boolean).join("/");
        suspend(async () => await httpDelete({ url: `/${urlDelete}/${id}` }, { ...handlers, ...deleteHandlers }));
    };

    const confirm = () => {
        confirmDialog({
            message: confirmationMessage,
            header: "Confirmação",
            icon: "pi pi-info-circle",
            accept: async () => {
                await handleSubmit();
            },
            acceptLabel: "Deletar",
            acceptClassName: "p-button-danger",
            rejectLabel: "Cancelar",
        });
    };

    const handleClick = async () => {
        if (requireConfirmation) {
            confirm();
        } else {
            handleSubmit();
        }
    };

    useImperativeHandle(ref, () => ({ loading, handleClick }));

    return <></>;
};

export const Delete = forwardRef(Component);
