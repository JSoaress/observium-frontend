import { Dropdown, DropdownProps } from "@/components/primereact/dropdown";
import { Tag } from "@/components/primereact/tag";

type DropdownLogLevelsProps = Omit<DropdownProps, "url" | "options" | "optionValue" | "optionLabel">;

const LOG_LEVELS = [
    { value: "silly" },
    { value: "debug" },
    { value: "info" },
    { value: "warn" },
    { value: "error" },
    { value: "critical" },
];

export const DropdownLogLevels = (props: DropdownLogLevelsProps) => {
    const logLevelOptionTemplate = ({ value }: { value: string }) => {
        if (value === "silly" || value === "debug") return <Tag value={value.toUpperCase()} severity="success" />;
        if (value === "info") return <Tag value={value.toUpperCase()} severity="info" />;
        if (value === "warn") return <Tag value={value.toUpperCase()} severity="warning" />;
        return <Tag value={value.toUpperCase()} severity="danger" />;
    };

    const selectedLogLevelTemplate = (option: { value: string }, props: DropdownProps) => {
        if (option) return logLevelOptionTemplate(option);
        return <span>{props.placeholder}</span>;
    };

    return (
        <Dropdown
            {...props}
            options={LOG_LEVELS}
            optionValue="value"
            optionLabel="value"
            valueTemplate={selectedLogLevelTemplate}
            itemTemplate={logLevelOptionTemplate}
        />
    );
};
