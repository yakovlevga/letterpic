import React from 'react';
import './header.css';
export interface HeaderProps {
    user?: {};
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}
export declare const Header: React.FC<HeaderProps>;
