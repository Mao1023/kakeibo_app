import React, { useEffect, useState } from 'react';
import { Title } from '../../components/base/Title';
import { LogoutButton } from '../../components/arange/LogoutButton';
import { BackButton } from '../../components/arange/BackButton';
import { ShisyutsuModal } from '../../modals/ShisyutsuModal';
// 💡 作成した KakeiboSummary をインポート
import { KakeiboSummary } from '../../components/kakeibo/KakeiboSummary';
import { KakeiboMatrixTable } from '../../components/kakeibo/KakeiboMatrixTable';

export const Kakeibo = () => {
    const [showModal, setShowModal] = useState(false);

    // 💡 画面で管理する各ステート（初期値は仕様書・デザインに準拠）
    const [monthLabel] = useState('2026年5月分'); // 表示月
    const [carryOver] = useState(2000);           // 4月分繰越
    const [initialAmount, setInitialAmount] = useState(200000); // 5月分開始額
    const [livingExpenseResidual, setLivingExpenseResidual] = useState(0); // 生活費残高

    // 固定費のモックデータ
    const [fixedCosts, setFixedCosts] = useState([
        { name: '家賃', amount: 70000 },
        { name: '電気代', amount: 4000 },
        { name: 'ガス代', amount: 2000 },
        { name: '水道代', amount: 4000 },
        { name: '携帯代', amount: 0 },
        { name: '貯金', amount: 0 },
    ]);

    useEffect(() => {
        const saveFixedCosts = async () => {
            try {
                // ここにAPI通信の処理、またはlocalStorageへの保存処理を記述
                // await api.saveFixedCosts(fixedCosts);
                console.log('固定費を自動保存しました:', fixedCosts);
            } catch (error) {
                console.error('保存に失敗しました:', error);
            }
        };

        saveFixedCosts();
    }, [fixedCosts]);

    const ShowModal = () => {
        setShowModal(true);
    };

    // 💡 自動計算ボタンのロジック
    // 繰越金 + 今月分開始額 - 固定費合計 を計算して生活費残高にセットする
    const handleAutoCalculate = () => {
        const totalFixedCost = fixedCosts.reduce((sum, item) => sum + item.amount, 0);
        const calculatedResidual = (carryOver + initialAmount) - totalFixedCost;
        setLivingExpenseResidual(calculatedResidual);
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '200vh',
            boxSizing: 'border-box',
        }}>
            {/* 上部ヘッダーエリア */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <Title label='家計簿' />
                <LogoutButton />
            </div>

            {/* 💡 メインコンテンツエリア：左右2カラムのFlexボックスレイアウト */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '40px', // 左カラムと右カラムの間の余白
                width: '100%',
                minWidth: 0,
                margin: '30px',
                paddingBottom: '8px'
            }}>
                {/* 左カラム：サマリーエリア */}
                <KakeiboSummary
                    monthLabel={monthLabel}
                    carryOver={carryOver}
                    initialAmount={initialAmount}
                    setInitialAmount={setInitialAmount}
                    fixedCosts={fixedCosts}
                    setFixedCosts={setFixedCosts}
                    livingExpenseResidual={livingExpenseResidual}
                    setLivingExpenseResidual={setLivingExpenseResidual}
                    onAutoCalculate={handleAutoCalculate}
                    onOpenModal={ShowModal}
                />

                {/* 右カラム：マトリクス表の配置予定地（次回以降作成） */}
                <div style={{
                    flex: 1,
                    minHeight: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <KakeiboMatrixTable />
                </div>
            </div>

            {/* フッターパーツ */}
            <BackButton url='/menu' />

            {/* 支出入力モーダル */}
            <ShisyutsuModal showFlag={showModal} setShowModal={setShowModal} />
        </div>
    );
};