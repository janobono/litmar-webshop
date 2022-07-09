import React from 'react';
import GlobalStateContextProvider from './global-state-context-provider';
import AuthStateContextProvider from './auth-state-context-provider';

const AppContext: React.FC<any> = ({children}) => {
    return (
        <GlobalStateContextProvider>
            <AuthStateContextProvider>
                {children}
            </AuthStateContextProvider>
        </GlobalStateContextProvider>
    );
}

export default AppContext;
