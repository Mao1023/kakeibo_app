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
        <div style={{ position: 'absolute', left: '50px', bottom: '20px', alignItems: 'center' }}>
            <Link to={url} style={{ textDecoration: 'none' }}>
                <Button
                    label='戻る'
                    fontSize='20px'
                    width='110px'
                    height='50px'
                    padding='10px'
                />
            </Link>
        </div>

    );
};