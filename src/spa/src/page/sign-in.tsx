import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuthState } from '../context/auth-state-context-provider';
import errorToAppError from '../util';
import { SimpleLayout } from '../component/layout';
import { Spinner } from '../component/ui/spinner';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const authState = useAuthState();
    const [error, setError] = useState<string>();
    const {handleSubmit, register, formState: {errors, isSubmitting, isValid},} = useForm();

    useEffect(() => {
        if (authState.token) {
            navigate('/');
        }
    }, [authState.token, navigate]);

    const onSubmit = async (values: FieldValues) => {
        setError(undefined);
        try {
            await authState.signIn({username: values.username, password: values.password});
        } catch (error: any) {
            const appError = await errorToAppError(error);
            setError(appError.message);
        }
    }

    return (
        <SimpleLayout>
            <div className="flex items-center justify-center px-4 lg:px-8 py-12 lg:py-24 min-h-[500px]">
                {isSubmitting ?
                    <Spinner/>
                    :
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-xl lg:text-3xl font-extrabold text-gray-900"
                            >Prihláste sa do svojho účtu
                            </h2>

                            <p className="mt-2 text-center text-xs lg:text-sm">
                                <span>Alebo </span>
                                <NavLink to="/sign-up" className="text-gray-500 hover:text-gray-800 font-semibold">
                                    sa zaregistrujte
                                </NavLink>
                            </p>
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="username" className="sr-only">
                                        Používateľské meno
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2
                                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10
                                    text-sm lg:text-base"
                                        placeholder="Zadajte svoje používateľské meno"
                                        required
                                        {...register('username', {
                                            required: 'Vyžaduje sa používateľské meno'
                                        })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2
                                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10
                                    text-sm lg:text-base"
                                        placeholder="Zadajte svoje heslo"
                                        required
                                        {...register('password', {
                                            required: 'Vyžaduje sa heslo'
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="text-xs lg:text-sm text-center">
                                    <NavLink to="/reset-password"
                                             className="text-gray-500 hover:text-gray-800 font-semibold">
                                        Zabudnuté heslo?
                                    </NavLink>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4
                                    border border-transparent text-sm font-medium rounded-md text-white
                                    bg-blue-600 hover:bg-blue-700 focus:outline-none
                                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Prihlásiť
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </SimpleLayout>
    );
};

export default SignInPage;
