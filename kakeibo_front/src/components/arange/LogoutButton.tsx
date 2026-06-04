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
        <div style={{ position: 'absolute', right: '50px', top: '20px' }}>
            <Button
                label='ログオフ'
                fontSize='20px'
                width='110px'
                height='50px'
                padding='10px'
                onClick={handleLogout} />
        </div>
    );
};