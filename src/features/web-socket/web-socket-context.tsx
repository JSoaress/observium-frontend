import { createContext, ReactNode, useContext } from "react";
import useReactWebSocket, { SendMessage, ReadyState } from "react-use-websocket";

import { useToast } from "@/hooks";

import { useAuth } from "../auth";

type WebSocketOptions = {
    sendMessage: SendMessage;
    readyState: ReadyState;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastMessage: any;
};

const WebSocketContext = createContext<WebSocketOptions>({} as WebSocketOptions);

type WebSocketProviderProps = {
    children: ReactNode;
};

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const { user } = useAuth();
    const { showError } = useToast();

    const isAuthenticated = !!user;

    const url = process.env.WEB_SOCKET_URL || "";

    const { sendMessage, lastMessage, readyState } = useReactWebSocket(url, {
        filter: () => isAuthenticated,
        share: true,
        onError: () => {
            showError({
                summary: "Erro :(",
                detail: "Perdemos a conexão com o servidor de forma inesperada.",
                life: 3000,
            });
        },
        reconnectAttempts: 20,
    });

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage: lastMessage?.data, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
