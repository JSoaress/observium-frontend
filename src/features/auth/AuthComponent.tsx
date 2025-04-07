"use client";
import { ReactNode, useLayoutEffect } from "react";

import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/assets/constants/app-routes";

import { WebSocketProvider } from "../web-socket";
import { useAuth } from "./AuthContext";

type Props = {
    children: ReactNode;
};

export function AuthComponent({ children }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const isUserAuthenticated = !!user;

    useLayoutEffect(() => {
        if (!isUserAuthenticated) router.push(APP_ROUTES.public.login);
    }, [router, isUserAuthenticated]);

    return (
        <>
            {!isUserAuthenticated && null}
            {isUserAuthenticated && <WebSocketProvider>{children}</WebSocketProvider>}
        </>
    );
}
