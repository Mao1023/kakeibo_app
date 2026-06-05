import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  width?: string;
  fontSize?: string;
  inputFontSize?: string;
  height?: string;
  textAlign?: 'left' | 'right' | 'center';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  width = '450px',
  fontSize = '20px',
  inputFontSize = '20px',
  height = '40px',
  textAlign = 'left',
  value,
  onChange,
  errorMessage,
}) => {
  const [isReveal, setIsReveal] = useState(false);
  const inputType = type === 'password' ? (isReveal ? 'text' : 'password') : type;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      boxSizing: 'border-box',
      width: width
    }}>

      {/* ラベル（項目名） */}
      <div style={{
        flex: 4.5,
        display: 'flex',
        minWidth: 0,
        width: '250%',
      }}>
        <label style={{
          fontSize: fontSize,
          color: '#000',
          whiteSpace: 'nowrap',
          textAlign: 'justify',
          textAlignLast: 'justify',
          flexShrink: 0,
          width: '100%'
        }}>
          {label}
        </label>
      </div>

      <div style={{
        flex: 5.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        minWidth: 0,
        width: '100%'
      }}>
        {/* ： */}
        <span style={{ fontSize: fontSize, color: '#000' }}>：</span>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', position: 'relative' }}>
          {/* 入力欄本体 */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', position: 'relative' }}>
            <input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              style={{
                fontSize: inputFontSize,
                height: height,
                padding: '0 60px 0 12px',
                border: '1px solid #000',
                boxSizing: 'border-box',
                width: '100%',
                textAlign: textAlign,
                minWidth: 0,
                flexShrink: 0
              }}
            />

            {type === 'password' && (
              <span
                onClick={() => setIsReveal(!isReveal)}
                role="presentation"
                style={{
                  position: 'absolute',
                  right: '15px',
                  cursor: 'pointer',
                  fontSize: '30px',
                  color: '#666',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                {isReveal ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
              </span>
            )}
          </div>

          {errorMessage && (
            <span style={{
              color: 'red',
              fontSize: inputFontSize,
              whiteSpace: 'nowrap',
              position: 'absolute',
              top: height,
              marginTop: '8px',
              textAlign: 'left'
            }}>
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};