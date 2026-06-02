import React from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { Link } from 'react-router-dom';
import { Button } from '../../components/base/Button';

export const Setting = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title label='設定' />
            <LogoutButton />
            <BackButton url='/menu' />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px', alignItems: 'center' }}>
                <Link to="/setting/items" style={{ textDecoration: 'none' }}>
                    <Button label='項目設定' fontSize='25px' width='300px' padding='20px' />
                </Link>
                <Link to="/setting/others" style={{ textDecoration: 'none' }}>
                    <Button label='その他設定' fontSize='25px' width='300px' padding='20px' />
                </Link>
                <Link to="/setting/admin" style={{ textDecoration: 'none' }}>
                    <Button label='管理者' fontSize='25px' width='300px' padding='20px' />
                </Link>
            </div>
        </div>
    );
};