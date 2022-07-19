import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth-state-context-provider';
import { useCaptchaQuery } from '../api/captcha';
import { EMAIL_REGEX, LWButton, LWInput } from '../component/ui/lw-form';
import { LWSpinner } from '../component/ui/lw-spinner';
import { RefreshCw } from 'react-feather';
import errorToAppError from '../util';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();

    const [email, setEMail] = useState('');
    const [emailValid, setEMailValid] = useState(false);

    const [captchaText, setCaptchaText] = useState('');
    const [captchaTextValid, setCaptchaTextValid] = useState(false);

    const captchaQuery = useCaptchaQuery();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const [submitted, setSubmitted] = useState(false);

    const isFormValid = (): boolean => {
        return emailValid && captchaTextValid;
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            const captchaToken = captchaQuery.data?.captchaToken;
            if (isFormValid() && captchaToken) {
                await authState.resetPassword({email, captchaText, captchaToken});
                setSubmitted(true);
            }
        } catch (error: any) {
            const appError = await errorToAppError(error);
            setError(appError.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        isSubmitting || submitted ?
            <p className="m-4">Na Váš používateľský email sme odoslali aktiváciu hesla.</p>
            :
            <div className="max-w-sm w-full">
                <div className="m-4">
                    <h1>Zabudnuté heslo</h1>
                </div>
                <form className="m-4" onSubmit={(event => {
                    event.preventDefault();
                    handleSubmit();
                })}>
                    <LWInput
                        type="email"
                        name="email"
                        label="Používateľský email"
                        placeholder="Zadajte používateľský email"
                        required={true}
                        value={email}
                        setValue={setEMail}
                        valid={emailValid}
                        setValid={setEMailValid}
                        validate={() => {
                            if (email.trim().length === 0) {
                                return {valid: false, message: 'Vyžaduje sa používateľský email'};
                            }
                            const valid = EMAIL_REGEX.test(email);
                            let message;
                            if (!valid) {
                                message = 'Neplatný používateľský email';
                            }
                            return {valid, message};
                        }}/>

                    <LWInput
                        type="text"
                        name="captcha"
                        label="Kontrolný text"
                        placeholder="Zadajte kontrolný text"
                        required={true}
                        value={captchaText}
                        setValue={setCaptchaText}
                        valid={captchaTextValid}
                        setValid={setCaptchaTextValid}
                        validate={() => {
                            if (captchaText.trim().length === 0) {
                                return {valid: false, message: 'Vyžaduje sa kontrolný text'};
                            }
                            return {valid: true};
                        }}>
                        {captchaQuery.isLoading ?
                            <LWSpinner/>
                            :
                            <div className="flex-1 flex flex-wrap mb-2">
                                {captchaQuery.isError ?
                                    <p className="h-[24px] flex-1 h-full text-xs text-red-500 align-middle">
                                        Nepodarilo sa načítať kontrolný text
                                    </p>
                                    :
                                    <>
                                        <img
                                            className="h-[28px] flex-1"
                                            src={captchaQuery.data?.captchaImage}
                                            alt="Kontrolný text"/>
                                    </>
                                }
                                <div
                                    className="flex flex-wrap  p-1 gap-1 justify-center items-center bg-blue-100 hover:bg-blue-300 cursor-pointer"
                                    onClick={() => captchaQuery.refetch()}
                                >
                                    <RefreshCw size="16"/>
                                </div>
                            </div>
                        }
                    </LWInput>
                    <LWButton
                        type="submit"
                        className="w-full"
                        size="sm"
                        disabled={!isFormValid()}
                    >Odoslať
                    </LWButton>
                </form>
                {error && <p className="m-4 text-xs text-red-500">{error}</p>}
            </div>
    );
}

export default ResetPasswordPage;
