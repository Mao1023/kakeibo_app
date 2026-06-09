import React from 'react';

// 仮の表示項目マスター（後で変更・拡張可能です）
const CATEGORIES = ['食費', '日用品', '交際費', '交通費', '衣服・美容', '趣味・娯楽', 'その他', '収入'];

export const KakeiboMatrixTable: React.FC = () => {
    // 1日〜31日までの配列を生成
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
            color: '#000'
        }}>
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none; /* Safari, Chrome 用 */
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE, Edge 用 */
                    scrollbar-width: none;  /* Firefox 用 */
                }
            `}</style>
            {/* スクロール可能なテーブルコンテナ */}
            <div
                className="no-scrollbar"
                style={{
                    overflowY: 'auto',
                    overflowX: 'auto',
                    flexGrow: 1,
                    maxHeight: 'calc(100vh - 120px)'
                }}
            >
                <table style={{
                    width: '100%',
                    height: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '12px',
                    textAlign: 'right'
                }}>
                    {/* ヘッダー（項目名） */}
                    <thead style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#f5f5f5',
                        zIndex: 1
                    }}>
                        <tr style={{ color: '#000' }}>
                            <th style={{ ...cellStyle, textAlign: 'center', width: '60px', position: 'sticky', left: 0, backgroundColor: '#f5f5f5', zIndex: 2 }}>日付</th>
                            {CATEGORIES.map(cat => (
                                <th key={cat} style={{ ...cellStyle, textAlign: 'center', minWidth: '40px' }}>{cat}</th>
                            ))}
                            <th style={{ ...cellStyle, textAlign: 'center', minWidth: '40px', backgroundColor: '#e9e9e9' }}>日合計</th>
                            <th style={{ ...cellStyle, textAlign: 'center', minWidth: '40px', backgroundColor: '#e9e9e9' }}>月累計</th>
                            <th style={{ ...cellStyle, textAlign: 'center', minWidth: '40px', backgroundColor: '#e9e9e9' }}>残高</th>
                            <th style={{ ...cellStyle, textAlign: 'center', minWidth: '40px', backgroundColor: '#e9e9e9' }}>残高残り日数</th>
                        </tr>
                    </thead>

                    {/* データ行（1日〜31日） */}
                    <tbody>
                        {days.map(day => (
                            <tr key={day} style={{ backgroundColor: day % 2 === 0 ? '#fafafa' : '#fff', color: '#000' }}>
                                {/* 日付セル（左固定） */}
                                <td style={{
                                    ...cellStyle,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    position: 'sticky',
                                    width: '10px',
                                    height: '20px',
                                    left: 0,
                                    backgroundColor: day % 2 === 0 ? '#fafafa' : '#fff',
                                    borderRight: '2px solid #000' // 💡 日付の右切り替え線を太い黒線に変更
                                }}>
                                    {day}日
                                </td>

                                {/* 各項目の金額 */}
                                {CATEGORIES.map(cat => (
                                    <td key={cat} style={cellStyle}>
                                        <span>0</span> {/* 💡 文字色を黒に修正 */}
                                    </td>
                                ))}

                                {/* 日ごとの合計 */}
                                <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#fcfcfc' }}>
                                    <span>0</span> {/* 💡 文字色を黒に修正 */}
                                </td>

                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                    <span>0</span>
                                </td>

                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                    <span>0</span>
                                </td>

                                <td style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                    <span>0</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    {/* フッター（項目ごとの月間合計） */}
                    <tfoot style={{
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: '#e9e9e9',
                        fontWeight: 'bold',
                        zIndex: 1,
                        color: '#000'
                    }}>
                        <tr>
                            <td style={{ ...cellStyle, textAlign: 'center', position: 'sticky', left: 0, backgroundColor: '#e9e9e9' }}>合計</td>
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

// 共通セルスタイル
const cellStyle: React.CSSProperties = {
    padding: '4px 10px',
    border: '1px solid #000',
    whiteSpace: 'nowrap'
};