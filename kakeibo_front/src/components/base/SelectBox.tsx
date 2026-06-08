import React, { useEffect, useState } from 'react';

// 項目マスタの型定義
interface Item {
    itemId: number;
    itemName: string;
}

interface SelectBoxProps {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    inputFontSize?: string;
    height?: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
    value,
    onChange,
    inputFontSize = '20px',
    height = '40px',
}) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        // TODO: バックエンド(Spring Boot)のAPIが完成したらfetchに差し替え
        // 本来はログイン中の user_id に紐づく項目を get する
        const mockItems: Item[] = [
            { itemId: 1, itemName: '食品' },
            { itemId: 2, itemName: '日用品' },
            { itemId: 3, itemName: '交際費' },
        ];
        setItems(mockItems);
    }, []);

    return (
        <select
            value={value}
            onChange={onChange}
            className="border rounded p-1 w-full"
            style={{
                fontSize: inputFontSize,
                height: height,
                padding: '0 60px 0 12px',
                border: '1px solid #000',
                boxSizing: 'border-box',
                width: '100%',
                minWidth: 0,
                flexShrink: 0
            }}
        >
            {items.map((item) => (
                <option key={item.itemId} value={item.itemId}>
                    {item.itemName}
                </option>
            ))}
        </select>
    );
};