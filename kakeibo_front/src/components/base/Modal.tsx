import React from "react";

interface ModalProps {
    showFlag: boolean;
    setShowModal: (flag: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showFlag, children }) => {
    if (!showFlag) return null;

    return (
        <div style={{
            textAlign: 'center',
        }}>
            {showFlag && ( // showFlagがtrueだったらModalを表示する
                <div
                    id="overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}>
                    <div
                        id="modalContent"
                        style={{
                            background: "white",
                            padding: "10px",
                            borderRadius: "3px",
                            width: '500px',
                            height: '500px',
                        }}>
                        {children}
                    </div>
                </div>
            )}
        </div >
    );
};

export default Modal;
