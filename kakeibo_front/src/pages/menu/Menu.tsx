import React from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { Link } from 'react-router-dom';
import { Button } from '../../components/base/Button';

export const Menu = () => {
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
                <Link to="/kakeibo" style={{ textDecoration: 'none' }}>
                    <Button label='家計簿' fontSize='25px' width='300px' padding='20px' />
                </Link>
                <Link to="/setting" style={{ textDecoration: 'none' }}>
                    <Button label='設定' fontSize='25px' width='300px' padding='20px' />
                </Link>
            </div>
        </div>
    );
};