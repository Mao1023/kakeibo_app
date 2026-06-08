// ShisyutsuModal.tsx の骨組みイメージ
import React, { forwardRef, useState } from 'react';
import Modal from '../components/base/Modal';
import { Title } from '../components/base/Title';
import { InputField } from '../components/base/InputField';
import { NamedSelectBox } from '../components/arange/NamedSelectBox';
import DatePicker from 'react-datepicker';

interface ShisyutsuModalProps {
    showFlag: boolean;
    setShowModal: (flag: boolean) => void;
}

export const ShisyutsuModal: React.FC<ShisyutsuModalProps> = ({ showFlag, setShowModal }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    // 💡 CustomInput側の引数の型エラーを防ぐため interface を定義
    interface CustomInputProps {
        value?: string;
        onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }

    // 💡 refのエラーを防ぐため、InputFieldではなく外枠のdiv、またはInputFieldがref対応していればそちらに渡す
    const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick }, ref) => (
        <div onClick={onClick} ref={ref} style={{ width: '100%', cursor: 'pointer' }}>
            <InputField
                label='支出年月日'
                value={value || ''}
                onChange={() => { }} // DatePicker側で制御するため空関数
            />
        </div>
    ));
    CustomInput.displayName = 'CustomInput';

    return (
        <Modal showFlag={showFlag} setShowModal={setShowModal}>
            <Title label='支出入力' />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '30px',
                gap: '25px',
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
                <NamedSelectBox label='項目名' />
            </div>
        </Modal>
    );
};