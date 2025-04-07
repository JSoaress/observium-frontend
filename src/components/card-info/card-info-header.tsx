import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const CardInfoHeader = ({ children }: Props) => {
    return <div className="flex justify-content-between mb-3">{children}</div>;
};
