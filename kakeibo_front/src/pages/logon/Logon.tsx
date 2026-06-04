import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidInput } from "../../utils/Validation";
import { Title } from '../../components/base/Title';
import { InputField } from '../../components/base/InputField';
import { Button } from '../../components/base/Button';

export const Logon: React.FC = () => {
  // メニュー画面への遷移
  const navigate = useNavigate();

  // 各入力欄のステート
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 各入力欄のエラーメッセージのステート
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [logonError, setLogonError] = useState('');

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

  const handleLogon = () => {
    let hasError = false;
    if (username.trim() === '') { setUsernameError('ユーザー名を入力してください。'); hasError = true; }
    if (password.trim() === '') { setPasswordError('パスワードを入力してください。'); hasError = true; }
    if (usernameError || passwordError || logonError) { hasError = true; }
    if ((username !== '' || password !== '') && (username !== 'maomao' || password !== 'maomaomao')) {
      setLogonError('ユーザー名かパスワードが間違っています。'); hasError = true;
    }
    if (!hasError) {
      localStorage.setItem('token', 'dummy_key');
      navigate('/menu');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Title label='家計簿アプリ' fontSize='60px' />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '45px', marginBottom: '60px' }}>
        <InputField
          label='ユーザー名'
          placeholder='ユーザー名を入力してください'
          width='800px'
          fontSize='25px'
          height='70px'
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          errorMessage={usernameError}
        />
        <InputField
          label='パスワード'
          placeholder='パスワードを入力してください'
          type='password'
          width='800px'
          fontSize='25px'
          height='70px'
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          errorMessage={passwordError}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <Button label='ログオン' fontSize='25px' width='250px' height='50px' padding='5px' onClick={handleLogon} errorMessage={logonError} />
        <Link to="/new" style={{ textDecoration: 'none' }}>
          <Button label='新規登録' fontSize='25px' width='250px' height='50px' padding='5px' />
        </Link>
      </div>
    </div>
  );
};