import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthState } from './context/auth-state-context-provider';
import { useGlobalState } from './context/global-state-context-provider';
import SignInPage from './page/sign-in';
import NotFoundPage from './page/404';
import IndexPage from './page';
import SignUpPage from './page/sign-up';
import CookiesInfoPage from './page/cookies-info';
import GdprInfoPage from './page/gdpr-info';
import ResetPasswordPage from './page/reset-password';
import ConfirmPage from './page/confirm';
import { Layout } from './component/layout';

const App: React.FC = () => {
    const globalState = useGlobalState();
    const authState = useAuthState();

    useEffect(() => {
        if (globalState.companyInfo) {
            document.title = globalState.companyInfo.title;
        }
    }, []);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/confirm/:token" element={<ConfirmPage/>}/>
                    <Route path="/cookies-info" element={<CookiesInfoPage/>}/>
                    <Route path="/gdpr-info" element={<GdprInfoPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
