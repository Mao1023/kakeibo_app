import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "../base/Button";

interface BackButtonProps {
    url: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
    url
}) => {

    return (
        <div style={{ position: 'fixed', left: '50px', bottom: '50px' }}>
            <Link to={url} style={{ textDecoration: 'none' }}>
                <Button label='戻る' />
            </Link>
        </div>

    );
};