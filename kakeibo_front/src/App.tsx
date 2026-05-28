import React from 'react';
import { Logon } from './pages/logon'; // さっき作ったファイルを読み込む

function App() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 枠線で囲まれたログインカードっぽくするスタイル */}
        <Logon />
    </div>
  );
}

export default App;