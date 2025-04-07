import { PRODUCT } from "@/assets/constants/constants";

type Props = {
    title: string;
    subtitle?: string;
};

export const AuthCardHeader = ({ title, subtitle }: Props) => {
    return (
        <div className="text-center mb-5">
            <img
                src={`/layout/images/observium.png`}
                width="145px"
                alt={`${PRODUCT.name} logo`}
                className="mb-5 flex-shrink-0"
            />
            <div className="text-900 text-3xl font-medium mb-3">{title}</div>
            {subtitle && <span className="text-600 font-medium">{subtitle}</span>}
        </div>
    );
};
