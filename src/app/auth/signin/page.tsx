"use client";
import { APP_ROUTES } from "@/assets/constants/app-routes";

import { AuthCard } from "../components";
import { Form } from "./components";

const SignupPage = () => {
    return (
        <AuthCard.Root>
            <AuthCard.Header title="Acesse a plataforma" subtitle="Informe seu e-mail e senha para continuar" />
            <Form />
            <AuthCard.Footer
                textBeforeLink="Não tem conta?"
                linkText="Crie sua conta"
                redirectTo={APP_ROUTES.public.signUp}
            />
        </AuthCard.Root>
    );
};

export default SignupPage;
