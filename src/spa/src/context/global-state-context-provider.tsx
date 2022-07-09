import React, { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../api/client';

const COOKIES_ENABLED_ITEM = 'COOKIES_ENABLED';

const paths = {
    companyInfo: 'company-info',
};

export interface CompanyInfo {
    logo: string,
    title: string,
    firm: string,
    street: string,
    city: string,
    state: string,
    phone: string,
    mail: string,
    companyInfo: string,
    businessId: string,
    taxId: string,
    vatRegNo: string,
    map: string,
    openingInfo: {
        day: string,
        from: string,
        to: string
    }[],
    welcomeText: string,
    welcomeInfo: {
        image: string,
        text: string
    }[]
}

export interface GlobalState {
    companyInfo: CompanyInfo | undefined,
    cookiesEnabled: boolean,
    setCookiesEnabled: (cookiesEnabled: boolean) => void
}

const globalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateContextProvider: React.FC<any> = ({children}) => {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
    const [cookiesEnabled, setCookiesEnabled] = useState(localStorage.getItem(COOKIES_ENABLED_ITEM) === 'true');

    useEffect(() => {
        client.get<CompanyInfo>(paths.companyInfo)
            .then(response => {
                setCompanyInfo(response.data)
            });
    }, []);

    const setCookiesEnabledToLocalStorage = (cookiesEnabled: boolean) => {
        if (cookiesEnabled) {
            localStorage.setItem(COOKIES_ENABLED_ITEM, cookiesEnabled.toString());
        } else {
            localStorage.clear();
        }
        setCookiesEnabled(cookiesEnabled);
    }

    return (
        <globalStateContext.Provider
            value={
                {
                    companyInfo,
                    cookiesEnabled,
                    setCookiesEnabled: setCookiesEnabledToLocalStorage
                }
            }
        >{children}
        </globalStateContext.Provider>
    );
}

export default GlobalStateContextProvider;

export const useGlobalState = () => {
    const globalState = useContext(globalStateContext);

    if (!globalState) {
        throw Error('"useGlobalState" must be used within "GlobalStateContextProvider"');
    }

    return globalState;
}
