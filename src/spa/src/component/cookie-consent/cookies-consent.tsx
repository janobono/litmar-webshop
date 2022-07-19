import React from 'react';
import { useGlobalState } from '../../context/global-state-context-provider';
import { NavLink } from 'react-router-dom';
import { LWButton } from '../ui/lw-form';

const CookiesConsent: React.FC = () => {
    const globalState = useGlobalState();

    if (globalState.cookiesEnabled) {
        return null;
    }

    return (
        <div className="bg-yellow-400 p-1">
            <div
                className="flex flex-col md:flex-row w-full justify-center items-center">
                <p className="text-xs px-1">
                    <span>Používame cookies, aby sme optimalizovali funkčnosť stránky. </span>
                    <NavLink to="/cookies-info">Dozvedieť sa viac.</NavLink>
                </p>
                <LWButton
                    size="xs"
                    pill={true}
                    variant="light"
                    onClick={() => globalState.setCookiesEnabled(true)}
                >
                    Povoliť cookies
                </LWButton>
            </div>
        </div>
    );
}

export default CookiesConsent;
