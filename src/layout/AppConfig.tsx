"use client";

import React, { useCallback, useContext, useEffect } from "react";

import { AppConfigProps } from "@/types";

import { LayoutContext } from "./context/layoutcontext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppConfig = (props: AppConfigProps) => {
    const { layoutConfig } = useContext(LayoutContext);

    const applyScale = useCallback(() => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    }, [layoutConfig.scale]);

    useEffect(() => {
        applyScale();
    }, [applyScale]);

    return <></>;
};

export default AppConfig;
