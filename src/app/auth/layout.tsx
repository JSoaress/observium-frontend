import React from "react";

import { Metadata } from "next";

import { PRODUCT } from "@/assets/constants/constants";

import AppConfig from "../../layout/AppConfig";

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: PRODUCT.name,
    description: PRODUCT.description,
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <React.Fragment>
            {children}
            <AppConfig simple />
        </React.Fragment>
    );
}
