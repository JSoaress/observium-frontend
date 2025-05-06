import { LOG_TYPES } from "@/assets/constants/constants";
import { Dropdown, DropdownProps } from "@/components/primereact/dropdown";

type DropdownLogTypesProps = Omit<DropdownProps, "url" | "options" | "optionValue" | "optionLabel">;

export const DropdownLogTypes = (props: DropdownLogTypesProps) => {
    const logTypeOptionTemplate = ({ value }: { value: string }) => {
        const logType = LOG_TYPES.find((type) => type.value === value);
        if (!logType)
            return (
                <span>
                    <i className="pi pi-fw pi-wave-pulse mr-2" />
                    {value}
                </span>
            );
        return (
            <span>
                <i className={`pi pi-fw ${logType.icon} mr-2`} />
                {logType.label}
            </span>
        );
    };

    const selectedLogTypeTemplate = (option: { value: string }, props: DropdownProps) => {
        if (option) return logTypeOptionTemplate(option);
        return <span>{props.placeholder}</span>;
    };

    return (
        <Dropdown
            {...props}
            options={LOG_TYPES}
            optionValue="value"
            optionLabel="value"
            valueTemplate={selectedLogTypeTemplate}
            itemTemplate={logTypeOptionTemplate}
        />
    );
};
