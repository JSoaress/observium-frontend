import { useRef } from "react";

import { LOG_LEVELS, LOG_TYPES } from "@/assets/constants/constants";
import { formatDate } from "@/helpers/formatters";
import { Observium } from "@/types";

import { ModalEventDetails, ModalEventDetailsRef } from "./event-details";

type EventInfoProps = {
    event: Observium.SimplifiedLog;
};

export const EventInfo = ({ event }: EventInfoProps) => {
    const modalEventDetailsRef = useRef<ModalEventDetailsRef>(null);

    function color(level: Observium.LogLevels): string {
        const logLevel = LOG_LEVELS.find((lv) => lv.value === level);
        return logLevel?.color || "red";
    }

    function icon(type: Observium.LogType): string {
        const logType = LOG_TYPES.find((tp) => tp.value === type);
        return logType?.icon || "pi-wave-pulse";
    }

    function message(msg: string): string {
        if (msg.length > 25) return `${msg.substring(0, 25)}...`;
        return msg;
    }

    function formatCreatedAt(date: Date | string | number): string {
        return formatDate(date, "dd/MM/yyyy HH:mm:ss");
    }

    function formatDuration(duration: number): string {
        if (duration === 0) return "0";
        if (duration >= 3.6e6) {
            const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            return `${hours}h`;
        }
        if (duration >= 60000) {
            const minutes = Math.floor((duration / (1000 * 60)) % 60);
            return `${minutes}m`;
        }
        if (duration >= 1000) {
            const seconds = Math.floor((duration / 1000) % 60);
            return `${seconds}s`;
        }
        return `${duration}ms`;
    }

    return (
        <>
            <div className="col-12 md:col-12 p-0 mt-4 lg:mt-0">
                <div
                    style={{
                        height: "91px",
                        padding: "2px",
                        borderRadius: "10px",
                        background: `var(--${color(event.level)}-200)`,
                    }}
                >
                    <div className="p-3 surface-card" style={{ borderRadius: "8px" }}>
                        <div className="flex justify-content-between align-items-start mb-2">
                            <div className="flex">
                                <div
                                    className={`flex align-items-center justify-content-center bg-${color(event.level)}-200`}
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        borderRadius: "10px",
                                        marginRight: "1rem",
                                    }}
                                >
                                    <i className={`pi pi-fw ${icon(event.type)} text-xl text-${color(event.level)}-700`} />
                                </div>
                                <div className="flex">
                                    <h5 className="m-0 text-400 mr-4">{message(event.message)}</h5>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="p-link layout-topbar-menu-button layout-topbar-button"
                                    onClick={() => modalEventDetailsRef.current?.open(event.id)}
                                >
                                    <i className={`pi pi-fw pi-eye text-xl`} />
                                </button>
                            </div>
                        </div>
                        <div style={{ marginLeft: "3.5rem" }}>
                            <i className="pi pi-fw pi-clock text-400 mr-1" />
                            <span className="text-400 mr-4">{formatCreatedAt(event.createdAt)}</span>
                            {event.duration && (
                                <>
                                    <i className="pi pi-fw pi-stopwatch text-400 mr-1" />
                                    <span className="text-400">{formatDuration(event.duration)}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalEventDetails ref={modalEventDetailsRef} />
        </>
    );
};
