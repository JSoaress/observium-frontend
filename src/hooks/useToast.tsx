import { useRef, useState } from "react";

import { useBetween } from "use-between";

import { Toast, ToastMessage } from "@/components/primereact/toast";

type ToastMessagePosition =
    | "center"
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right";

type ToastMessageWithoutSeverity = Omit<ToastMessage, "severity">;

const useToastRef = () => {
    const [position, setPosition] = useState<ToastMessagePosition>("top-right");
    const toastRef = useRef<Toast>(null);

    const showToast = (props: ToastMessage, position?: ToastMessagePosition) => {
        setPosition(position || "top-right");
        toastRef.current?.show(props);
    };

    const showCustom = (props: ToastMessage | ToastMessage[]) => {
        toastRef.current?.show(props);
    };

    const showSuccess = (props: ToastMessageWithoutSeverity, position?: ToastMessagePosition) => {
        showToast({ ...props, severity: "success" }, position);
    };

    const showInfo = (props: ToastMessageWithoutSeverity, position?: ToastMessagePosition) => {
        showToast({ ...props, severity: "info" }, position);
    };

    const showWarning = (props: ToastMessageWithoutSeverity, position?: ToastMessagePosition) => {
        showToast({ ...props, severity: "warn" }, position);
    };

    const showError = (props: ToastMessageWithoutSeverity, position?: ToastMessagePosition) => {
        showToast({ ...props, severity: "error" }, position);
    };

    const clear = () => {
        toastRef.current?.clear();
    };

    return { position, toastRef, showCustom, showSuccess, showInfo, showWarning, showError, clear };
};

export const useToast = () => useBetween(useToastRef);
