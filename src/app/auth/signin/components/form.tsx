import { useState } from "react";

import { Label } from "@/components/label";
import { Button } from "@/components/primereact/button";
import { Checkbox } from "@/components/primereact/checkbox";
import { InputText } from "@/components/primereact/inputtext";
import { Password } from "@/components/primereact/password";
import { useAuth } from "@/features/auth";
import { useLoading } from "@/hooks";

export const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [loading, suspend] = useLoading();
    const { login } = useAuth();

    async function doLogin() {
        suspend(async () => await login(email, password));
    }

    return (
        <>
            <Label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                E-mail
            </Label>
            <InputText
                id="email"
                type="text"
                placeholder="Endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "1rem" }}
                className="w-full md:w-30rem mb-5"
            />
            <Label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                Senha
            </Label>
            <Password
                inputId="password1"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
            />

            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                    <Checkbox
                        inputId="rememberme"
                        checked={checked}
                        onChange={(e) => setChecked(e.checked ?? false)}
                        className="mr-2"
                    />
                    <Label htmlFor="rememberme">Lembrar senha</Label>
                </div>
                <a
                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                    style={{ color: "var(--primary-color)" }}
                >
                    Esqueceu sua senha?
                </a>
            </div>
            <Button label="ENTRAR" loading={loading} className="w-full p-3 text-xl" onClick={doLogin} />
        </>
    );
};
