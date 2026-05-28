import React from "react";

interface TitleProps {
  label: string;          // 文字
  fontSize?: string;      // 文字の大きさ
}

export const Title: React.FC<TitleProps> = ({
  label,
  fontSize = '80px'
}) => {
  return (
    <h1 style={{
      alignItems: 'center',
      margin: '0',
      color: '#000',
      textAlign: 'center',
      fontSize: fontSize
    }}>
        {label}
    </h1>
  );
};