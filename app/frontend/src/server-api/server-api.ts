import { NavigateFunction } from "react-router-dom";
import { NavigateResponse, UpdateTokensResponse, request } from "../utils/request";

export const getCurrentUser = async (): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request('/api/Users/current', {headers:{'Content-Type':'application/json'}});
};
