"use client";
import { APP_ROUTES } from "@/assets/constants/app-routes";

import { AuthCard } from "../../components";
import { Form } from "./components";

const ConfirmAccountPage = () => {
    return (
        <AuthCard.Root>
            <AuthCard.Header title="Confirmação de cadastro" />
            <Form />
            <AuthCard.Footer
                textBeforeLink="Não tem conta?"
                linkText="Crie sua conta"
                redirectTo={APP_ROUTES.public.signUp}
            />
        </AuthCard.Root>
    );
};

export default ConfirmAccountPage;
