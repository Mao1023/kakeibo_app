import React from 'react';
import { Button } from './Button';

interface SegmentedControlProps {
    label1: string;
    label2: string;
    value: 1 | 2;
    onChange: (value: 1 | 2) => void;
    FontSize?: string;
    height?: string;
    weight?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
    label1,
    label2,
    value,
    onChange,
    FontSize = '20px',
    height = '40px',
    weight = '90px'
}) => {


    return (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Button
                label={label1}
                fontSize={FontSize}
                width={weight}
                height={height}
                padding='5px'
                onClick={() => onChange(1)}
                backgroundColor={value === 1 ? '#ccc' : '#fff'}
            />
            <span style={{ display: 'flex', fontSize: FontSize }}>・</span>
            <Button
                label={label2}
                fontSize={FontSize}
                width={weight}
                height={height}
                padding='5px'
                onClick={() => onChange(2)}
                backgroundColor={value === 2 ? '#ccc' : '#fff'}
            />
        </div>
    );
};