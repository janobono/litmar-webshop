import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from '../../context/auth-state-context-provider';
import { useGlobalState } from '../../context/global-state-context-provider';
import { Spinner } from '../ui/spinner';
import { User } from 'react-feather';

const Header: React.FC = () => {
    const globalState = useGlobalState();
    const authState = useAuthState();

    return (
        <header className="bg-blue-200 p-5">
            {globalState.companyInfo ?
                <div className="flex flex-col md:flex-row  gap-1 md:gap-5 items-center">
                    <div className="basis-1/5 flex-none">
                        <img
                            className="min-h-[48px] w-auto min-w-[100px]"
                            src={globalState.companyInfo.logo}
                            alt="Litmar s.r.o."/>
                    </div>
                    <div className="basis-2/5">
                        {globalState.companyInfo ?
                            <NavLink className="block text-center text-lg" to="/"
                            >{globalState.companyInfo.firm}
                            </NavLink>
                            :
                            <Spinner/>
                        }
                    </div>
                    <div className="flex flex-1 flex-row items-end justify-end">
                        {
                            authState.user ?
                                <div className="flex flex-1">

                                </div>
                                :
                                <div className="flex flex-wrap text-xs">
                                    <div className="flex-col">
                                        <div className="flex flex-wrap pb-4">
                                            <User size="16" className="pr-1"/>
                                            <div>Neprihlásený používateľ</div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <NavLink to="/sign-in"
                                                     className="text-gray-500 hover:text-gray-800 font-semibold pr-1"
                                            >Prihláste sa</NavLink>
                                            <div>alebo sa</div>
                                            <NavLink to="/sign-up"
                                                     className="text-gray-500 hover:text-gray-800 font-semibold pl-1"
                                            >Zaregistrujte</NavLink>
                                            <div>.</div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                :
                <div className="flex flex-1 justify-center items-center">
                    <Spinner/>
                </div>
            }
        </header>
    );
}

export default Header;
