import { useRef } from "react";

import { Delete, DeleteProps, DeleteRef } from "@/components/delete";
import { Button, ButtonProps } from "@/components/primereact/button";

type Props = ButtonProps & DeleteProps;

export const DeleteButton = ({ url, id, requireConfirmation, confirmationMessage, onDelete, handlers, ...props }: Props) => {
    const deleteRef = useRef<DeleteRef>(null);

    return (
        <>
            <Button {...props} loading={deleteRef.current?.loading} onClick={() => deleteRef.current?.handleClick()} />
            <Delete
                ref={deleteRef}
                url={url}
                id={id}
                requireConfirmation={requireConfirmation}
                confirmationMessage={confirmationMessage}
                handlers={handlers}
                onDelete={onDelete}
            />
        </>
    );
};
