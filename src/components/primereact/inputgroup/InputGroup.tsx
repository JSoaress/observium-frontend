import { ReactNode } from "react";

type InputGroupProps = {
    children: ReactNode;
};

export const InputGroup = ({ children }: InputGroupProps) => {
    return <div className="p-inputgroup">{children}</div>;
};
