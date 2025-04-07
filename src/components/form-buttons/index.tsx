import { BUTTON_RESET, BUTTON_SUBMIT } from "@/assets/constants/presets";
import { Button, ButtonProps } from "@/components/primereact/button";

export type FormButtonProps = {
    submitButton?: ButtonProps;
    resetButton?: ButtonProps;
    loading?: boolean;
};

export const FormButtons = ({ loading, resetButton, submitButton }: FormButtonProps) => {
    return (
        <div className="flex">
            <Button {...BUTTON_SUBMIT} loading={loading} autoFocus {...submitButton} />
            <Button {...BUTTON_RESET} loading={loading} className="ml-2" {...resetButton} />
        </div>
    );
};
