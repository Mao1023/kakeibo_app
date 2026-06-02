import React from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';

export const Kakeibo = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title label='家計簿' />
            <LogoutButton />
            <BackButton url='/menu' />
        </div>
    );
};