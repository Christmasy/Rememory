import jwt_decode from "jwt-decode";
import { NavigateFunction } from 'react-router-dom';

/*export function jwtDecode(token: string) {
    const base64 = token.split(".");
    const
}*/

export class NavigateResponse {
    public readonly path: string;

    constructor(path: string) {
        this.path = path;
    }
}

export class UpdateTokensResponse {
    public readonly accessToken: string;
    public readonly result: Response;

    constructor(accessToken: string, result: Response) {
        this.accessToken = accessToken;
        this.result = result;
    }
}

export async function request(
    input: RequestInfo,
    init?: RequestInit
): Promise<NavigateResponse | UpdateTokensResponse | Response> {
    const accessToken = localStorage.getItem('accessToken');
    const decodedAccess = jwt_decode(accessToken!) as {exp: number};

    if (decodedAccess.exp < Date.now()) {
        const decodedRefresh = jwt_decode(localStorage.getItem('refreshToken')!) as {exp: number};

        if (decodedRefresh.exp! < Date.now()) {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            return new NavigateResponse('/');
        }
        
        const refreshResult = await fetch('/api/Auth/refresh', {
            method:'POST',
            body:JSON.stringify({refreshToken: localStorage.getItem('refreshToken'), deviceId: localStorage.getItem('deviceId')}),
            headers:{'Content-Type':'application/json'}
        });
        const {accessToken, refreshToken} = await refreshResult.json();
        localStorage.setItem('refreshToken', refreshToken);

        const result = await fetch(input, {...init, headers: {...init?.headers, 'Authorization': `Bearer ${accessToken}`}});
        return new UpdateTokensResponse(accessToken, result);
    }

    return fetch(input, {...init, headers: {...init?.headers, 'Authorization': `Bearer ${accessToken}`}});
}