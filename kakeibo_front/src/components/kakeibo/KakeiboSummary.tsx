import React from 'react';
import { Button } from '../base/Button';
import { InputField } from '../base/InputField';

// 親（Kakeibo.tsx）から受け取るデータの型定義
interface KakeiboSummaryProps {
    monthLabel: string;          // 例: "2026年5月分"
    carryOver: number;           // 繰越金
    initialAmount: number;       // 今月分開始額
    setInitialAmount: (val: number) => void;
    fixedCosts: { name: string; amount: number }[];
    setFixedCosts: (costs: { name: string; amount: number }[]) => void;
    livingExpenseResidual: number; // 生活費残高
    setLivingExpenseResidual: (val: number) => void;
    onAutoCalculate: () => void; // 自動計算ボタンのアクション
    onOpenModal: () => void;     // 支出入力ボタンのアクション
}

export const KakeiboSummary: React.FC<KakeiboSummaryProps> = ({
    monthLabel,
    carryOver,
    initialAmount,
    setInitialAmount,
    fixedCosts,
    setFixedCosts,
    livingExpenseResidual,
    setLivingExpenseResidual,
    onAutoCalculate,
    onOpenModal,
}) => {
    // 固定費の合計値を計算
    const totalFixedCost = fixedCosts.reduce((sum, item) => sum + item.amount, 0);
    // 総合計（繰越 + 今月分）
    const totalBudget = carryOver + initialAmount;

    // 入力文字列を数値に安全に変換するヘルパー関数
    const parseNumber = (value: string): number => {
        const cleanValue = value.replace(/,/g, ''); // カンマを除去
        return cleanValue === '' ? 0 : Number(cleanValue);
    };

    const handleAmountChange = (index: number, value: string) => {
        const updatedCosts = fixedCosts.map((item, idx) => {
            if (idx === index) {
                return { ...item, amount: parseNumber(value) };
            }
            return item;
        });
        setFixedCosts(updatedCosts); // 親のStateを更新（自動的に再計算が走る）
    };

    return (
        <div style={{
            width: '280px',
            boxSizing: 'border-box',
            textAlign: 'left',
            fontFamily: 'sans-serif'
        }}>
            {/* 月表示 */}
            <h3 style={{ fontSize: '20px', textDecoration: 'underline', margin: '0 0 25px 0', fontWeight: 'bold' }}>
                {monthLabel}
            </h3>

            {/* 上段：金額集計エリア */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    boxSizing: 'border-box',
                    width: '300px'
                }}>
                    <div style={{
                        flex: 4.5,
                        display: 'flex',
                        minWidth: 0,
                    }}>
                        <label style={{
                            fontSize: '16px',
                            color: '#000',
                            whiteSpace: 'nowrap',
                            textAlign: 'justify',
                            textAlignLast: 'justify',
                            flexShrink: 0,
                            width: '100%'
                        }}>
                            4月分繰越
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
                        <span style={{ fontSize: '16px', color: '#000' }}>：</span>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            position: 'relative',
                            justifyContent: 'flex-end',
                            textAlign: 'right'
                        }}>
                            <span style={{ width: '100%', textAlign: 'right', paddingRight: '2px' }}>
                                {carryOver.toLocaleString()} 円
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px' }}>
                    {/* 【修正】5月分の入力は initialAmount を更新する */}
                    <InputField
                        label='5月分'
                        unit='円'
                        height='30px'
                        textAlign='right'
                        fontSize='16px'
                        inputFontSize='16px'
                        value={initialAmount === 0 ? '0' : String(initialAmount)}
                        onChange={(e) => setInitialAmount(parseNumber(e.target.value))}
                    />
                </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0 0 12px 0' }} />

            {/* 総合計 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px', marginBottom: '30px' }}>
                <span>{totalBudget.toLocaleString()} 円</span>
            </div>

            {/* 中段：固定費一覧テーブル */}
            <h4 style={{ fontSize: '18px', textDecoration: 'underline', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                固定費
            </h4>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'center',
                fontSize: '14px',
                marginBottom: '35px'
            }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '6px', width: '60%', fontWeight: 'normal' }}>固定費名</th>
                        <th style={{ border: '1px solid #000', padding: '6px', width: '40%', fontWeight: 'normal' }}>金額</th>
                    </tr>
                </thead>
                <tbody>
                    {fixedCosts.map((item, idx) => (
                        <tr key={idx}>
                            <td style={{ border: '1px solid #000', padding: '6px' }}>{item.name}</td>
                            <td style={{ border: '1px solid #000', padding: '0' }}>
                                <input
                                    type="text"
                                    value={item.amount === 0 ? 0 : item.amount.toLocaleString()}
                                    onChange={(e) => handleAmountChange(idx, e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        boxSizing: 'border-box',
                                        border: 'none',
                                        padding: '6px',
                                        textAlign: 'right',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        outline: 'none'
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                    {/* 固定費合計行 */}
                    <tr style={{ backgroundColor: '#fff' }}>
                        <td style={{ border: '1px solid #000', padding: '6px' }}>固定費合計</td>
                        <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'right' }}>
                            {totalFixedCost.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 下段：生活費残高＆アクション */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                    {/* 【修正】生活費残高の入力は livingExpenseResidual を更新する。value のフォーマットに合わせて、parse 時にカンマを除去する */}
                    <InputField
                        label='生活費残高'
                        unit='円'
                        fontSize='16px'
                        inputFontSize='16px'
                        textAlign='right'
                        value={livingExpenseResidual === 0 ? '0' : livingExpenseResidual.toLocaleString()}
                        onChange={(e) => setLivingExpenseResidual(parseNumber(e.target.value))}
                    />
                </div>
            </div>

            {/* 自動計算ボタン */}
            <div style={{ marginBottom: '45px' }}>
                <button
                    onClick={onAutoCalculate}
                    style={{
                        padding: '4px 12px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        border: '1px solid #000',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    自動計算
                </button>
            </div>

            {/* 支出入力ボタン */}
            <Button
                label="支出入力"
                fontSize="20px"
                width="100%"
                height="60px"
                onClick={onOpenModal}
            />
        </div>
    );
};