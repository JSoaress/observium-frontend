type LabelProps = JSX.IntrinsicElements["label"] & {
    required?: boolean;
    requiredChar?: string;
};

export const Label = ({ required = false, requiredChar = "*", children, ...props }: LabelProps) => {
    const requiredText = required ? <b className="p-error">{requiredChar} </b> : null;

    return (
        <label {...props}>
            {requiredText}
            {children}
        </label>
    );
};
