"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/assets/constants/app-routes";
import { useHttp, useToast } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { SharkDev } from "@/types";

type AuthenticatedUser = {
    accessToken: string;
    user: SharkDev.User;
};

type AuthProps = {
    user: SharkDev.User | null;
    accessToken: string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<SharkDev.User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();
    const { httpPost } = useHttp();
    const { showWarning } = useToast();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const authenticatedUser = localStorage.getItem("authenticatedUser");
        if (accessToken && authenticatedUser) {
            setAccessToken(accessToken);
            setUser(JSON.parse(authenticatedUser));
            router.push(APP_ROUTES.private.dashboard);
        }
    }, [router]);

    const login = async (email: string, password: string) => {
        const handlers: HttpResponseHandler<AuthenticatedUser> = {
            200: ({ data }) => {
                const { accessToken, user: authUser } = data!;
                setUser(authUser);
                setAccessToken(accessToken);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("authenticatedUser", JSON.stringify(authUser));
                router.push(APP_ROUTES.private.dashboard);
            },
            400: ({ err }) => {
                showWarning({
                    summary: "Falha na autenticação",
                    detail: err?.message,
                    life: 2000,
                });
            },
            401: ({ err }) => {
                showWarning({
                    summary: "Falha na autenticação",
                    detail: err?.message,
                    life: 2000,
                });
            },
        };
        await httpPost({ url: "/users/auth/login", body: { email, password } }, handlers);
    };

    const logout = async () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authenticatedUser");
        router.push(APP_ROUTES.public.login);
    };

    return (
        <AuthContext.Provider value={{ user: user || null, accessToken: accessToken || "", login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
