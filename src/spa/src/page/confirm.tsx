import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from '../context/auth-state-context-provider';
import errorToAppError from '../util';

const ConfirmPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();
    const {token} = useParams();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const confirm = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (token) {
                await authState.confirm({token});
            }
        } catch (error: any) {
            const appError = await errorToAppError(error);
            setError(appError.message);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        if (authState.token) {
            navigate('/');
        }
    }, [authState.token, navigate]);

    useEffect(() => {
        confirm();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[480px]">
            <h1>Potvrdenie žiadosti</h1>
            {error && <p className="m-4 text-xs text-red-500">{error}</p>}
        </div>
    );
}

export default ConfirmPage;
