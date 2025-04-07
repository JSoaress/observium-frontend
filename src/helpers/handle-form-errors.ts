/* eslint-disable @typescript-eslint/no-explicit-any */
type SourceError = string;

export type HandleErrorsConfig<T> = { [K in keyof T]?: SourceError | { sourceError: SourceError; message?: string } };

export type InputErrors = Record<string, string[]>;

export type HandledError = Record<string, string>;

function handleErrors(errors: InputErrors): HandledError {
    const handledErrors: HandledError = {};
    Object.entries(errors).forEach(([k, v]) => {
        handledErrors[k] = v.join(" ");
    });
    return handledErrors;
}

export function handleFormErrors<T = any>(errors: InputErrors, config?: HandleErrorsConfig<T>): HandledError {
    let handledErrors: HandledError = {};
    if (!config) {
        handledErrors = handleErrors(errors);
        return handledErrors;
    }
    handledErrors = handleErrors(errors);
    Object.entries(config).forEach(([k, c]) => {
        if (typeof c === "string") {
            if (errors[c]) handledErrors[k] = errors[c].join(" ");
        } else {
            const { sourceError, message } = c as { sourceError: string; message?: string };
            if (errors[sourceError]) {
                const errorMessage = message || errors[sourceError]?.join(" ") || "Campo inválido.";
                handledErrors[k] = errorMessage;
            }
        }
    });
    return handledErrors;
}
