import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../base/Button";

interface LogoutButtonProps {
}

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/logon', { replace: true });
    };

    return (
        <div style={{ position: 'absolute', right: '50px', top: '50px' }}>
            <Button label='ログオフ' onClick={handleLogout} />
        </div>
    );
};