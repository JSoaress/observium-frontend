import { ReactNode } from "react";

import { classNames } from "primereact/utils";

type ColSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export type ColProps = {
    children: ReactNode;
    sm?: ColSize;
    md?: ColSize;
    lg?: ColSize;
    xl?: ColSize;
};

export const Col = ({ children, sm, md, lg, xl }: ColProps) => {
    const colClassNames = classNames("field col-12", {
        [`sm:col-${sm}`]: !!sm,
        [`md:col-${md}`]: !!md,
        [`lg:col-${lg}`]: !!lg,
        [`xl:col-${xl}`]: !!xl,
    });

    return <div className={colClassNames}>{children}</div>;
};
