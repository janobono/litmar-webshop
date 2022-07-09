import React from 'react';
import Footer from './footer';
import Header from './header';
import Nav from './nav';

const ContentLayout: React.FC<any> = ({children}) => (
    <>
        <Header/>
        <Nav/>
        <main className="flex items-center justify-center">
            {children}
        </main>
        <Footer/>
    </>
);

export default ContentLayout;
