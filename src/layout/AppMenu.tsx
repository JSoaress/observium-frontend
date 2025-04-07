import { AppMenuItem } from "@/types";

import AppMenuitem from "./AppMenuitem";
import { MenuProvider } from "./context/menucontext";

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: "Home",
            items: [{ label: "Dashboard", icon: "pi pi-fw pi-chart-bar", to: "/" }],
        },
        {
            label: "Usuário",
            items: [
                { label: "API Keys", icon: "pi pi-fw pi-key", to: "/users/api-keys" },
                { label: "Projetos", icon: "pi pi-fw pi-briefcase", to: "/users/projects" },
            ],
        },
        {
            label: "Gestão",
            items: [{ label: "Pagamentos", icon: "pi pi-fw pi-money-bill", to: "/management/payments" }],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
