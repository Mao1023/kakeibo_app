import React from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';

export const SettingItems = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title label='項目設定' />
            <LogoutButton />
            <BackButton url='/setting' />
        </div>
    );
};