import {createAuthProvider} from 'react-token-auth';


export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => fetch(`${process.env.REACT_APP_API_URL}/api/refresh`, {
            method: 'POST',
            body: token.access_token
        })
        .then(r => r.json())
    });