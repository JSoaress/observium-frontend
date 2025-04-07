import { useRef } from "react";

import { Button, ButtonProps } from "@/components/primereact/button";
import { Menu, MenuProps } from "@/components/primereact/menu";

type Props = ButtonProps & {
    "aria-controls": string;
    menu: MenuProps;
};

export const ButtonWithMenuPopup = ({ menu, onClick: onClickButton, ...props }: Props) => {
    const menuRef = useRef<Menu>(null);

    return (
        <>
            <Menu {...menu} ref={menuRef} popup id={props["aria-controls"]} className="background-pink-strong" />
            <Button
                {...props}
                aria-haspopup
                onClick={(e) => {
                    if (onClickButton) onClickButton(e);
                    menuRef.current?.toggle(e);
                }}
            />
        </>
    );
};
