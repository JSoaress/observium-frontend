import { ReactNode } from "react";

type Props = {
    lg: number;
    xl: number;
    children: ReactNode;
};

export const CardInfoRoot = ({ lg, xl, children }: Props) => {
    return (
        <div className={`col-12 lg:col-${lg} xl:col-${xl}`}>
            <div className="card mb-0">{children}</div>
        </div>
    );
};
