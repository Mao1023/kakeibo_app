import React, { useState } from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { DataTable } from '../../components/base/DataTable';
import { ToggleButton } from '../../components/base/ToggleButton';
import { Button } from '../../components/base/Button';

interface AccountAdmin {
    id: number;
    name: string;
    admin: boolean;
    isCurrentUser?: boolean;
}

export const SettingAdmin = () => {
    // モックデータを画面内で定義（APIとDB整ったら修正）
    const [adminsMockData, setAdminsMockData] = useState<AccountAdmin[]>([
        { id: 1, name: 'aaaaa', admin: true },
        { id: 2, name: 'bbb', admin: false },
        { id: 3, name: 'ccccc', admin: false },
        { id: 4, name: 'ddd', admin: false },
        { id: 5, name: 'eeee', admin: false },
        { id: 6, name: 'fffff', admin: false },
        { id: 7, name: 'gggg', admin: false },
        { id: 8, name: 'hhhh', admin: false },
        { id: 9, name: 'maomao', admin: true, isCurrentUser: true }
    ]);

    const [inputName, setInputName] = useState(() => {
        return localStorage.getItem('name') || '';
    });
    const [inputAdmin, setInputAdmin] = useState<boolean>(false);

    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null); // 💡 現在編集している項目のID

    const handleEdit = (admin: AccountAdmin) => {
        setIsEdit(true);
        setEditingId(admin.id);
        setInputName(admin.name);
        setInputAdmin(admin.admin);
    };

    const handleUpdate = () => {
        const updatedList = adminsMockData.map(admin => {
            if (admin.id === editingId) {
                return {
                    ...admin,
                    admin: inputAdmin,
                };
            }
            return admin;
        });

        setAdminsMockData(updatedList);
        resetForm();
    };

    const handleDelete = (admin: AccountAdmin) => {
        if (window.confirm(`${admin.name}を削除しますか？`)) {
            setAdminsMockData(adminsMockData.filter(i => i.id !== admin.id));

            if (editingId === admin.id) resetForm();
        }
    };

    const resetForm = () => {
        setIsEdit(false);
        setEditingId(null);
        setInputName('');
        setInputAdmin(false);
    };

    const columns = [
        { header: '番号', width: '60px', render: (_: any, idx: number) => idx + 1 },
        { header: 'ユーザー名', width: '150px', render: (admin: AccountAdmin) => admin.name },
        { header: '管理者権限', width: '100px', render: (admin: AccountAdmin) => admin.admin ? '有' : '無' },
        {
            header: '',
            width: '100px',
            render: (admin: AccountAdmin) => {
                const isSelf = admin.isCurrentUser === true;

                return (
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        {/* 編集ボタン */}
                        <button
                            onClick={() => handleEdit(admin)}
                            disabled={isSelf}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: isSelf ? 'not-allowed' : 'pointer',
                                padding: 0,
                                opacity: isSelf ? 0.3 : 1
                            }}
                        >
                            <i className="fas fa-cog" style={{ fontSize: '18px', color: '#000' }} />
                        </button>

                        {/* 削除ボタン */}
                        <button
                            onClick={() => handleDelete(admin)}
                            disabled={isSelf}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: isSelf ? 'not-allowed' : 'pointer',
                                padding: 0,
                                opacity: isSelf ? 0.3 : 1
                            }}
                        >
                            <i className="fas fa-times" style={{ fontSize: '18px', color: '#000' }} />
                        </button>
                    </div>
                );
            }
        }
    ];


    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            boxSizing: 'border-box',
            padding: '20px 40px'
        }}>
            <Title label='管理者設定' />
            <LogoutButton />

            {/* 左右2カラム配置（デザイン画像への完全最適化） */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '40px',
                marginTop: '40px',
                width: '100%'
            }}>
                {/* 左側：テーブルエリア */}
                <div style={{ flex: 1, maxWidth: '600px' }}>
                    <DataTable columns={columns} data={adminsMockData} maxHeight="500px" />
                </div>

                {/* 右側：入力・編集フォームエリア */}
                <div style={{
                    width: '350px',
                    minHeight: '320px',
                    border: '1px solid #000',
                    padding: '30px 20px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    textAlign: 'left'
                }}>
                    {!isEdit ? (
                        <div style={{ color: '#000', textAlign: 'center', marginTop: '100px' }}>
                            一覧から編集するユーザーを選択してください。
                        </div>
                    ) : (
                        <>
                            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'normal', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                                管理者編集
                            </h3>
                            <div style={{ marginBottom: '40px' }}>
                                <label style={{ display: 'block', fontSize: '20px', color: '#000', marginBottom: '0px' }}>ユーザー名</label>
                                <span style={{ display: 'block', fontSize: '24px' }}>{inputName}</span>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <ToggleButton
                                    label="管理者権限"
                                    fontSize="20px"
                                    checked={inputAdmin}
                                    onChange={(checked) => setInputAdmin(checked)}
                                    width='200px'
                                    baseWidth='40px'
                                    handleWidth='20px'
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center' }}>
                                <Button
                                    label='編集取消'
                                    fontSize='16px'
                                    width='100px'
                                    height='50px'
                                    padding='5px'
                                    onClick={resetForm}
                                />
                                <Button
                                    label='更新'
                                    fontSize='16px'
                                    width='100px'
                                    height='50px'
                                    padding='5px'
                                    onClick={handleUpdate}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div style={{ paddingBottom: '100px' }}>
                <BackButton url='/setting' />
            </div>
        </div >
    );
};