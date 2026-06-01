import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Logon } from './pages/logon/Logon';
import { New } from "./pages/logon/New";
import { Menu } from "./pages/menu/Menu";

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/logon" element={<Logon />} />
          <Route path="/new" element={<New />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;