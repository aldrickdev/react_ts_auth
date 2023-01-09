import React from 'react';
import { Link } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';

import { useCookies } from 'react-cookie';
import { useLoggedIn } from '../components/context/LoginContext';


const Navbar: React.FC = () => {
    const [loggedIn, setLoggedIn] = useLoggedIn()
    const [, , removeCookie] = useCookies(['greymint-login-token']);

    const logout = (): void => {
        setLoggedIn(false)
        removeCookie('greymint-login-token')
    }

    return (
        <nav className='border-r-2 border-r-black w-52 flex flex-col h-screen'>
            <section className='mt-16 mb-16 self-center'>
                <GrHomeRounded size={50} />
            </section>
            <section>
                <ul>
                    <Link to='/'>
                        <li className='text-2xl p-4 m-2 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white text-center '>
                            Home
                        </li>
                    </Link>

                    {
                        !loggedIn ?
                            <Link to='/login'>
                                <li className='text-2xl p-4 m-2 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white text-center'>
                                    Login
                                </li>
                            </Link>
                            :
                            <>
                                <Link to='/account'>
                                    <li className='text-2xl p-4 m-2 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white text-center'>
                                        My Account
                                    </li>
                                </Link>
                                <li onClick={() => logout()} className='text-2xl p-4 m-2 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white text-center cursor-pointer'>
                                    Log Out
                                </li>
                            </>
                    }
                </ul>
            </section>
        </nav >
    )
}

export default Navbar