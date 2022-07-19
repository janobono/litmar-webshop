import React from 'react';
import CookiesConsent from '../cookie-consent';
import { Home, Mail, Phone } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useGlobalState } from '../../context/global-state-context-provider';
import { LWSpinner } from '../ui/lw-spinner';

const Footer: React.FC = () => {
    const globalState = useGlobalState();

    return (
        <footer className="bg-blue-100">
            <CookiesConsent/>
            <div className="py-5 text-xs">
                <div className="grid grid-1 grid-cols-1 md:grid-cols-2 px-5 md:px-32">
                    <div className="">
                        <h4 className="flex justify-start text-xs mb-4">
                            Odkazy
                        </h4>
                        <div className="mb-2">
                            <NavLink to="/cookies-info">Cookies informácia</NavLink>
                        </div>
                        <div className="mb-2">
                            <NavLink to="/gdpr-info">GDPR informácia</NavLink>
                        </div>
                    </div>
                    {globalState.companyInfo ?
                        <div>
                            <h4 className="flex justify-start text-xs mb-4">
                                Kontakt
                            </h4>
                            <div className="flex items-center justify-start mb-2">
                                <Home size="16" className="mx-1"/>
                                {globalState.companyInfo.street + ', ' + globalState.companyInfo.city + ', ' + globalState.companyInfo.state}
                            </div>
                            <div className="flex items-center justify-start mb-2">
                                <Mail size="16" className="mx-1"/>
                                {globalState.companyInfo.mail}
                            </div>
                            <div className="flex items-center justify-start mb-2">
                                <Phone size="16" className="mx-1"/>
                                {globalState.companyInfo.phone}
                            </div>
                        </div>
                        :
                        <div className="flex flex-1 justify-center items-center">
                            <LWSpinner/>
                        </div>
                    }
                </div>
            </div>
            <p className="text-center p-4 bg-blue-200 text-xs">
                <span>© 2022 Copyright: </span>
                <a href="https://www.janobono.com">janobono</a>
            </p>
        </footer>
    );
}

export default Footer;
