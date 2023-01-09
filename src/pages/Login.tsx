import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../utils/auth_api';
import { BACKEND_URL } from '../utils/constants';
import { useLoggedIn } from '../components/context/LoginContext';

const Login: React.FC = (): JSX.Element => {
    axios.defaults.baseURL = BACKEND_URL;

    // State
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    interface ResultInterface {
        status: number
        text: string
    }
    const [result, setResult] = React.useState<ResultInterface>();
    const [loggedIn, setLoggedIn] = useLoggedIn();
    const [cookies, setCookie, removeCookie] = useCookies(['greymint-login-token']);
    const redirect = useNavigate()

    React.useEffect(() => {
        if (cookies['greymint-login-token']) {
            setLoggedIn(true)
            redirect('/')

        } else {
            setLoggedIn(false)
        }
    }, [])

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        let resultObject: ResultInterface = {
            status: 0,
            text: "Loading..."
        }
        setResult(resultObject)

        let result = await login(email, password);
        let loggedInState = false

        if (result.status !== 200) {
            resultObject = {
                status: result.status,
                text: "Invalid Credentials, Please try again"
            }

            setPassword("")
            loggedInState = false
            removeCookie('greymint-login-token')

        } else {
            resultObject = {
                status: result.status,
                text: "Login Successful, Redirecting to Home Page"
            }
            let token = result.data.access_token

            setEmail("")
            setPassword("")

            let now = new Date()
            let expires = new Date()
            expires.setHours(5 + now.getHours())

            setCookie('greymint-login-token', token, { domain: "localhost", expires: expires })
            loggedInState = true
        }

        setTimeout(() => {
            setResult(undefined)
            setLoggedIn(loggedInState)

            if (loggedInState) {
                redirect('/')
            }
        }, 2000)

        setResult(resultObject)
        return
    }

    return (
        <div className='flex flex-1'>
            {
                !loggedIn ?
                    <main className="w-1/2 flex flex-col m-auto">
                        <h2 className='text-4xl pb-16'>Login</h2>

                        {
                            result ?
                                result.status === 0 ?
                                    <section id='results' className='mb-8 bg-slate-300 border-slate-400 p-1 border-4 rounded-md '>
                                        <p>{result?.text}</p>
                                    </section> :

                                    result?.status !== 200 ?
                                        <section id='results' className='mb-8 bg-red-300 p-1 border-4 rounded-md border-red-400'>
                                            <p>{result?.text}</p>
                                        </section> :

                                        <section id='results' className='mb-8 bg-green-300 p-1 border-4 rounded-md border-green-400'>
                                            <p>{result?.text}</p>
                                        </section>
                                : null
                        }

                        <form className='flex flex-col' onSubmit={(e) => loginHandler(e)}>
                            <label id="email-label" className='text-xl w-11/12 mx-auto' htmlFor="login-email">
                                Email:
                            </label>
                            <input
                                className="w-11/12 mx-auto p-2 border-4 border-black rounded-md"
                                type="email"
                                name="login-email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <br />

                            <label id="password-label" className='text-xl pt-8 w-11/12 mx-auto' htmlFor="login-password" >
                                Password:
                            </label>
                            <input
                                className="w-11/12 mx-auto p-2 border-4 border-black rounded-md"
                                type="password"
                                name="login-password"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <br />

                            <div className='flex justify-around h-16 mt-16'>
                                <button className="text-xl px-8 border-4 border-black hover:bg-slate-500 rounded-md hover:text-white" type="submit" >
                                    Login
                                </button>

                                <button className="text-xl px-8 border-4 border-black hover:bg-slate-500 rounded-md hover:text-white">
                                    Sign Up
                                </button>
                            </div>
                            <Link to="#" className='mt-4'>Forgot Password? Click Here</Link>
                        </form>
                    </main>
                    : null
            }
        </div>
    )
}

export default Login