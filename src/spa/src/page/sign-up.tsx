import React, { useEffect, useState } from 'react';
import { SimpleLayout } from '../component/layout';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/auth-state-context-provider';
import { FieldValues, useForm } from 'react-hook-form';
import errorToAppError from '../util';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();
    const [error, setError] = useState<string>();
    const {handleSubmit, register, formState: {errors, isSubmitting},} = useForm();

    useEffect(() => {
        if (authState.token) {
            navigate('/');
        }
    }, [authState.token, navigate]);

    const onSubmit = async (values: FieldValues) => {
        setError(undefined);
        try {
            await authState.signUp({
                username: values.username,
                password: values.password,
                titleBefore: values.titleBefore,
                firstName: values.firstName,
                midName: values.midName,
                lastName: values.lastName,
                titleAfter: values.titleAfter,
                email: values.email,
                captchaText: values.captchaText,
                captchaToken: ''
            });
        } catch (error: any) {
            const appError = await errorToAppError(error);
            setError(appError.message);
        }
    }

    return (
        <SimpleLayout>
        </SimpleLayout>
    );
}

export default SignUpPage;
