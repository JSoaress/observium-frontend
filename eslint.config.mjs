import pluginImportHelper from "eslint-plugin-import-helpers";
import prettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "react-hooks": pluginReactHooks,
            "import-helpers": pluginImportHelper,
            prettier,
        },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/react-in-jsx-scope": "off",
            "import-helpers/order-imports": [
                "warn",
                {
                    newlinesBetween: "always",
                    groups: ["/^react/", "/^next/", "module", "/^@/", ["parent", "sibling", "index"]],
                    alphabetize: {
                        order: "asc",
                        ignoreCase: true,
                    },
                },
            ],
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "primereact/*",
                                "!primereact/resources/*",
                                "!primereact/utils",
                                "!primereact/api",
                                "!primereact/hooks",
                            ],
                            message: "Use os componentes encapsulados em @/components/primereact",
                        },
                    ],
                },
            ],
            "prettier/prettier": "error",
        },
    },
];
