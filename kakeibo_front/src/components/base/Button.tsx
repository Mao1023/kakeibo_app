import React from "react";

interface ButtonProps {
    label: string;
    fontSize?: string;
    width?: string;
    padding?: string;
    onClick?: () => void;
    errorMessage?: string;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    fontSize = '20px',
    width = '150px',
    padding = '10px',
    onClick,
    errorMessage

}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
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
            </div>

            {errorMessage && (
                <span style={{
                    color: 'red',
                    fontSize: '20px',
                    whiteSpace: 'nowrap',
                    marginTop: '4px',
                    textAlign: 'center'
                }}>
                    {errorMessage}
                </span>
            )}

        </div>

    );
};