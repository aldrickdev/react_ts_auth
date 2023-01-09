import { LoggedInProvider } from "./LoginContext";
import { CookiesProvider } from 'react-cookie';

type ProvidersProps = {
    children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return <>
        <CookiesProvider>
            <LoggedInProvider>
                {children}
            </LoggedInProvider>
        </CookiesProvider>
    </>
}

export default Providers
