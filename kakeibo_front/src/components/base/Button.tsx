import React from "react";

interface ButtonProps {
    label: string;
    fontSize?: string;
    width?: string;
    height?: string;
    padding?: string;
    backgroundColor?: string,
    onClick?: () => void;
    errorMessage?: string;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    fontSize = '20px',
    width = '150px',
    height = '70px',
    padding = '10px',
    backgroundColor = '#fff',
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
                        height: height,
                        padding: padding,
                        backgroundColor: backgroundColor,
                        border: '1px solid #000',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        alignItems: 'center',
                        lineHeight: 1,
                        verticalAlign: 'middle',
                    }}>
                    {label}
                </button>
            </div>

            {errorMessage && (
                <span style={{
                    color: 'red',
                    fontSize: fontSize,
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