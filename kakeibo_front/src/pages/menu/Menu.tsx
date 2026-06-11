import React from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/base/Button';

export const Menu = () => {
    const navigate = useNavigate();

    const handlecurrentMonth = () => {
        const today = new Date();
        const thisYear = today.getFullYear();

        const thisMonth = String(today.getMonth() + 1).padStart(2, '0');

        navigate(`/kakeibo/${thisYear}/${thisMonth}`);
    };

    return (
        <div style={{ textAlign: 'center' }} >
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <Title label='メニュー' />
            </div>

            <LogoutButton />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px', alignItems: 'center' }}>
                <div style={{ textDecoration: 'none' }}>
                    <Button label='家計簿' fontSize='25px' width='300px' padding='20px' onClick={handlecurrentMonth} />
                </div>
                <Link to="/setting" style={{ textDecoration: 'none' }}>
                    <Button label='設定' fontSize='25px' width='300px' padding='20px' />
                </Link>
            </div>
        </div>
    );
};