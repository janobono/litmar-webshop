import React from 'react';
import Footer from './footer';
import Header from './header';
import Nav from './nav';

const Layout: React.FC<any> = ({children}) => (
    <>
        <Header/>
        <Nav/>
        <main className="flex items-center justify-center min-h-[480px]">
            {children}
        </main>
        <Footer/>
    </>
);

export default Layout;
