import { Metadata } from "next";

import { POWERED_BY, PRODUCT } from "@/assets/constants/constants";

import Layout from "../../layout/layout";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: PRODUCT.name,
    description: PRODUCT.description,
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: "device-width" },
    openGraph: {
        type: "website",
        title: PRODUCT.name,
        url: POWERED_BY.webSite,
        description: PRODUCT.description,
        ttl: 604800,
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
