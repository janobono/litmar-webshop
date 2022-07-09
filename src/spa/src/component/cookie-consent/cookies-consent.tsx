import React from 'react';
import { useGlobalState } from '../../context/global-state-context-provider';
import { NavLink } from 'react-router-dom';

const CookiesConsent: React.FC = () => {
    const globalState = useGlobalState();

    if (globalState.cookiesEnabled) {
        return null;
    }

    return (
        <div className="bg-yellow-400 p-1">
            <div
                className="flex flex-col md:flex-row w-full justify-center items-center text-xs">
                <p className="px-1">
                    <span>Používame cookies, aby sme optimalizovali funkčnosť stránky. </span>
                    <NavLink
                        className="text-gray-500 hover:text-gray-800 font-semibold"
                        to="/cookies-info"
                    >Dozvedieť sa viac.
                    </NavLink>
                </p>
                <button
                    className="group relative flex justify-center py-1 px-2 border border-transparent rounded-full
                    text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100"
                    onClick={() => globalState.setCookiesEnabled(true)}
                >
                    Povoliť cookies
                </button>
            </div>
        </div>
    );
}

export default CookiesConsent;
