import React from 'react';
import './page.css';
export interface PageProps {
    user?: {};
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}
export declare const Page: React.FC<PageProps>;
