import React from 'react'

type ResultsProps = {
    status: number,
    message: string
}

const Results: React.FC<ResultsProps> = ({ status, message }): JSX.Element => {
    return (
        <>
            {
                status === 0 ?
                    <section
                        id='results'
                        className='text-center mb-8 bg-slate-300 border-slate-400 p-1 border-4 rounded-md '
                    >
                        <p>{message}</p>
                    </section> :
                    status >= 400 ?
                        <section
                            id='results'
                            className='text-center mb-8 bg-red-300 p-1 border-4 rounded-md border-red-400'
                        >
                            <p>{message}</p>
                        </section> :

                        <section
                            id='results'
                            className='text-center mb-8 bg-green-300 p-1 border-4 rounded-md border-green-400'
                        >
                            <p>{message}</p>
                        </section>
            }
        </>
    )
}

export default Results