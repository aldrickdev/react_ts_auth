import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { confirmEmailUpdate } from '../utils/auth_api'
import Results from '../components/Results';

const ConfirmUpdateEmail: React.FC = (): JSX.Element => {

    const { id } = useParams();
    const redirect = useNavigate();

    interface ResultInterface {
        status: number
        text: string
    }
    const [result, setResult] = React.useState<ResultInterface>()

    React.useEffect(() => {
        const effect = async () => {
            let resultObject = {
                status: 0,
                text: "Loading..."
            }

            if (id) {
                let response = await confirmEmailUpdate(id)

                if (response.status >= 400) {
                    resultObject = {
                        status: response.status,
                        text: "Failure Updating your email"
                    }
                } else {

                    resultObject = {
                        status: response.status,
                        text: "You email has been successfully updated, please wait while we redirect you to your account"
                    }
                }

            } else {
                resultObject = {
                    status: 400,
                    text: "Failure Updating your email"
                }
            }

            setResult(resultObject)
        }

        effect()
    }, [])

    return (
        <div className='m-auto'>
            {
                result?.status && result?.text ?
                    < Results status={result.status} message={result.text} />
                    :
                    null
            }
        </div >
    )
}

export default ConfirmUpdateEmail
