declare namespace Observium {
    type APIKey = {
        id: string;
        alias: string;
        key: string;
        userId: string;
        expiresIn: Date | null;
        active: boolean;
    };
    type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
    type LogType = "http" | "function" | "sql" | "queue" | "other";
    type LogLevels = "debug" | "info" | "notice" | "warning" | "error" | "critical" | "alert" | "emergency";
    type LogContextHttp = {
        type: "http";
        method: HttpMethods;
        url: string;
        status: number;
        duration: number;
    };
    type LogContextFunction = {
        type: "function";
        functionName: string;
        args: Record<string, unknown> | null;
        duration: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result: any;
    };
    type LogContextSql = {
        type: "sql";
        query: string;
        params: Record<string, unknown> | null;
        duration: number;
    };
    type LogContextQueue = {
        type: "queue";
        queue: string;
        jobId: number;
        status: "started" | "completed" | "failed" | "waiting";
        duration: number;
    };
    type LogContextOther = {
        type: "other";
        [key: string]: string;
    };
    type Log = {
        id: string;
        type: LogType;
        projectId: string;
        externalId: string | null;
        level: LogLevels;
        message: string;
        duration: number;
        context: LogContextHttp | LogContextFunction | LogContextSql | LogContextQueue | LogContextOther | null;
        error: Record<string, unknown> | null;
        stack: Record<string, unknown> | null;
        tags: string[];
        createdAt: Date;
    };
    type SimplifiedLog = Omit<Log, "context" | "error" | "stack">;
    type TotalDailyLogs = Record<LogLevels, number> & {
        date: Date;
        logs: number;
    };
}

export type Pagination<T> = {
    count: number;
    results: T[];
};
