type Props = {
    title: string;
    value: string | number;
};

export const CardInfoContent = ({ title, value }: Props) => {
    return (
        <div>
            <span className="block text-500 font-medium mb-3">{title}</span>
            <div className="text-900 font-medium text-xl">{value}</div>
        </div>
    );
};
