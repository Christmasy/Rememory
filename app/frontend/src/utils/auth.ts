import { NavigateFunction } from "react-router-dom";
import { NavigateResponse, UpdateTokensResponse } from "./request";

export async function withAuth (
    navigate: NavigateFunction,
    setToken: (token: string) => void,
    req: () => Promise<NavigateResponse | UpdateTokensResponse | Response>
): Promise<Response | null> {
    const result = await req();

    if(result instanceof NavigateResponse) {
        navigate(result.path);
        return null;
    }

    if (result instanceof UpdateTokensResponse) {
        setToken(result.accessToken);
        return result.result;
    }

    return result;
}