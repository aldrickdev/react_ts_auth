import React from 'react'

// Create the context and its type
type LoggedIntype = {
    In: boolean;
    setIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoggedInContext = React.createContext<LoggedIntype>({ In: true, setIn: () => true });

export const useLoggedIn = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    let temp = React.useContext(LoggedInContext)
    return [temp.In, temp.setIn]
}

// Create the provider and its type
type LoggedInContextProviderProps = {
    children: React.ReactNode
}
export const LoggedInProvider = ({ children }: LoggedInContextProviderProps) => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    return <LoggedInContext.Provider value={{ In: loggedIn, setIn: setLoggedIn }}>
        {children}
    </LoggedInContext.Provider>
}
