import React from 'react';
import { Button } from '../base/Button';
import { InputField } from '../base/InputField';
import { useNavigate, useParams } from 'react-router-dom';
import { toHalfWidth } from '../../utils/StringUtil';
import { isValidNumber } from '../../utils/Validation';

interface KakeiboSummaryProps {
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
    const { year, month } = useParams<{ year: string; month: string }>();
    const navigate = useNavigate();
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

    // 固定費の合計値を計算
    const totalFixedCost = fixedCosts.reduce((sum, item) => sum + item.amount, 0);
    // 総合計（繰越 + 今月分）
    const totalBudget = carryOver + initialAmount;

    const prevMonthNumber = currentMonth - 1 === 0 ? 12 : currentMonth - 1;

    const handlecurrentMonth = () => {
        const today = new Date();
        const thisYear = today.getFullYear();
        const thisMonth = String(today.getMonth() + 1).padStart(2, '0');
        navigate(`/kakeibo/${thisYear}/${thisMonth}`);
    };

    const handlePrevMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth - 1;
        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        }
        navigate(`/kakeibo/${newYear}/${String(newMonth).padStart(2, '0')}`);
    };

    const handleNextMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth + 1;
        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }
        navigate(`/kakeibo/${newYear}/${String(newMonth).padStart(2, '0')}`);
    };

    // 💡 カンマと数字以外の不要な文字列（日本語など）を完全に排除して数値化する安全ガード
    const parseNumber = (value: string): number => {
        // 1. 全角を半角に変換
        const halfWidth = toHalfWidth(value);
        // 2. カンマ、および数値・マイナス記号以外の文字（全角・半角英数・日本語）をすべて消去
        const cleanValue = halfWidth.replace(/,/g, '').replace(/[^0-9-]/g, '');

        if (cleanValue === '' || cleanValue === '-') return 0;
        const num = Number(cleanValue);
        return isNaN(num) ? 0 : num; // 💡 万が一 NaN になったら 0 で安全にフォールバック
    };

    const handleAmountChange = (index: number, value: string) => {
        const updatedCosts = fixedCosts.map((item, idx) => {
            if (idx === index) {
                return { ...item, amount: parseNumber(value) };
            }
            return item;
        });
        setFixedCosts(updatedCosts);
    };

    // 💡 特殊入力イベント用のハンドラーも安全にパースを適用
    const execSafeNumberConversion = (currentVal: string) => {
        const parsed = parseNumber(currentVal);
        setLivingExpenseResidual(parsed);
    };

    return (
        <div style={{
            width: '280px',
            boxSizing: 'border-box',
            textAlign: 'left',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                marginBottom: '10px'
            }}>
                <Button label='今月' width='50px' height='30px' onClick={handlecurrentMonth} />
            </div>

            {/* 月表示 */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '25px'
            }}>
                <Button label='<<' width='50px' height='30px' onClick={handlePrevMonth} />

                <h3 style={{ fontSize: '20px', textDecoration: 'underline', margin: '0', fontWeight: 'bold', flexDirection: 'row' }}>
                    {currentYear}年{currentMonth}月分
                </h3>

                <Button label='>>' width='50px' height='30px' onClick={handleNextMonth} />
            </div>

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
                            {prevMonthNumber}月分繰越
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
                    <InputField
                        label={`${currentMonth}月分`}
                        unit='円'
                        height='30px'
                        textAlign='right'
                        fontSize='16px'
                        inputFontSize='16px'
                        // 💡 表示が NaN の場合は '0' に退避
                        value={isNaN(initialAmount) ? '0' : (initialAmount === 0 ? '0' : initialAmount.toLocaleString())}
                        onChange={(e) => setInitialAmount(parseNumber(e.target.value))}
                    />
                </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0 0 12px 0' }} />

            {/* 総合計 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px', marginBottom: '30px' }}>
                <span>{isNaN(totalBudget) ? 0 : totalBudget.toLocaleString()} 円</span>
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
                                    value={isNaN(item.amount) ? '0' : (item.amount === 0 ? '0' : item.amount.toLocaleString())}
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
                            {isNaN(totalFixedCost) ? 0 : totalFixedCost.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 下段：生活費残高＆アクション */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                    <InputField
                        label='生活費残高'
                        unit='円'
                        fontSize='16px'
                        inputFontSize='16px'
                        textAlign='right'
                        value={isNaN(livingExpenseResidual) ? '0' : (livingExpenseResidual === 0 ? '0' : livingExpenseResidual.toLocaleString())}
                        onChange={(e) => setLivingExpenseResidual(parseNumber(e.target.value))}
                        onBlur={(e) => execSafeNumberConversion(e.target.value)}
                        onCompositionEnd={(e) => execSafeNumberConversion(e.currentTarget.value)}
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