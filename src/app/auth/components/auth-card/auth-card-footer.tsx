import { useRouter } from "next/navigation";

type Props = {
    textBeforeLink: string;
    linkText: string;
    redirectTo: string;
};

export const AuthCardFooter = ({ textBeforeLink, linkText, redirectTo }: Props) => {
    const router = useRouter();

    return (
        <div className="flex flex-column align-items-center justify-content-center mt-4">
            <span className="text-600 font-medium">
                {textBeforeLink}
                <a
                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                    style={{ color: "var(--primary-color)" }}
                    onClick={() => router.push(redirectTo)}
                >
                    {linkText}
                </a>
            </span>
        </div>
    );
};
