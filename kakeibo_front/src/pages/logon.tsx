import React from 'react';

export const Logon = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>家計簿</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px', textAlign: 'left' }}>ユーザー名</label>
          <input type="text" style={{ flex: 1, padding: '8px', fontSize: '16px', border: '1px solid #000' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '100px', textAlign: 'left' }}>パスワード</label>
          <input type="password" style={{ flex: 1, padding: '8px', fontSize: '16px', border: '1px solid #000' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <button style={{ width: '150px', padding: '10px', backgroundColor: '#fff', border: '1px solid #000', borderRadius: '5px', cursor: 'pointer' }}>
          ログオン
        </button>
        <button style={{ width: '150px', padding: '10px', backgroundColor: '#fff', border: '1px solid #000', borderRadius: '5px', cursor: 'pointer' }}>
          新規登録
        </button>
      </div>
    </div>
  );
};