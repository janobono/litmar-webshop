import React from 'react';
import Header from './header';
import Footer from './footer';

const SimpleLayout: React.FC<any> = ({children}) => (
    <>
        <Header/>
        <main className="flex items-center justify-center">
            {children}
        </main>
        <Footer/>
    </>
);

export default SimpleLayout;
