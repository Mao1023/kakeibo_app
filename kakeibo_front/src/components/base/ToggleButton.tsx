import React from 'react';

interface ToggleButtonProps {
    checked?: boolean;                    // ON（true）かOFF（false）かの状態
    onChange: (checked: boolean) => void; // 切り替わったときのイベント
    label?: string;                      // ボタンの横に添えるテキスト（任意）
    fontSize?: string;                   // ラベルのフォントサイズ
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    checked = false,
    onChange,
    label,
    fontSize = '20px',
}) => {
    // 💡 土台（背景）のスタイル
    const switchStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        width: '250px',
        height: '100px',
        backgroundColor: checked ? '#4cd964' : '#ccc', // ONなら緑、OFFならグレー
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'background-color 0.3s', // 色が変わるときのアニメーション
    };

    // 💡 中の丸いツマミのスタイル
    const dialStyle: React.CSSProperties = {
        position: 'absolute',
        top: '1px',
        left: checked ? '151px' : '1px', // ONなら右側、OFFなら左側にワープ
        width: '100px',
        height: '100px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        transition: 'left 0.3s', // 丸がスライドするアニメーション
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* ラベルがあれば表示 */}
            {label && <span style={{ fontSize: fontSize, color: '#000' }}>{label}</span>}

            {/* トグルボタン本体 */}
            <div
                style={switchStyle}
                onClick={() => onChange(!checked)} // クリックされたら状態を反転させる
            >
                <div style={dialStyle} />
            </div>
        </div>
    );
};