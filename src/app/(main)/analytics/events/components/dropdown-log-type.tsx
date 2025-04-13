import { Dropdown, DropdownProps } from "@/components/primereact/dropdown";

type DropdownLogTypesProps = Omit<DropdownProps, "url" | "options" | "optionValue" | "optionLabel">;

const LOG_TYPES = [{ value: "HTTP" }, { value: "SERVER-ACTION" }, { value: "OTHER" }];

export const DropdownLogTypes = (props: DropdownLogTypesProps) => {
    const logTypeOptionTemplate = ({ value }: { value: string }) => {
        if (value === "HTTP") {
            return (
                <span>
                    <i className="pi pi-fw pi-code text-blue-500 mr-2" />
                    {value}
                </span>
            );
        }
        if (value === "SERVER-ACTION") {
            return (
                <span>
                    <i className="pi pi-fw pi-sync text-green-500 mr-2" />
                    {value}
                </span>
            );
        }
        return (
            <span>
                <i className="pi pi-fw pi-clone text-red-500 mr-2" />
                {value}
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
