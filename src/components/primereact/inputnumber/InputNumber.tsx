/* eslint-disable no-restricted-imports */
import {
    InputNumber as InputNumberPR,
    InputNumberProps as InputNumberPropsPR,
    InputNumberValueChangeEvent,
} from "primereact/inputnumber";

export type InputNumberProps = Omit<InputNumberPropsPR, "onValueChange" | "onChange"> & {
    onChange?: (event: InputNumberValueChangeEvent) => void;
};

export const InputNumber = ({ onChange, ...props }: InputNumberProps) => {
    return <InputNumberPR onValueChange={onChange} {...props} />;
};
