import React from "react";
import { Button } from "../base/Button";

interface logoutButtonProps {
    label: string;
    fontSize?: string;
    width?: string;
    padding?: string;
    onClick?: () => void;
}

export const logoutButton: React.FC<logoutButtonProps> = ({
    label,
    fontSize = '20px',
    width = '150px',
    padding = '10px',
    onClick
}) => {
    return (
        <Button label='ログオフ' />
    );
};