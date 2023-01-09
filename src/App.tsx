import {
    RouterProvider
} from 'react-router-dom';

import router from './router';
import Providers from './components/context/Providers';

const App = (): JSX.Element => {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}

export default App