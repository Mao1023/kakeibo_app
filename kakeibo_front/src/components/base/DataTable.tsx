import React from 'react';

interface Column<T> {
    header: string;
    render: (item: T, index: number) => React.ReactNode;
    width?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    maxHeight?: string;
}

export const DataTable = <T,>({ columns, data, maxHeight = '400px' }: DataTableProps<T>) => {
    return (
        <div style={{
            width: '100%',
            maxHeight: maxHeight,
            overflowY: 'auto',
            border: '1px solid #000',
            boxSizing: 'border-box'
        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'center',
                backgroundColor: '#fff'
            }}>
                {/* ヘッダーエリア */}
                <thead style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                    boxShadow: '0 1px 0 #000'
                }}>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} style={{
                                padding: '12px 8px',
                                borderBottom: '1px solid #000',
                                borderRight: idx < columns.length - 1 ? '1px solid #000' : 'none',
                                width: col.width,
                                fontSize: '18px',
                                fontWeight: 'normal'
                            }}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* データ行エリア */}
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '20px', color: '#999' }}>
                                データがありません
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #000' }}>
                                {columns.map((col, idx) => (
                                    <td key={idx} style={{
                                        padding: '10px 8px',
                                        borderRight: idx < columns.length - 1 ? '1px solid #000' : 'none',
                                        fontSize: '18px',
                                        verticalAlign: 'middle'
                                    }}>
                                        {col.render(item, index)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};