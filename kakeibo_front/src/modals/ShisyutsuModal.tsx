import React, { forwardRef, useState } from 'react';
import Modal from '../components/base/Modal';
import { Title } from '../components/base/Title';
import { InputField } from '../components/base/InputField';
import { NamedSelectBox } from '../components/arange/NamedSelectBox';
import DatePicker from 'react-datepicker';
import { isValidLength, isValidNumber } from '../utils/Validation';
import { Button } from '../components/base/Button';
import { NamedSegmentedControl } from '../components/arange/NamedSegmentedControl';
import { toHalfWidth } from '../utils/StringUtil';

interface ExpenseLog {
    day: number;
    category: string;
    amount: number;
    name?: string;
}

interface ShisyutsuModalProps {
    showFlag: boolean;
    setShowModal: (flag: boolean) => void;
    onAddExpense: (expense: ExpenseLog) => void;
}

export const ShisyutsuModal: React.FC<ShisyutsuModalProps> = ({ showFlag, setShowModal, onAddExpense }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [itemCategory, setItemCategory] = useState('1');
    const [shisyutsuType, setShisyutsuType] = useState<1 | 2>(2);
    const [shisyutsuName, setShisyutsuName] = useState('');
    const [shisyutsuAmount, setShisyutsuAmount] = useState('');

    const [shisyutsuNameError, setShisyutsuNameError] = useState('');
    const [shisyutsuAmountError, setShisyutsuAmountError] = useState('');

    interface CustomInputProps {
        value?: string;
        onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }

    const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => (
        <div onClick={onClick} ref={ref} style={{ width: '100%', cursor: 'pointer' }}>
            <InputField
                label='支出年月日'
                value={value || ''}
                onChange={() => { }}
                height='35px'
            />
        </div>
    ));
    CustomInput.displayName = 'CustomInput';

    const resetForm = () => {
        setStartDate(new Date());
        setItemCategory('1');
        setShisyutsuType(2);
        setShisyutsuName('');
        setShisyutsuAmount('');
        setShisyutsuNameError('');
        setShisyutsuAmountError('');
    };

    const handleShisyutsuNameChange = (val: string) => {
        setShisyutsuName(val);
        if (!val.trim()) {
            setShisyutsuNameError('支出名を入力してください。');
        } else if (!isValidLength(val, 1, 255)) {
            setShisyutsuNameError('255桁以内で入力してください。');
        } else {
            setShisyutsuNameError('');
        }
    };

    // 💡 文字列からカンマや不要な日本語ノイズを完全に除去してクリーンな文字列にする安全ガード
    const cleanNumberString = (value: string): string => {
        const halfWidth = toHalfWidth(value);
        // カンマ、および数値以外の文字（日本語・英字など）をすべて抹消
        return halfWidth.replace(/,/g, '').replace(/[^0-9]/g, '');
    };

    const handleStartAmountChange = (val: string) => {
        const cleaned = cleanNumberString(val);

        // 💡 カンマ付きで画面に見せるために3桁区切りの文字列に変換して保持
        const formatted = cleaned === '' ? '' : Number(cleaned).toLocaleString();
        setShisyutsuAmount(formatted);

        if (!cleaned.trim()) {
            setShisyutsuAmountError('支出額を入力してください。');
        } else {
            setShisyutsuAmountError(''); // 💡 不要文字は最初から弾かれるため、常時エラーなし
        }
    };

    const execHalfWidthConversion = (currentVal: string) => {
        const cleaned = cleanNumberString(currentVal);
        const formatted = cleaned === '' ? '' : Number(cleaned).toLocaleString();
        setShisyutsuAmount(formatted);

        if (!cleaned.trim()) {
            setShisyutsuAmountError('支出額を入力してください。');
        } else {
            setShisyutsuAmountError('');
        }
    };

    const handleRegister = () => {
        setShisyutsuNameError('');
        setShisyutsuAmountError('');

        let hasError = false;

        if (!shisyutsuName.trim()) {
            setShisyutsuNameError('支出名を入力してください。');
            hasError = true;
        } else if (!isValidLength(shisyutsuName, 1, 255)) {
            setShisyutsuNameError('255桁以内で入力してください。');
            hasError = true;
        }

        // 💡 登録用にカンマを完全に抜いた純粋な数字文字列を取得
        const rawAmount = shisyutsuAmount.replace(/,/g, '');

        if (!rawAmount.trim()) {
            setShisyutsuAmountError('支出額を入力してください。');
            hasError = true;
        } else if (!isValidNumber(rawAmount)) {
            setShisyutsuAmountError('半角数字で入力してください。');
            hasError = true;
        }

        if (hasError) return;

        const selectedDay = startDate ? startDate.getDate() : new Date().getDate();

        const categoryMapping: { [key: string]: string } = {
            '1': '食費',
            '2': '日用品',
            '3': '交際費',
            '4': '交通費',
            '5': '衣服・美容',
            '6': '趣味・娯楽',
            '7': 'その他'
        };

        const finalCategory = shisyutsuType === 1
            ? '収入'
            : (categoryMapping[itemCategory] || 'other');

        const newExpense: ExpenseLog = {
            day: selectedDay,
            category: finalCategory,
            name: shisyutsuName,
            amount: Number(rawAmount) // 💡 カンマなしの安全な数値を格納
        };

        onAddExpense(newExpense);
        resetForm();
        setShowModal(false);
    };

    return (
        <Modal showFlag={showFlag} setShowModal={setShowModal}>
            <Title label='支出入力' fontSize='35px' />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '30px',
                gap: '30px',
                position: 'relative'
            }}>
                <div style={{ width: '100%' }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        customInput={<CustomInput />}
                        popperPlacement="bottom-end"
                    />
                </div>
                {shisyutsuType === 2 && (
                    <NamedSelectBox
                        label='項目名'
                        height='35px'
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                    />
                )}
                <NamedSegmentedControl
                    label='支出分類'
                    label1='収入'
                    label2='出費'
                    value={shisyutsuType}
                    onChange={setShisyutsuType}
                />
                <InputField
                    label='支出名'
                    placeholder='支出名を入力してください'
                    inputFontSize='15px'
                    value={shisyutsuName}
                    onChange={(e) => handleShisyutsuNameChange(e.target.value)}
                    errorMessage={shisyutsuNameError}
                />
                <InputField
                    label='支出額'
                    placeholder='支出額を入力してください'
                    unit='円'
                    textAlign='right'
                    inputFontSize='15px'
                    value={isNaN(Number(shisyutsuAmount)) ? '0' : (Number(shisyutsuAmount) === 0 ? '0' : shisyutsuAmount.toLocaleString())}
                    onChange={(e) => handleStartAmountChange(e.target.value)}
                    errorMessage={shisyutsuAmountError}
                    onBlur={(e) => execHalfWidthConversion(e.target.value)}
                    onCompositionEnd={(e) => execHalfWidthConversion(e.currentTarget.value)}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px'
                }}>
                    <Button
                        label='戻る'
                        height='50px'
                        onClick={() => {
                            resetForm();
                            setShowModal(false);
                        }}
                    />
                    <Button
                        label='登録'
                        height='50px'
                        onClick={handleRegister}
                    />
                </div>
            </div>
        </Modal>
    );
};