import React from 'react'
import { useCookies } from 'react-cookie';

import { useLoggedIn } from '../components/context/LoginContext';

const Home: React.FC = () => {
    const [, setLoggedIn] = useLoggedIn();
    const [cookies] = useCookies(['greymint-login-token']);

    React.useEffect(() => {
        if (cookies['greymint-login-token']) {
            setLoggedIn(true)

        } else {
            setLoggedIn(false)
        }
    }, [])

    return (
        <div className='flex flex-1'>
            <p>Home</p>
        </div>
    )
}

export default Home