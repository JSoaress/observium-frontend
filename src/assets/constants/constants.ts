import { Observium } from "@/types";

export const PRODUCT = {
    name: "Observium",
    description: "Plataforma de monitoramento de logs",
};

export const POWERED_BY = {
    name: "João Vitor",
    webSite: "https://github.com/JSoaress?tab=repositories",
};

export const YES_NO_OPTIONS = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
];

type LogLevels = {
    value: Observium.LogLevels;
    label: string;
    color: string;
    severity: "success" | "warning" | "info" | "danger";
};

export const LOG_LEVELS: LogLevels[] = [
    { value: "debug", label: "debug", color: "purple", severity: "info" },
    { value: "info", label: "info", color: "blue", severity: "info" },
    { value: "notice", label: "notice", color: "green", severity: "success" },
    { value: "warning", label: "warning", color: "yellow", severity: "warning" },
    { value: "error", label: "error", color: "red", severity: "danger" },
    { value: "critical", label: "critical", color: "red", severity: "danger" },
    { value: "alert", label: "alert", color: "red", severity: "danger" },
    { value: "emergency", label: "emergency", color: "red", severity: "danger" },
];

export const LOG_TYPES = [
    { value: "http", label: "http", icon: "pi-code" },
    { value: "function", label: "function", icon: "pi-code" },
    { value: "sql", label: "sql", icon: "pi-database" },
    { value: "queue", label: "queue", icon: "pi-database" },
    { value: "other", label: "other", icon: "pi-wave-pulse" },
];
