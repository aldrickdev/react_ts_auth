import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useLoggedIn } from '../components/context/LoginContext';
import { getUserDetails } from '../utils/auth_api'

const Account: React.FC = (): JSX.Element => {
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [updatingEmail, setUpdatingEmail] = React.useState<boolean>()
    const [updatingEmailText, setUpdatingEmailText] = React.useState<string>("")
    const [loggedIn, setLoggedIn] = useLoggedIn()
    const [cookies, , removeCookie] = useCookies(['greymint-login-token'])
    const redirect = useNavigate()

    React.useEffect(() => {
        const fetchUderDetails = async () => {
            let token = cookies['greymint-login-token']

            if (token) {
                let response = await getUserDetails(token)
                console.log(response)

                let status = response.status
                let data = response.data

                console.log(status)
                console.log(data)

                if (status === 200) {
                    setUsername(data.username)
                    setEmail(data.email)

                } else {
                    setLoggedIn(false)
                    removeCookie('greymint-login-token')
                    redirect('/')
                }

            } else {
                setLoggedIn(false)
                redirect('/')
            }
        }

        fetchUderDetails()
    }, [loggedIn])

    return (
        <div className='flex-1'>
            <main className='flex flex-col justify-center h-full w-1/2 m-auto'>
                <h2 className="text-4xl text-center pb-16">
                    Hey {username}, below are your account details
                </h2>

                <section id="info" className='pb-16'>
                    <table className='text-center w-full'>
                        <tbody>
                            <tr>
                                <td className='text-2xl p-2'>Username:</td>
                                <td className='text-2xl p-2'>{username}</td>
                                <td></td>
                            </tr>
                            <tr>
                                {
                                    !updatingEmail ?
                                        <>
                                            <td className='text-2xl p-2'>Email:</td>
                                            <td className='text-2xl p-2'>{email}</td>
                                            <td className='inline-block text-lg p-2 ml-4 border-4 rounded-md border-black hover:bg-slate-500 hover:text-white cursor-pointer'
                                                onClick={() => setUpdatingEmail(true)}
                                            >
                                                Update Email
                                            </td>
                                        </> :
                                        <>
                                            <td className='text-2xl p-2'>
                                                <label htmlFor="email-update">New Email:</label>
                                            </td>
                                            <td className='text-2xl p-2'>
                                                <form onSubmit={() => console.log(updatingEmailText)}>
                                                    <input
                                                        id='email-update'
                                                        className='text-lg p-2 ml-4 border-4 rounded-md border-black' type='email'
                                                        value={updatingEmailText}
                                                        onChange={(e) => setUpdatingEmailText(e.target.value)}
                                                    />
                                                </form>
                                            </td>
                                            <td>
                                                <button
                                                    className='inline-block text-lg p-2 ml-4 border-4 rounded-md border-black hover:bg-slate-500 hover:text-white cursor-pointer'
                                                    onSubmit={() => console.log(updatingEmail)}
                                                >
                                                    Submit
                                                </button>
                                                <button className='inline-block text-lg p-2 ml-4 border-4 rounded-md border-black hover:bg-slate-500 hover:text-white cursor-pointer'
                                                    onClick={() => setUpdatingEmail(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                }
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id="updates" className='flex justify-around'>
                    <button className='text-lg py-2 px-4 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white'>
                        Update Password
                    </button>
                    <button className='text-lg py-2 px-4 border-4 border-black rounded-md hover:bg-slate-500 hover:text-white'>
                        Disable Account
                    </button>
                </section>
            </main>
        </div>
    )
}

export default Account