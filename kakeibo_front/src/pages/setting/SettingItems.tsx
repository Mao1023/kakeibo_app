import React, { useEffect, useState } from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { DataTable } from '../../components/base/DataTable';
import { Button } from '../../components/base/Button';
import { isValidLength, isValidNumber } from '../../utils/Validation';
import { SegmentedControl } from '../../components/base/SegmentControl';
import axios from 'axios';

interface AccountItem {
    id: number;
    name: string;
    category: 1 | 2;
    amount?: number;
}

export const SettingItems = () => {
    // モックデータを画面内で定義（APIとDB整ったら修正）
    const [itemsMockData, setItemsMockData] = useState<AccountItem[]>([]);

    // 右側の入力フォーム用ステート
    const [inputName, setInputName] = useState(() => {
        return localStorage.getItem('name') || '';
    });
    const [inputKotei, setInputKotei] = useState(() => {
        return localStorage.getItem('Kotei') || '0';
    });
    const [inputCategory, setInputCategory] = useState<1 | 2>(1);
    const [itemError, setItemError] = useState('');
    const [koteiError, setKoteiError] = useState('');

    // 編集ボタンクリック
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null); // 現在編集している項目のID

    const getUserId = (): number | null => {
        const id = localStorage.getItem('userId');
        return id ? Number(id) : null;
    };

    const fetchItems = async () => {
        const userId = getUserId();
        if (!userId) {
            alert('ログイン情報が見つかりません。再ログインしてください。');
            return;
        }

        try {
            // @RequestParam(userId) で受け取るJava側のインターフェースに合わせる
            const response = await axios.get(`http://localhost:8081/api/setting/items?userId=${userId}`);

            // Java側エンティティ（Item）のフィールド名をフロントの型（AccountItem）へマッピング
            const mappedData: AccountItem[] = response.data.map((item: any) => ({
                id: item.itemId,
                name: item.itemName,
                category: item.itemType,
                amount: item.itemKoteiAmount ?? undefined
            }));
            setItemsMockData(mappedData);
        } catch (error) {
            console.error('データ取得失敗:', error);
            alert('データの取得に失敗しました。');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // ボタン用関数を定義
    const handleEdit = (item: AccountItem) => {
        setIsEdit(true);
        setEditingId(item.id);
        setInputName(item.name);
        setInputKotei(item.amount !== undefined ? String(item.amount) : '0');
        setInputCategory(item.category);
    };

    const handleUpdate = async () => {
        setItemError('');
        setKoteiError('');

        let hasError = false;

        if (!inputName.trim()) { setItemError('項目名を入力してください'); hasError = true; }
        else if (!isValidLength(inputName, 1, 50)) { setItemError('50桁以内で入力してください。'); hasError = true; }

        if (inputCategory === 2) {
            if (!inputKotei.trim()) { setKoteiError('固定費を入力してください'); hasError = true; }
            else if (!isValidNumber(String(inputKotei))) { setKoteiError('半角数字で入力してください。'); hasError = true; }
        }

        if (hasError) return;
        if (editingId === null) return;

        const userId = getUserId();

        try {
            // DTO(AccountItemRequest)のフィールド構成に合わせてJSONボディを作成
            await axios.put(`http://localhost:8081/api/setting/items/${editingId}`, {
                name: inputName,
                category: inputCategory,
                amount: inputCategory === 2 ? Number(inputKotei) : null,
                userId: userId // さきほどDTOに追加したフィールド
            });

            await fetchItems(); // 再取得して画面リフレッシュ
            resetForm();
        } catch (error) {
            console.error('更新失敗:', error);
            alert('データの更新に失敗しました。');
        }
    };

    const handleDelete = async (item: AccountItem) => {
        if (window.confirm(`${item.name}を削除しますか？`)) {
            try {
                await axios.delete(`http://localhost:8081/api/setting/items/${item.id}`);
                await fetchItems(); // 再取得して画面リフレッシュ
                if (editingId === item.id) resetForm();
            } catch (error) {
                console.error('削除失敗:', error);
                alert('データの削除に失敗しました。');
            }
        }
    };

    const handleRegister = async () => {
        setItemError('');
        setKoteiError('');

        let hasError = false;

        if (!inputName.trim()) { setItemError('項目名を入力してください'); hasError = true; }
        else if (!isValidLength(inputName, 1, 50)) { setItemError('50桁以内で入力してください。'); hasError = true; }

        if (inputCategory === 2) {
            if (!inputKotei.trim()) { setKoteiError('固定費を入力してください'); hasError = true; }
            else if (!isValidNumber(String(inputKotei))) { setKoteiError('半角数字で入力してください。'); hasError = true; }
        }
        if (hasError) return;

        const userId = getUserId();
        if (!userId) {
            alert('ログイン情報が見つかりません。再ログインしてください。');
            return;
        }

        try {
            // Java側が @RequestParam で userId を求めているため URL パラメータに付与
            await axios.post(`http://localhost:8081/api/setting/items?userId=${userId}`, {
                name: inputName,
                category: inputCategory,
                amount: inputCategory === 2 ? Number(inputKotei) : null,
                userId: userId
            });

            await fetchItems(); // 再取得して画面リフレッシュ
            resetForm();
        } catch (error) {
            console.error('登録失敗:', error);
            alert('データの登録に失敗しました。');
        }
    };

    const resetForm = () => {
        setIsEdit(false);
        setEditingId(null);
        setInputName('');
        setInputCategory(1);
        setInputKotei('0');
        setItemError('');
        setKoteiError('');
    };

    const columns = [
        { header: '番号', width: '60px', render: (_: any, idx: number) => idx + 1 },
        { header: '項目名', width: '150px', render: (item: AccountItem) => item.name },
        { header: '分類', width: '100px', render: (item: AccountItem) => item.category === 1 ? '支出' : '固定費' },
        { header: '固定費金額', width: '120px', render: (item: AccountItem) => item.amount !== undefined ? item.amount.toLocaleString() : 'ー' },
        {
            header: '',
            width: '100px',
            render: (item: AccountItem) => (
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className="fas fa-cog" style={{ fontSize: '18px', color: '#000' }} />
                    </button>
                    <button onClick={() => handleDelete(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className="fas fa-times" style={{ fontSize: '18px', color: '#000' }} />
                    </button>
                </div>
            )
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
            <Title label='項目設定' />
            <LogoutButton />

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
                    <DataTable columns={columns} data={itemsMockData} maxHeight="500px" />
                </div>

                {/* 右側：入力・編集フォームエリア */}
                <div style={{
                    width: '350px',
                    border: '1px solid #000',
                    padding: '30px 20px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    textAlign: 'left'
                }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'normal', borderBottom: '1px dashed #ccc', paddingBottom: '10px', fontWidth: 'bold' }}>
                        {isEdit ? '項目編集' : '新規登録'}
                    </h3>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>項目名</label>
                        <input
                            type="text"
                            placeholder='項目名を入力してください'
                            value={inputName}
                            onChange={(e) => {
                                setInputName(e.target.value);
                                if (e.target.value.trim()) setItemError('');
                            }}
                            style={{ width: '100%', height: '40px', fontSize: '16px', padding: '5px', boxSizing: 'border-box', border: '1px solid #000' }}
                        />

                        {itemError && (
                            <span style={{ color: 'red', fontSize: '14px', display: 'block', marginTop: '5px' }}>
                                {itemError}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <label style={{ display: 'block', fontSize: '18px', marginBottom: '12px' }}>分類</label>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <SegmentedControl
                                label1='支出'
                                label2='固定費'
                                value={inputCategory}
                                onChange={(val) => setInputCategory(val)}
                            />
                        </div>
                    </div>

                    {inputCategory === 2 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>固定費</label>
                            <input
                                type="text"
                                placeholder='固定費を入力してください'
                                value={inputKotei}
                                onChange={(e) => {
                                    setInputKotei(e.target.value);
                                    if (e.target.value.trim()) setKoteiError('');
                                }}
                                style={{ width: '100%', height: '40px', fontSize: '16px', padding: '5px', boxSizing: 'border-box', border: '1px solid #000', textAlign: inputKotei === '' ? 'left' : 'right', }}
                            />

                            {koteiError && (
                                <span style={{ color: 'red', fontSize: '14px', display: 'block', marginTop: '5px' }}>
                                    {koteiError}
                                </span>
                            )}
                        </div>

                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', }}>
                        {isEdit && (
                            <Button
                                label='編集取消'
                                fontSize='16px'
                                width='100px'
                                height='50px'
                                padding='5px'
                                onClick={resetForm} />
                        )}
                        <Button
                            label={isEdit ? '更新' : '登録'}
                            fontSize='16px'
                            width='100px'
                            height='50px'
                            padding='5px'
                            onClick={isEdit ? handleUpdate : handleRegister} />
                    </div>
                </div>
            </div>

            <div style={{ paddingBottom: '100px' }}>
                <BackButton url='/setting' />
            </div>
        </div>
    );
};