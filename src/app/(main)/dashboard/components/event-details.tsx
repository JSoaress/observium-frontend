import { forwardRef, useImperativeHandle, useState } from "react";
import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";

import { Dialog } from "@/components/primereact/dialog";
import { useHttp } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { Observium } from "@/types";

import "react-json-view-lite/dist/index.css";

export type ModalEventDetailsRef = {
    open: (eventId: string) => void;
};

const ModalEventDetails = forwardRef<ModalEventDetailsRef>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [eventId, setEventId] = useState("");
    const [event, setEvent] = useState<Observium.Log | null>(null);
    const { httpGet } = useHttp();

    const open = (eventId: string) => {
        setEventId(eventId);
        setVisible(true);
    };

    const close = () => {
        setEventId("");
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({ open }));

    const getEventById = async () => {
        const handlers: HttpResponseHandler<Observium.Log> = {
            200: ({ data }) => {
                setEvent(data!);
            },
        };
        const url = `/projects/logs/${eventId}`;
        await httpGet({ url }, handlers);
    };

    return (
        <Dialog
            header={`Visualizando evento: ${eventId}`}
            visible={visible}
            onHide={close}
            style={{ width: "70vw" }}
            onShow={getEventById}
            blockScroll
        >
            {event && <JsonView data={event} shouldExpandNode={allExpanded} style={defaultStyles} aria-disabled />}
        </Dialog>
    );
});

ModalEventDetails.displayName = "ModalEventDetails";

export { ModalEventDetails };
