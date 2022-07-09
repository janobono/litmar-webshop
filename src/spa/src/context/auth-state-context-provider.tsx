import React, { createContext, useContext, useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { client } from '../api/client';
import { useGlobalState } from './global-state-context-provider';

const TOKEN = 'TOKEN';

const WCI_ADMIN = 'wci-admin';
const WCI_MANAGER = 'wci-manager';
const WCI_EMPLOYEE = 'wci-employee';
const WCI_CUSTOMER = 'wci-customer';

const paths = {
    confirm: '/auth/confirm',
    resetPassword: '/auth/reset-password',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    changeEmail: '/auth/change-email'
};

interface AuthResponse {
    bearer: string
}

interface JWTPayload {
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    id: string;
    titleBefore: string;
    firstName: string;
    midName: string;
    lastName: string;
    titleAfter: string;
    email: string;
    gdpr: boolean;
    confirmed: boolean;
    enabled: boolean;
    authorities: string[];
}

export interface ConfirmData {
    token: string
}

export interface ChangeEmailData {
    email: string,
    password: string,
    captchaText: string,
    captchaToken: string
}

export interface ResetPasswordData {
    email: string,
    password: string,
    captchaText: string,
    captchaToken: string
}

export interface SignInData {
    username: string,
    password: string
}

export interface SignUpData {
    username: string,
    password: string,
    titleBefore: string | null,
    firstName: string,
    midName: string | null,
    lastName: string,
    titleAfter: string | null,
    email: string,
    captchaText: string,
    captchaToken: string
}

export interface User {
    id: string;
    username: string;
    titleBefore: string;
    firstName: string;
    midName: string;
    lastName: string;
    titleAfter: string;
    email: string;
    confirmed: boolean;
    enabled: boolean;
    authorities: string[];
}

export interface AuthState {
    token: string | undefined,
    user: User | undefined,
    confirm: (confirmData: ConfirmData) => Promise<void>,
    resetPassword: (resetPasswordData: ResetPasswordData) => Promise<void>,
    signIn: (signInData: SignInData) => Promise<void>,
    signUp: (signUpData: SignUpData) => Promise<void>,
    signOut: () => void
}

const authStateContext = createContext<AuthState | undefined>(undefined);

export const getToken = () => localStorage.getItem(TOKEN);

let removeTokenFn = () => {
};

export const removeToken = () => {
    removeTokenFn();
}

const AuthStateContextProvider: React.FC<any> = ({children}) => {
    const globalState = useGlobalState();
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const _token = localStorage.getItem(TOKEN);
        if (_token) {
            const _user = decodeToken(_token);
            if (_user) {
                setUser(_user);
                setToken(_token);
            }
        }
    }, []);

    const confirm = async (confirmData: ConfirmData) => {
        const {data} = await client.post<AuthResponse>(paths.confirm, confirmData);
        handleBearer(data.bearer);
    }

    const resetPassword = async (resetPasswordData: ResetPasswordData) => {
        await client.post<AuthResponse>(paths.resetPassword, resetPassword);
    }

    const signIn = async (signInData: SignInData) => {
        const {data} = await client.post<AuthResponse>(paths.signIn, signInData);
        handleBearer(data.bearer);
    }

    const signUp = async (signUpData: SignUpData) => {
        const {data} = await client.post<AuthResponse>(paths.signUp, signUpData);
        handleBearer(data.bearer);
    }

    const signOut = () => {
        localStorage.removeItem(TOKEN);
        setToken(undefined);
        setUser(undefined);
    }

    removeTokenFn = signOut;

    const decodeToken = (token: string) => {
        const payload = decode<JWTPayload>(token);
        if (Date.now() > payload.exp * 1000) {
            return null;
        }

        return {
            id: payload.id,
            username: payload.sub,
            titleBefore: payload.titleBefore,
            firstName: payload.firstName,
            midName: payload.midName,
            lastName: payload.lastName,
            titleAfter: payload.titleAfter,
            email: payload.email,
            confirmed: payload.confirmed,
            enabled: payload.enabled,
            authorities: payload.authorities
        };
    }

    const handleBearer = (bearer: string) => {
        const decodedUser = decodeToken(bearer);
        if (decodedUser) {
            if (globalState.cookiesEnabled) {
                localStorage.setItem(TOKEN, bearer);
            }
            setToken(bearer);
            setUser(decodedUser);
        } else {
            signOut();
        }
    }

    return (
        <authStateContext.Provider value={
            {
                token,
                user,
                confirm,
                resetPassword,
                signIn,
                signUp,
                signOut
            }
        }
        >{children}
        </authStateContext.Provider>
    );
};

export default AuthStateContextProvider;

export const useAuthState = () => {
    const authState = useContext(authStateContext);

    if (!authState) {
        throw Error('"useAuthState" must be used within "AuthStateContextProvider"');
    }

    return authState;
};

const hasAnyAuthority = (user: User, ...authorities: string[]) => {
    return user.authorities.some(a => authorities.includes(a));
};

export const hasAdminAuthority = (user: User | undefined) => {
    if (user) {
        return hasAnyAuthority(user, WCI_ADMIN);
    }
    return false;
};

export const hasManagerAuthority = (user: User | undefined) => {
    if (user) {
        return hasAnyAuthority(user, WCI_ADMIN, WCI_MANAGER);
    }
    return false;
};

export const hasEmployeeAuthority = (user: User | undefined) => {
    if (user) {
        return hasAnyAuthority(user, WCI_ADMIN, WCI_MANAGER, WCI_EMPLOYEE);
    }
    return false;
};

export const hasCustomerAuthority = (user: User | undefined) => {
    if (user) {
        return hasAnyAuthority(user, WCI_ADMIN, WCI_MANAGER, WCI_EMPLOYEE, WCI_CUSTOMER);
    }
    return false;
};
