import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailModal } from '../../modals/DetailModal';

const CATEGORIES = ['食費', '日用品', '交際費', '交通費', '衣服・美容', '趣味・娯楽', 'その他', '収入'];

interface ExpenseLog {
    day: number;
    category: string;
    amount: number;
    name?: string;
}

interface KakeiboMatrixTableProps {
    expenses: ExpenseLog[];
    livingExpenseResidual: number;
}

export const KakeiboMatrixTable: React.FC<KakeiboMatrixTableProps> = ({ expenses, livingExpenseResidual }) => {
    const { year, month } = useParams<{ year: string; month: string }>();
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    let runningTotalExpense = 0;

    const [showDetail, setShowDetail] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState<ExpenseLog[]>([]);
    const [detailTitle, setDetailTitle] = useState('');

    const handleCellClick = (day: number, category: string, matchedExpenses: ExpenseLog[]) => {
        if (matchedExpenses.length === 0) return;

        setDetailTitle(`${currentMonth}月${day}日 - ${category} の詳細`);
        setSelectedDetails(matchedExpenses);
        setShowDetail(true);
    };

    const categoryTotals: { [key: string]: number } = {};
    CATEGORIES.forEach(cat => {
        categoryTotals[cat] = expenses
            .filter(exp => exp.category === cat)
            .reduce((sum, item) => sum + item.amount, 0);
    });

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
                    overflow: 'hidden',
                    flexGrow: 1,
                    height: '100%',
                    width: '100%'
                }}
            >
                <table style={{
                    width: '100%',
                    height: '150vh',
                    tableLayout: 'fixed',
                    borderCollapse: 'collapse',
                    fontSize: '11px',
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
                            <th style={{ ...cellStyle, textAlign: 'center', width: '8%', backgroundColor: '#e9e9e9' }}>残高/残り日数</th>
                        </tr>
                    </thead>

                    {/* データ行 */}
                    <tbody>
                        {days.map(day => {
                            // 各項目の金額を集計
                            let dayExpenseSum = 0;
                            let dayIncome = 0;

                            CATEGORIES.forEach(cat => {
                                const matched = expenses.filter(exp => exp.day === day && exp.category === cat);
                                const amt = matched.reduce((sum, item) => sum + item.amount, 0);
                                if (cat === '収入') {
                                    dayIncome += amt;
                                } else {
                                    dayExpenseSum += amt;
                                }
                            });

                            // 日合計（支出合計 - 収入）
                            const dailyNetExpense = dayIncome - dayExpenseSum;

                            // 月累計（純減額の積み上げ）
                            runningTotalExpense += dailyNetExpense;

                            // 残高（初期残高 - 月累計）
                            const currentBalance = livingExpenseResidual + runningTotalExpense;

                            // 残高 / 残り日数（明日〜月末までの日数）
                            const remainingDays = daysInMonth - day;
                            const dailyBudget = remainingDays > 0 ? Math.floor(currentBalance / remainingDays) : 0;

                            return (
                                <tr key={day} style={{ backgroundColor: day % 2 === 0 ? '#fafafa' : '#fff', color: '#000' }}>
                                    <td style={{
                                        ...cellStyle,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        borderRight: '2px solid #000'
                                    }}>
                                        {day}日
                                    </td>
                                    {CATEGORIES.map(cat => {
                                        const matchedExpenses = expenses.filter(exp => exp.day === day && exp.category === cat);
                                        const totalAmount = matchedExpenses.reduce((sum, item) => sum + item.amount, 0);

                                        return (
                                            <td
                                                key={cat}
                                                style={{
                                                    ...cellStyle,
                                                    cursor: totalAmount > 0 ? 'pointer' : 'default',
                                                    backgroundColor: totalAmount > 0 ? '#e6f7ff' : 'transparent'
                                                }}
                                                onClick={() => handleCellClick(day, cat, matchedExpenses)}
                                            >
                                                <span>{totalAmount === 0 ? 0 : totalAmount.toLocaleString()}</span>
                                            </td>
                                        );
                                    })}
                                    {/* 日合計 */}
                                    <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#fcfcfc' }}>
                                        <span>{dailyNetExpense.toLocaleString()}</span>
                                    </td>
                                    {/* 月累計 */}
                                    <td style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                        <span>{runningTotalExpense.toLocaleString()}</span>
                                    </td>
                                    {/* 残高 */}
                                    <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#fff' }}>
                                        <span>{currentBalance.toLocaleString()}</span>
                                    </td>
                                    {/* 残高/残り日数 */}
                                    <td style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                        <span>{remainingDays > 0 ? `${dailyBudget.toLocaleString()}` : '-'}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                    {/* フッター */}
                    <tfoot style={{ backgroundColor: '#e9e9e9', fontWeight: 'bold', color: '#000' }}>
                        <tr>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>合計</td>
                            {/* 食費〜収入までの各項目ごとの縦合計を表示 */}
                            {CATEGORIES.map(cat => (
                                <td key={cat} style={cellStyle}>
                                    {categoryTotals[cat] === 0 ? 0 : categoryTotals[cat].toLocaleString()}
                                </td>
                            ))}
                            {/* 縦に足すと意味が崩れる列は計算せず '-' で固定 */}
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf', textAlign: 'center' }}>-</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf', textAlign: 'center' }}>-</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf', textAlign: 'center' }}>-</td>
                            <td style={{ ...cellStyle, backgroundColor: '#dfdfdf', textAlign: 'center' }}>-</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <DetailModal
                showFlag={showDetail}
                setShowModal={setShowDetail}
                title={detailTitle}
                details={selectedDetails}
            />
        </div>
    );
};

const cellStyle: React.CSSProperties = {
    padding: '2px 4px',
    border: '1px solid #000',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};