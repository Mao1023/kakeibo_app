import React from 'react';

interface ToggleButtonProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    fontSize?: string;
    width?: string;
    baseWidth?: string;
    handleWidth?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    checked = false,
    onChange,
    label,
    fontSize = '20px',
    width = '450px',
    baseWidth = '70px',
    handleWidth = '35px'
}) => {
    // 💡 土台（背景）のスタイル
    const switchStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        width: baseWidth,
        height: handleWidth,
        backgroundColor: checked ? '#4cd964' : '#ccc', // ONなら緑、OFFならグレー
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'background-color 0.3s', // 色が変わるときのアニメーション
    };

    // 💡 中の丸いツマミのスタイル
    const dialStyle: React.CSSProperties = {
        position: 'absolute',
        top: '1px',
        left: checked ? handleWidth : '0px', // ONなら右側、OFFなら左側にワープ
        width: handleWidth,
        height: handleWidth,
        backgroundColor: '#fff',
        borderRadius: '50%',
        transition: 'left 0.3s', // 丸がスライドするアニメーション
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    };

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

                {/* トグルボタン本体 */}
                <div
                    style={switchStyle}
                    onClick={() => onChange(!checked)} // クリックされたら状態を反転させる
                >
                    <div style={dialStyle} />
                </div>

            </div>


        </div>

    );
};