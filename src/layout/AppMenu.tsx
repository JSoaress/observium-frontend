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
            label: "Organização",
            items: [{ label: "Workspace", icon: "pi pi-fw pi-building", to: "/users/workspaces" }],
        },
        {
            label: "Projetos",
            items: [
                { label: "Projetos", icon: "pi pi-fw pi-briefcase", to: "/users/projects" },
                { label: "API Keys", icon: "pi pi-fw pi-key", to: "/users/api-keys" },
            ],
        },
        {
            label: "Analytics",
            items: [{ label: "Eventos", icon: "pi pi-fw pi-chart-bar", to: "/analytics/events" }],
        },
        // {
        //     label: "Gestão",
        //     items: [{ label: "Pagamentos", icon: "pi pi-fw pi-money-bill", to: "/management/payments" }],
        // },
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
