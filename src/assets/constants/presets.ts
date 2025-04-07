import { ButtonProps } from "@/components/primereact/button";

export const BUTTON_ADD: ButtonProps = {
    label: "Adicionar",
    icon: "pi pi-plus",
};

export const BUTTON_COLUMN_BASE: ButtonProps = {
    className: "mr-1 ml-1 mt-1",
};

export const BUTTON_COLUMN_EDIT: ButtonProps = {
    ...BUTTON_COLUMN_BASE,
    icon: "pi pi-pencil",
    severity: "warning",
};

export const BUTTON_COLUMN_DELETE: ButtonProps = {
    ...BUTTON_COLUMN_BASE,
    icon: "pi pi-trash",
    severity: "danger",
};

export const BUTTON_COLUMN_CONFIG: ButtonProps = {
    ...BUTTON_COLUMN_BASE,
    icon: "pi pi-cog",
};

export const BUTTON_SUBMIT: ButtonProps = {
    type: "submit",
    label: "Salvar",
    icon: "pi pi-save",
    severity: "info",
};

export const BUTTON_RESET: ButtonProps = {
    type: "button",
    label: "Cancelar",
    icon: "pi pi-ban",
    severity: "danger",
};
