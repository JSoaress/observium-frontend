import { useEffect, useState } from "react";

import { Divider } from "@/components/primereact/divider";
import { Title } from "@/components/title";
import { useWebSocket } from "@/features/web-socket";
import { Observium } from "@/types";

import { EventInfo } from "./event-info";

type LastEventsProps = {
    projectId: string;
};

export const LastEvents = ({ projectId }: LastEventsProps) => {
    const [lastEvents, setLastEvents] = useState<Observium.SimplifiedLog[]>([]);
    const { lastMessage } = useWebSocket();

    useEffect(() => {
        if (!projectId || !lastMessage) return;
        const parsedMessage = JSON.parse(lastMessage) as { type: string; data: Observium.SimplifiedLog };
        const lastEvent = parsedMessage.data;
        if (lastEvent.projectId === projectId) setLastEvents((old) => [lastEvent, ...old].slice(0, 5));
    }, [projectId, lastMessage]);

    return (
        <div className="card">
            <Title text="Últimos eventos (últimos 5)" />
            {lastEvents.map((event, index) => {
                return (
                    <div key={index}>
                        <EventInfo event={event} />
                        <Divider />
                    </div>
                );
            })}
        </div>
    );
};
