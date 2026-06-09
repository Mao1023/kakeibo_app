import React, { useState } from 'react';
import { Title } from '../../components/base/Title';
import { InputField } from '../../components/base/InputField';
import { useNavigate } from 'react-router-dom';
import { isValidInput } from '../../utils/Validation';
import { Button } from '../../components/base/Button';
import { BackButton } from '../../components/arange/BackButton';

export const New = () => {
    // メニュー画面への遷移
    const navigate = useNavigate();

    // 各入力欄のステート
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // 各入力欄のエラーメッセージのステート
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    // ユーザー名の入力バリデーション
    const handleUsernameChange = (val: string) => {
        setUsername(val);

        if (val.length > 0) {
            if (!isValidInput(val, 5, 50)) {
                setUsernameError('半角英数字・記号を5文字以上50桁以内で入力してください。');
            } else {
                setUsernameError('');
            }
        } else {
            setUsernameError('');
        }
    };

    // パスワードの入力バリデーション
    const handlePasswordChange = (val: string) => {
        setPassword(val);

        if (val.length > 0) {
            if (!isValidInput(val, 8, 255)) {
                setPasswordError('半角英数字・記号を8文字以上255桁以内で入力してください。');
            } else {
                passwordError && setPasswordError('');
            }
        } else {
            setPasswordError('');
        }
    };

    // パスワード（確認用）の入力バリデーション
    const handlePasswordConfirmChange = (val: string) => {
        setPasswordConfirm(val);

        if (val.length > 0) {
            if (!isValidInput(val, 8, 255)) {
                setPasswordConfirmError('半角英数字・記号を8文字以上255桁以内で入力してください。');
            } else {
                passwordConfirmError && setPasswordConfirmError('');
            }
        } else {
            setPasswordConfirmError('');
        }
    };

    const handleRegister = () => {
        let hasError = false;

        if (username.trim() === '') { setUsernameError('ユーザー名を入力してください。'); hasError = true; }
        if (password.trim() === '') { setPasswordError('パスワードを入力してください。'); hasError = true; }
        if (passwordConfirm.trim() === '') { setPasswordConfirmError('パスワード（確認用）を入力してください。'); hasError = true; }
        if (usernameError || passwordError || passwordConfirmError) { hasError = true; }
        if (username === 'maomao') {
            setUsernameError('既に使われているユーザー名が登録されています。異なるユーザー名を入力してください。');
            hasError = true;
        }
        if (password !== passwordConfirm) {
            setPasswordConfirmError('パスワード入力欄に入力されたパスワードと異なります。'); hasError = true;
        }
        if (!hasError) {
            // DB登録完了
            navigate('/logon');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Title label='新規登録' />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px', marginBottom: '40px' }}>
                <InputField
                    label='ユーザー名'
                    placeholder='ユーザー名を入力してください'
                    width='800px'
                    fontSize='30px'
                    inputFontSize='17px'
                    height='50px'
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    errorMessage={usernameError}
                />
                <InputField
                    label='パスワード'
                    placeholder='パスワードを入力してください'
                    type='password'
                    width='800px'
                    fontSize='30px'
                    inputFontSize='17px'
                    height='50px'
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    errorMessage={passwordError}
                />
                <InputField
                    label='パスワード（確認用）'
                    placeholder='パスワード（確認用）を入力してください'
                    type='password'
                    width='800px'
                    fontSize='30px'
                    inputFontSize='17px'
                    height='50px'
                    value={passwordConfirm}
                    onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                    errorMessage={passwordConfirmError}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px', alignItems: 'center' }}>
                <Button label='登録' fontSize='25px' width='300px' onClick={handleRegister} />
            </div>
            <BackButton url='/logon' />
        </div>
    );
};