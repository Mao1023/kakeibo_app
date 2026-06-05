import React, { useState } from 'react';
import { SelectBox } from '../base/SelectBox';

interface NamedSelectBoxProps {
    label: string;
    width?: string;
    fontSize?: string;
    inputFontSize?: string;
    height?: string;
}

export const NamedSelectBox: React.FC<NamedSelectBoxProps> = ({
    label,
    width = '450px',
    fontSize = '20px',
    inputFontSize = '20px',
    height = '40px',
}) => {

    const [itemId, setItemId] = useState<string>('');

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
                    <SelectBox
                        height={height}
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        inputFontSize={inputFontSize}
                    />
                </div>
            </div>
        </div>
    );
};