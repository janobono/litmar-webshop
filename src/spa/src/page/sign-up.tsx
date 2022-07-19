import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth-state-context-provider';
import errorToAppError from '../util';
import { useCaptchaQuery } from '../api/captcha';
import { LWSpinner } from '../component/ui/lw-spinner';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);

    const [password01, setPassword01] = useState('');
    const [password01Valid, setPassword01Valid] = useState(false);

    const [password02, setPassword02] = useState('');
    const [password02Valid, setPassword02Valid] = useState(false);

    const [titleBefore, setTitleBefore] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(false);

    const [midName, setMidName] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(false);

    const [titleAfter, setTitleAfter] = useState('');

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaTextValid, setCaptchaTextValid] = useState(false);

    const captchaQuery = useCaptchaQuery();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const [submitted, setSubmitted] = useState(false);

    const isFormValid = (): boolean => {
        return usernameValid
            && password01Valid && password02Valid
            && firstNameValid
            && lastNameValid
            && emailValid
            && captchaTextValid;
    }

    useEffect(() => {
        if (authState.token) {
            navigate('/');
        }
    }, [authState.token, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            const captchaToken = captchaQuery.data?.captchaToken;
            if (isFormValid() && captchaToken) {
                await authState.signUp({
                    username,
                    password: password01,
                    titleBefore,
                    firstName,
                    midName,
                    lastName,
                    titleAfter,
                    email,
                    captchaText,
                    captchaToken
                });
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
                    <h1>Zaregistrujte si svoj účet</h1>
                    <p className="text-center text-xs my-2">
                        <span>Alebo </span>
                        <NavLink to="/sign-in">sa prihláste</NavLink>
                    </p>
                </div>
            </div>
    );
}

export default SignUpPage;
