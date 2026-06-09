import React, { useState } from 'react';
import { SegmentedControl } from '../base/SegmentControl';

interface NamedSegmentedControlProps {
    label: string;
    label1: string;
    label2: string;
    width?: string;
    fontSize?: string;
    inputFontSize?: string;
    height?: string;
    value: 1 | 2;
    onChange: (value: 1 | 2) => void;
}

export const NamedSegmentedControl: React.FC<NamedSegmentedControlProps> = ({
    label,
    label1,
    label2,
    width = '450px',
    fontSize = '20px',
    inputFontSize = '20px',
    height = '40px',
    value,
    onChange,

}) => {

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
                    <SegmentedControl
                        label1={label1}
                        label2={label2}
                        height={height}
                        FontSize={inputFontSize}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};