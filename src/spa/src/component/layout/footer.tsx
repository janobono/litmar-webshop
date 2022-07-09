import React from 'react';
import CookiesConsent from '../cookie-consent';
import { Home, Mail, Phone } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useGlobalState } from '../../context/global-state-context-provider';
import { Spinner } from '../ui/spinner';

const Footer: React.FC = () => {
    const globalState = useGlobalState();

    return (
        <footer className="bg-blue-100">
            <CookiesConsent/>
            <div className="text-left text-xs py-5">
                <div className="grid grid-1 grid-cols-1 md:grid-cols-2 px-5 md:px-32">
                    <div className="">
                        <h6 className="uppercase font-semibold mb-4 flex justify-start">
                            Odkazy
                        </h6>
                        <div className="mb-4">
                            <NavLink
                                className="text-gray-500 hover:text-gray-800"
                                to="/cookies-info"
                            >Cookies informácia
                            </NavLink>
                        </div>
                        <div className="mb-4">
                            <NavLink
                                className="text-gray-500 hover:text-gray-800"
                                to="/gdpr-info"
                            >GDPR informácia
                            </NavLink>
                        </div>
                    </div>
                    {globalState.companyInfo ?
                        <div>
                            <h6 className="uppercase font-semibold mb-4 flex justify-start">
                                Kontakt
                            </h6>
                            <div className="flex items-center justify-start mb-4">
                                <Home size="16" className="mx-1"/>
                                {globalState.companyInfo.street + ', ' + globalState.companyInfo.city + ', ' + globalState.companyInfo.state}
                            </div>
                            <div className="flex items-center justify-start mb-4">
                                <Mail size="16" className="mx-1"/>
                                {globalState.companyInfo.mail}
                            </div>
                            <div className="flex items-center justify-start mb-4">
                                <Phone size="16" className="mx-1"/>
                                {globalState.companyInfo.phone}
                            </div>
                        </div>
                        :
                        <div className="flex flex-1 justify-center items-center">
                            <Spinner/>
                        </div>
                    }
                </div>
            </div>
            <div className="text-center p-5 bg-blue-200 text-xs">
                <span>© 2022 Copyright: </span>
                <a className="text-gray-500 hover:text-gray-800 font-semibold"
                   href="https://www.janobono.com">janobono</a>
            </div>
        </footer>
    );
}

export default Footer;
