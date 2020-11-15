import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';


//Provider Global, engloba todos os outros providers

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
);

export default AppProvider;