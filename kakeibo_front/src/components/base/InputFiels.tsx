import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  alignItems?: string,
  type?: string;
  width?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  alignItems = 'flex-start',
  type = 'text',
  width = '450px'
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: alignItems,
      gap: '10px',
      width: width
    }}>

      {/* ラベル（項目名） */}
      <label style={{
        fontSize: '20px',
        color: '#000',
        whiteSpace: 'nowrap',
        flex: 5,
        textAlign: 'right',
        flexShrink: 0
      }}>
        <span>{label + '：'}</span>
      </label>

      {/* 入力欄本体 */}
      <input
        type={type}
        placeholder={placeholder}
        style={{
          height: '40px',
          padding: '0 12px',
          border: '1px solid #000',
          boxSizing: 'border-box',
          flex: 5,
          flexShrink: 0
        }}
      />
    </div>
  );
};