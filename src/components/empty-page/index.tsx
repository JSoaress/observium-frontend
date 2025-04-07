import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const EmptyPage = ({ children }: Props) => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">{children}</div>
            </div>
        </div>
    );
};
