import { ReactNode } from "react";

export type RowProps = {
    children: ReactNode;
};

export const Row = ({ children }: RowProps) => {
    return <div className="p-fluid formgrid grid">{children}</div>;
};
