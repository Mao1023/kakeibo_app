import React, { useState } from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { Button } from '../../components/base/Button';
import { ShisyutsuModal } from '../../modals/ShisyutsuModal';

export const Kakeibo = () => {
    const [showModal, setShowModal] = useState(false);

    const ShowModal = () => {
        setShowModal(true);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Title label='家計簿' />
            <LogoutButton />
            <Button label='支出入力' onClick={ShowModal}></Button>
            <ShisyutsuModal showFlag={showModal} setShowModal={setShowModal} />
            <BackButton url='/menu' />
        </div>
    );
};