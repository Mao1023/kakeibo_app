import React, { forwardRef, useState } from 'react';
import Modal from '../components/base/Modal';
import { Title } from '../components/base/Title';
import { InputField } from '../components/base/InputField';
import { NamedSelectBox } from '../components/arange/NamedSelectBox';
import DatePicker from 'react-datepicker';
import { isValidLength, isValidNumber } from '../utils/Validation';
import { Button } from '../components/base/Button';
import { NamedSegmentedControl } from '../components/arange/NamedSegmentedControl';

interface ShisyutsuModalProps {
    showFlag: boolean;
    setShowModal: (flag: boolean) => void;
}

export const ShisyutsuModal: React.FC<ShisyutsuModalProps> = ({ showFlag, setShowModal }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [itemCategory, setItemCategory] = useState('');
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

    // 💡 リアルタイムの入力値チェック（引数 val から判定する形に統一）
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

    const handleStartAmountChange = (val: string) => {
        setShisyutsuAmount(val);

        if (!val.trim()) {
            setShisyutsuAmountError('支出額を入力してください。');
        } else if (!isValidNumber(val)) {
            setShisyutsuAmountError('半角数字で入力してください。');
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

        if (!shisyutsuAmount.trim()) {
            setShisyutsuAmountError('支出額を入力してください。');
            hasError = true;
        } else if (!isValidNumber(shisyutsuAmount)) {
            setShisyutsuAmountError('半角数字で入力してください。');
            hasError = true;
        }

        if (hasError) return;

        console.log('登録データ:', {
            date: startDate,
            category: itemCategory,
            type: shisyutsuType,
            name: shisyutsuName,
            amount: Number(shisyutsuAmount)
        });

        resetForm();
        setShowModal(false);
    };

    const resetForm = () => {
        setStartDate(new Date());
        setItemCategory('');
        setShisyutsuType(2);
        setShisyutsuName('');
        setShisyutsuAmount('');
        setShisyutsuNameError('');
        setShisyutsuAmountError('');
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
                <NamedSelectBox
                    label='項目名'
                    height='35px'
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                />
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
                    value={shisyutsuAmount}
                    onChange={(e) => handleStartAmountChange(e.target.value)}
                    errorMessage={shisyutsuAmountError}
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