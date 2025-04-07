declare namespace Observium {
    type APIKey = {
        id: string;
        alias: string;
        key: string;
        userId: string;
        expiresIn: Date | null;
        active: boolean;
    };
    type Log = {
        id: string;
        type: "HTTP" | "SERVER-ACTION" | "OTHER";
        projectId: string;
        path: string;
        method: string;
        statusCode: number;
        statusText: string | null;
        level: "silly" | "debug" | "info" | "warn" | "error" | "critical";
        duration: number;
        context: Record<string, unknown> | null;
        response: Record<string, unknown> | null;
        error: Record<string, unknown> | null;
        createdAt: Date;
    };
    type SimplifiedLog = Omit<Log, "context" | "response" | "error">;
    type TotalDailyLogs = {
        date: Date;
        logs: number;
        silly: number;
        debug: number;
        info: number;
        warn: number;
        error: number;
        critical: number;
    };
}

export type Pagination<T> = {
    count: number;
    results: T[];
};
