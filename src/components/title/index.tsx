import { ReactNode } from "react";

import { classNames } from "primereact/utils";

export type TitleProps = {
    text?: string;
    className?: string;
    children?: ReactNode;
};

export const Title = ({ text, className, children }: TitleProps) => {
    if (text) return <span className={classNames("text-xl text-900 font-bold", className)}>{text}</span>;

    return children;
};
