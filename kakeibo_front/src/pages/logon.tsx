import React from 'react';
import { Title } from '../components/base/Title';
import { InputField } from '../components/base/InputFiels';

export const Logon = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Title label='家計簿' fontSize='100px' />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px', marginBottom: '30px' }}>
          <InputField label='ユーザー名' placeholder='ユーザー名を入力してください' alignItems='center' />
          <InputField label='パスワーaaaaaaド' placeholder='パスワードを入力してください' alignItems='center'/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '50px', alignItems: 'center' }}>
        <button style={{ width: '300px', padding: '20px',fontSize: '25px', backgroundColor: '#fff', border: '1px solid #000', borderRadius: '5px', cursor: 'pointer' }}>
          ログオン
        </button>
        <button style={{width: '300px', padding: '20px',fontSize: '25px', backgroundColor: '#fff', border: '1px solid #000', borderRadius: '5px', cursor: 'pointer' }}>
          新規登録
        </button>
      </div>
    </div>
  );
};