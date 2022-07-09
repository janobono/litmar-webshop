import React from 'react';
import { useAuthState } from '../../context/auth-state-context-provider';
import { NavLink } from 'react-router-dom';
import { LogIn, LogOut } from 'react-feather';

const Nav: React.FC = () => {
    const authState = useAuthState();

    return (
        <nav className="flex flex-wrap bg-blue-100 px-5 py-1">
            <div className="flex-1"></div>
            <div className="flex flex-wrap">
                {
                    authState.token ? (
                        <div
                            className="flex flex-wrap p-1 gap-1 items-center text-sm hover:bg-blue-200 cursor-pointer"
                            onClick={() => authState.signOut()}
                        >
                            <LogOut/>
                            <div>Odhlásiť</div>
                        </div>
                    ) : (
                        <NavLink
                            className="flex flex-wrap p-1 gap-1 items-center text-sm hover:bg-blue-200"
                            to="/sign-in"
                        >
                            <LogIn/>
                            <div>Prihlásiť</div>
                        </NavLink>
                    )
                }
            </div>
        </nav>
    );
}

export default Nav;
