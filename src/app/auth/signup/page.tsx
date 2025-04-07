"use client";
import { APP_ROUTES } from "@/assets/constants/app-routes";

import { AuthCard } from "../components";
import { Form } from "./components";

const SignUpPage = () => {
    return (
        <AuthCard.Root>
            <AuthCard.Header title="Cadastro" />
            <Form />
            <AuthCard.Footer textBeforeLink="Já tem conta?" linkText="Faça login" redirectTo={APP_ROUTES.public.login} />
        </AuthCard.Root>
    );
};

export default SignUpPage;
