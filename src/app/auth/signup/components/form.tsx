import { useForm, Controller } from "react-hook-form";

import { useRouter } from "next/navigation";

import { classNames } from "primereact/utils";

import { APP_ROUTES } from "@/assets/constants/app-routes";
import { Label } from "@/components/label";
import { Button } from "@/components/primereact/button";
import { Checkbox } from "@/components/primereact/checkbox";
import { InputGroup } from "@/components/primereact/inputgroup";
import { InputText } from "@/components/primereact/inputtext";
import { Password } from "@/components/primereact/password";
import { handleFormErrors } from "@/helpers/handle-form-errors";
import { useToast, useHttp, useLoading } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FormValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

const defaultValues: FormValues = {
    name: "",
    email: "",
    password: "",
    terms: false,
};

export const Form = () => {
    const router = useRouter();
    const {
        control,
        formState: { errors },
        setValue,
        setError,
        handleSubmit,
    } = useForm<FormValues>({ defaultValues });
    const { showSuccess, showWarning } = useToast();
    const [loading, suspend] = useLoading();
    const { httpPost } = useHttp();

    const redirectToLogin = () => {
        router.push(APP_ROUTES.public.login);
    };

    const onSubmit = async (data: FormValues) => {
        const handlers: HttpResponseHandler = {
            201: () => {
                showSuccess({
                    summary: "Sucesso!",
                    detail: "Usuário cadastrado com sucesso, visite seu email e siga as instruções.",
                    life: 2000,
                });
                setTimeout(redirectToLogin, 2000);
            },
            409: ({ err }) => {
                showWarning({
                    summary: "Opsss",
                    detail: err?.message,
                    life: 2000,
                });
            },
            422: ({ err }) => {
                const { errors } = err!;
                const formErrors = handleFormErrors<FormValues>(errors);
                Object.entries(formErrors).forEach(([k, v]) => {
                    setError(k as keyof FormValues, { message: v });
                });
            },
        };
        suspend(async () => await httpPost({ url: "/users", body: data }, handlers));
    };

    const generateStrongPassword = () => {
        const getRandom = (chars: string, count: number) =>
            Array.from({ length: count }, () => chars[Math.floor(Math.random() * chars.length)]);
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const upperCase = lowerCase.toUpperCase();
        const digits = "0123456789";
        const specialChars = "-_0][(.><#$";
        const allChars = lowerCase + upperCase + digits + specialChars;
        const passwordComponents = [
            ...getRandom(lowerCase, 2),
            ...getRandom(upperCase, 2),
            ...getRandom(digits, 2),
            ...getRandom(specialChars, 2),
        ];
        const remainingChars = 16 - passwordComponents.length;
        passwordComponents.push(...getRandom(allChars, remainingChars));
        const shuffledPassword = passwordComponents.sort(() => Math.random() - 0.5).join("");
        setValue("password", shuffledPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field p-fluid">
                <Label htmlFor="name" required className="block text-900 text-xl font-medium mb-2">
                    Nome
                </Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputText
                            id="name"
                            type="text"
                            {...field}
                            placeholder="Informe seu nome"
                            style={{ padding: "1rem" }}
                            className={classNames("w-full mb-2", {
                                "p-invalid": fieldState.invalid,
                                "md:w-30rem": !fieldState.invalid,
                            })}
                        />
                    )}
                />
                {errors.name && <small className="p-error">{errors.name.message}</small>}
            </div>
            <div className="field p-fluid">
                <Label htmlFor="email" required className="block text-900 text-xl font-medium mb-2">
                    E-mail
                </Label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputText
                            id="email"
                            type="text"
                            {...field}
                            placeholder="Informe seu melhor e-mail"
                            style={{ padding: "1rem" }}
                            className={classNames("w-full mb-2", {
                                "p-invalid": fieldState.invalid,
                                "md:w-30rem": !fieldState.invalid,
                            })}
                        />
                    )}
                />
                {errors.email && <small className="p-error">{errors.email.message}</small>}
            </div>
            <div className="field p-fluid">
                <Label htmlFor="password" required className="block text-900 text-xl font-medium mb-2">
                    Senha
                </Label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputGroup>
                            <Password
                                inputId="password"
                                {...field}
                                placeholder="Digite sua senha"
                                toggleMask
                                strongRegex="/^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[-_0][(.><#$]){2}).{8,}$/</>"
                                className={classNames("w-full mb-2", { "p-invalid": fieldState.invalid })}
                                inputClassName="w-full p-3 mb-2"
                            />
                            <Button
                                type="button"
                                icon="pi pi-cog"
                                tooltip="Gerar senha segura"
                                tooltipOptions={{ position: "top" }}
                                onClick={generateStrongPassword}
                                className="mb-3"
                            />
                        </InputGroup>
                    )}
                />
                {errors.password && <small className="p-error">{errors.password.message}</small>}
            </div>
            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field: { value, ...rest } }) => (
                            <Checkbox inputId="rememberme1" {...rest} checked={value} className="mr-2" />
                        )}
                    />
                    <Label htmlFor="rememberme1">Aceito os termos e condições</Label>
                </div>
            </div>
            <Button
                type="submit"
                icon={<FontAwesomeIcon icon={faRocket} />}
                label="Cadastrar"
                loading={loading}
                className="w-full p-3 text-xl"
            />
        </form>
    );
};
