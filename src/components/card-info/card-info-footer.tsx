type Props = {
    emphasis?: {
        text: string;
        color: string;
    };
    sulfix: string;
};

export const CardInfoFooter = ({ emphasis, sulfix }: Props) => {
    return (
        <>
            {emphasis && <span className={`${emphasis.color} font-medium`}>{emphasis.text}</span>}
            <span className="text-500">{sulfix}</span>
        </>
    );
};
