// eslint-disable-next-line no-restricted-imports
import { Password as PasswordPR, PasswordProps } from "primereact/password";

export const Password = (props: PasswordProps) => {
    return (
        <PasswordPR strongLabel="Forte" mediumLabel="Média" weakLabel="Fraca" promptLabel="Entre com a senha" {...props} />
    );
};
