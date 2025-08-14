import { Dropdown, DropdownProps } from "@/components/primereact/dropdown";

type DropdownProjectsProps = Omit<DropdownProps, "url" | "options">;

export const DropdownProjects = (props: DropdownProjectsProps) => {
    return (
        <Dropdown
            url="/organizations/workspaces/projects"
            optionValue="id"
            optionLabel="name"
            placeholder="Selecione um projeto"
            emptyMessage="Nenhum projeto disponível"
            emptyFilterMessage="Nenhum projeto encontrado"
            {...props}
        />
    );
};
