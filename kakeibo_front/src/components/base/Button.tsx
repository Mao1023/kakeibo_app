import React from "react";

interface ButtonProps {
    label: string;
    fontSize?: string;
    width?: string;
    padding?: string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    fontSize = '20px',
    width = '150px',
    padding = '10px',
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                fontSize: fontSize,
                width: width,
                padding: padding,
                backgroundColor: '#fff',
                border: '1px solid #000',
                borderRadius: '15px',
                cursor: 'pointer'
            }}>
            {label}
        </button>
    );
};