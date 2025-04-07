import { ChangeEvent } from "react";

import { classNames } from "primereact/utils";

import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

type InputDocumentProps = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
    onChange?: (event: ChangeEvent<HTMLInputElement>, type: "CPF" | "CNPJ") => void;
};

export const InputDocument = ({ className, ...props }: InputDocumentProps) => {
    return <CpfCnpj {...props} className={classNames("p-inputtext", className)} />;
};
