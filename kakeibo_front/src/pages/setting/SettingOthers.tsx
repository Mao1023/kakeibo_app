import React, { useState } from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { InputField } from '../../components/base/InputField';
import { isValidDate, isValidNumber } from '../../utils/Validation';
import { Button } from '../../components/base/Button';
import { ToggleButton } from '../../components/base/ToggleButton';

export const SettingOthers = () => {
    const [startDate, setstartDate] = useState(() => {
        return localStorage.getItem('startDate') || '1';
    });
    const [startAmount, setstartAmount] = useState(() => {
        return localStorage.getItem('startAmount') || '0';
    });

    const [startDateError, setStartDateError] = useState('');
    const [startAmountError, setStartAmountError] = useState('');

    const [isCarryOverOn, setisCarryOverOn] = useState(() => {
        return localStorage.getItem('isCarryOverOn') === 'true';
    });

    const handleToggleChange = (checked: boolean) => {
        setisCarryOverOn(checked);
        localStorage.setItem('isCarryOverOn', String(checked));
    };

    const handleStartDateChange = (val: string) => {
        setstartDate(val);

        if (val.length > 0) {
            if (!isValidDate(val)) {
                setStartDateError('1から31の間の半角数字で入力してください。');
            } else {
                setStartDateError('');
            }
        } else {
            setStartDateError('');
        }
    };

    const handleStartAmountChange = (val: string) => {
        setstartAmount(val);

        if (val.length > 0) {
            if (!isValidNumber(val)) {
                setStartAmountError('半角数字で入力してください。');
            } else {
                setStartAmountError('');
            }
        } else {
            setStartAmountError('');
        }
    };

    const handleRegister = () => {
        let hasError = false;
        if (startDate.trim() === '') { setStartDateError('開始日を入力してください。'); hasError = true; }
        if (startAmount.trim() === '') { setStartAmountError('開始額を入力してください。'); hasError = true; }
        if (startDateError || startAmountError) {
            hasError = true;
        }
        if (!hasError) {
            //   DB登録
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            paddingBottom: '0px',
            gap: '10px'
        }}>
            <Title label='その他設定' />

            <LogoutButton />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                width: '100%',
                paddingBottom: '15px',
                gap: '60px'
            }}>
                <InputField
                    label='月の開始日'
                    placeholder='月の開始日を入力してください'
                    unit='日'
                    width='700px'
                    fontSize='20px'
                    inputFontSize='20px'
                    height='50px'
                    textAlign='right'
                    value={startDate.toLocaleString()}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    errorMessage={startDateError}
                />

                <InputField
                    label='月の開始額'
                    placeholder='月の開始額を入力してください'
                    unit='円'
                    width='700px'
                    fontSize='20px'
                    inputFontSize='20px'
                    height='50px'
                    textAlign='right'
                    value={startAmount}
                    onChange={(e) => handleStartAmountChange(e.target.value)}
                    errorMessage={startAmountError}
                />

                <ToggleButton
                    label="先月分の繰り越し"
                    fontSize="20px"
                    checked={isCarryOverOn}
                    onChange={handleToggleChange}
                    width='700px'
                    baseWidth='90px'
                    handleWidth='45px'
                />

            </div>
            <BackButton url='/setting' />

            <Button label='登録' fontSize='25px' width='300px' onClick={handleRegister} />

        </div>
    );
};