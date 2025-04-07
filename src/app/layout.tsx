"use client";
import { usePathname } from "next/navigation";

import { PrimeReactProvider } from "primereact/api";

import { APP_ROUTES } from "@/assets/constants/app-routes";
import { ConfirmDialog } from "@/components/primereact/confirmdialog";
import { Toast } from "@/components/primereact/toast";
import { AuthComponent, AuthProvider } from "@/features/auth";
import { useToast } from "@/hooks";

import { LayoutProvider } from "../layout/context/layoutcontext";

// eslint-disable-next-line no-restricted-imports
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

interface RootLayoutProps {
    children: React.ReactNode;
}

function checkIsPublicRoute(asPath: string) {
    const appPublicRoutes = Object.values(APP_ROUTES.public);
    return (
        appPublicRoutes.includes(asPath) ||
        asPath.startsWith(APP_ROUTES.public.confirmAccount) ||
        asPath.startsWith(APP_ROUTES.public.rejectInvitation)
    );
}

export default function RootLayout({ children }: RootLayoutProps) {
    const pathname = usePathname();
    const { toastRef, position } = useToast();

    const isPublicPage = checkIsPublicRoute(pathname);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/observium-light/theme.css`} rel="stylesheet" />
            </head>
            <body>
                <PrimeReactProvider>
                    <Toast ref={toastRef} position={position} />
                    <ConfirmDialog />
                    <AuthProvider>
                        <LayoutProvider>
                            {isPublicPage && children}
                            {!isPublicPage && <AuthComponent>{children}</AuthComponent>}
                        </LayoutProvider>
                    </AuthProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
