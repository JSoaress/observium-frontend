type Props = {
    icon: string;
    color: string;
};

export const CardInfoIcon = ({ icon, color }: Props) => {
    return (
        <div
            className={`flex align-items-center justify-content-center bg-${color}-100 border-round`}
            style={{ width: "2.5rem", height: "2.5rem" }}
        >
            <i className={`${icon} text-${color}-500 text-xl`} />
        </div>
    );
};
