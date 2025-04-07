"use client";
import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react";

import Link from "next/link";

import { classNames } from "primereact/utils";

import { Avatar } from "@/components/primereact/avatar";
import { Menu, MenuItem } from "@/components/primereact/menu";
import { useAuth } from "@/features/auth";
import { ModalChangePassword, ModalChangePasswordRef } from "@/features/profile/modal-change-password";
import { AppTopbarRef } from "@/types";

import { LayoutContext } from "./context/layoutcontext";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const menuProfileRef = useRef<Menu>(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const modalChangePasswordRef = useRef<ModalChangePasswordRef>(null);
    const { user, logout } = useAuth();

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const getInitialsUserName = (name: string) => {
        if (!name) return "-";
        const [firstName, lastName] = name.split(" ");
        let initials = firstName[0];
        if (lastName) initials = initials + lastName[0];
        if (!lastName) initials = initials + firstName[1];
        const result = initials.toUpperCase();
        return result !== "CU" ? result : "C";
    };

    const items: MenuItem[] = [
        {
            template: (item, options) => {
                return (
                    <button
                        onClick={(e) => options.onClick(e)}
                        className={classNames(
                            options.className,
                            "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround",
                        )}
                    >
                        <Avatar label={getInitialsUserName(user?.name || "")} className="mr-2" shape="circle" />
                        <div className="flex flex-column align">
                            <span className="font-bold">{user?.name}</span>
                        </div>
                    </button>
                );
            },
        },
        { separator: true },
        {
            label: "Perfil",
            items: [
                { label: "Minha conta", icon: "pi pi-user", disabled: true },
                {
                    label: "Alterar senha",
                    icon: "pi pi-key",
                    disabled: true,
                    command: () => modalChangePasswordRef.current?.open(),
                },
                { label: "Sair", icon: "pi pi-sign-out", command: logout },
            ],
        },
    ];

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src="/layout/images/observium-text.png" width="140px" alt="logo" />
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames("layout-topbar-menu", {
                    "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
                })}
            >
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-question-circle" />
                    <span>Help</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-bell" />
                    <span>Notifications</span>
                </button>
                <Menu ref={menuProfileRef} popup model={items} />
                <button
                    type="button"
                    onClick={(e) => menuProfileRef.current?.toggle(e)}
                    className="p-link layout-topbar-button"
                >
                    <i className="pi pi-user"></i>
                    <span>{user?.name}</span>
                </button>
            </div>
            <ModalChangePassword ref={modalChangePasswordRef} />
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
