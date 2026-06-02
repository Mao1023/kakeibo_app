import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Logon } from './pages/logon/Logon';
import { New } from "./pages/logon/New";
import { Menu } from "./pages/menu/Menu";
import { Kakeibo } from './pages/kakeibo/Kakeibo';
import { Setting } from './pages/setting/Setting';
import { SettingItems } from './pages/setting/SettingItems';
import { SettingOthers } from './pages/setting/SettingOthers';
import { SettingAdmin } from './pages/setting/SettingAdmin';
import { ProtectedRoute } from './components/base/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/logon" element={<Logon />} />
          <Route path="/new" element={<New />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/kakeibo" element={<Kakeibo />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/items" element={<SettingItems />} />
            <Route path="/setting/others" element={<SettingOthers />} />
            <Route path="/setting/admin" element={<SettingAdmin />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;