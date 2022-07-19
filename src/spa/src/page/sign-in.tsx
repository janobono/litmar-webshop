import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth-state-context-provider';
import errorToAppError from '../util';
import { LWSpinner } from '../component/ui/lw-spinner';
import { LWButton, LWInput } from '../component/ui/lw-form';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const isFormValid = (): boolean => {
        return usernameValid && passwordValid;
    };

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (authState.token) {
            navigate('/');
        }
    }, [authState.token, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (isFormValid()) {
                await authState.signIn({username, password});
            }
        } catch (error: any) {
            const appError = await errorToAppError(error);
            setError(appError.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        isSubmitting ?
            <LWSpinner/>
            :
            <div className="max-w-sm w-full">
                <div className="m-4">
                    <h1>Prihláste sa do svojho účtu</h1>
                    <p className="text-center text-xs my-2">
                        <span>Alebo </span>
                        <NavLink to="/sign-up">sa zaregistrujte</NavLink>
                    </p>
                </div>

                <form className="m-4" onSubmit={(event => {
                    event.preventDefault();
                    handleSubmit();
                })}>
                    <LWInput
                        type="text"
                        name="username"
                        label="Používateľské meno"
                        placeholder="Zadajte svoje používateľské meno"
                        required={true}
                        value={username}
                        setValue={setUsername}
                        valid={usernameValid}
                        setValid={setUsernameValid}
                        validate={() => {
                            if (username.trim().length === 0) {
                                return {valid: false, message: 'Vyžaduje sa používateľské meno'};
                            }
                            return {valid: true};
                        }}
                    />
                    <LWInput
                        type="password"
                        name="password"
                        label="Heslo"
                        placeholder="Zadajte svoje heslo"
                        required={true}
                        value={password}
                        setValue={setPassword}
                        valid={passwordValid}
                        setValid={setPasswordValid}
                        validate={() => {
                            if (password.trim().length === 0) {
                                return {valid: false, message: 'Vyžaduje sa heslo'};
                            }
                            return {valid: true};
                        }}
                    />
                    <div className="flex justify-end">
                        <NavLink
                            className="text-xs mb-4"
                            to="/reset-password"
                        >Zabudnuté heslo?</NavLink>
                    </div>
                    <LWButton
                        type="submit"
                        className="w-full"
                        size="sm"
                        disabled={!isFormValid()}
                    >Prihlásiť
                    </LWButton>
                </form>
                {error && <p className="m-4 text-xs text-red-500">{error}</p>}
            </div>
    );
};

export default SignInPage;


