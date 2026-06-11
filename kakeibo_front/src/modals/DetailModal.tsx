import React from 'react';
import Modal from '../components/base/Modal';
import { Title } from '../components/base/Title';
import { Button } from '../components/base/Button';

interface ExpenseLog {
    day: number;
    category: string;
    amount: number;
    name?: string;
}

interface DetailModalProps {
    showFlag: boolean;
    setShowModal: (flag: boolean) => void;
    title: string;
    details: ExpenseLog[];
}

export const DetailModal: React.FC<DetailModalProps> = ({ showFlag, setShowModal, title, details }) => {
    return (
        <Modal showFlag={showFlag} setShowModal={setShowModal}>
            <Title label={title} fontSize='24px' />

            <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={thTdStyle}>支出名</th>
                            <th style={{ ...thTdStyle, textAlign: 'right' }}>金額</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={thTdStyle}>{item.name || '（名称未設定）'}</td>
                                <td style={{ ...thTdStyle, textAlign: 'right' }}>{item.amount.toLocaleString()} 円</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <Button label='閉じる' height='40px' width='100px' onClick={() => setShowModal(false)} />
                </div>
            </div>
        </Modal>
    );
};

const thTdStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '14px'
};