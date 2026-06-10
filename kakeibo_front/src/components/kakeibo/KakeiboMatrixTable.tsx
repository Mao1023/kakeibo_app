import React from 'react';

const CATEGORIES = ['食費', '日用品', '交際費', '交通費', '衣服・美容', '趣味・娯楽', 'その他', '収入'];

export const KakeiboMatrixTable: React.FC = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            border: '1px solid #000',
            borderRadius: '4px',
            overflow: 'hidden',
            color: '#000',
            boxSizing: 'border-box'
        }}>
            {/* 💡 縦・横すべてのスクロールバーを完全に強制非表示 */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            <div
                className="no-scrollbar"
                style={{
                    overflow: 'hidden', // 💡 スクロールを一切発生させない
                    flexGrow: 1,
                    height: '100%',
                    width: '100%'
                }}
            >
                <table style={{
                    width: '100%',
                    height: '150vh', // 💡 親の高さ（画面下いっぱい）に強制的に合わせる
                    tableLayout: 'fixed', // 💡 列幅を固定し、横へのはみ出し・横スクロールを強制ストップ
                    borderCollapse: 'collapse',
                    fontSize: '11px', // 💡 31日分を限界まで詰め込むため、わずかに縮小
                    textAlign: 'right'
                }}>
                    {/* ヘッダー */}
                    <thead>
                        <tr style={{ color: '#000', height: 'auto' }}>
                            <th style={{ ...cellStyle, textAlign: 'center', width: '5%' }}>日付</th>
                            {CATEGORIES.map(cat => (
                                <th key={cat} style={{ ...cellStyle, textAlign: 'center', width: '7%' }}>{cat}</th>
                            ))}
                            <th style={{ ...cellStyle, textAlign: 'center', width: '8%', backgroundColor: '#e9e9e9' }}>日合計</th>
                            <th style={{ ...cellStyle, textAlign: 'center', width: '8%', backgroundColor: '#e9e9e9' }}>月累計</th>
                            <th style={{ ...cellStyle, textAlign: 'center', width: '8%', backgroundColor: '#e9e9e9' }}>残高</th>
                            <th style={{ ...cellStyle, textAlign: 'center', width: '10%', backgroundColor: '#e9e9e9' }}>残高残り日数</th>
                        </tr>
                    </thead>

                    {/* データ行 */}
                    <tbody>
                        {days.map(day => (
                            <tr key={day} style={{ backgroundColor: day % 2 === 0 ? '#fafafa' : '#fff', color: '#000' }}>
                                <td style={{
                                    ...cellStyle,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    borderRight: '2px solid #000'
                                }}>
                                    {day}日
                                </td>
                                {CATEGORIES.map(cat => (
                                    <td key={cat} style={cellStyle}><span>0</span></td>
                                ))}
                                <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#fcfcfc' }}><span>0</span></td>
                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}><span>0</span></td>
                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}><span>0</span></td>
                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}><span>0</span></td>
                            </tr>
                        ))}
                    </tbody>

                    {/* フッター */}
                    <tfoot style={{ backgroundColor: '#e9e9e9', fontWeight: 'bold', color: '#000' }}>
                        <tr>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>合計</td>
                            {CATEGORIES.map(cat => (
                                <td key={cat} style={cellStyle}>0</td>
                            ))}
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf' }}>0</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf' }}>0</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf' }}>0</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf' }}>0</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

const cellStyle: React.CSSProperties = {
    padding: '2px 4px', // 💡 縦パディングを限界まで詰め、横パディングも削って幅を確保
    border: '1px solid #000',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' // 💡 万が一文字が溢れたら「...」にする
};