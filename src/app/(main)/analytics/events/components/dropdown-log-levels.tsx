import { LOG_LEVELS } from "@/assets/constants/constants";
import { Dropdown, DropdownProps } from "@/components/primereact/dropdown";
import { Tag } from "@/components/primereact/tag";

type DropdownLogLevelsProps = Omit<DropdownProps, "url" | "options" | "optionValue" | "optionLabel">;

export const DropdownLogLevels = (props: DropdownLogLevelsProps) => {
    const logLevelOptionTemplate = ({ value }: { value: string }) => {
        const logLevel = LOG_LEVELS.find((level) => level.value === value);
        if (!logLevel) return <Tag value={value.toUpperCase()} severity="danger" />;
        return <Tag value={logLevel.label.toUpperCase()} severity={logLevel.severity} />;
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
