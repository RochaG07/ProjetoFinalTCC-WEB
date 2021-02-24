import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';

import theme from '../styles/materialUI/theme';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

//Provider Global, engloba todos os outros providers

const AppProvider: React.FC = ({ children }) => (
        <AuthProvider>
            <ToastProvider>
                <MuiThemeProvider theme={theme}>
                    {children}
                </MuiThemeProvider>
            </ToastProvider>
        </AuthProvider>
);

export default AppProvider;