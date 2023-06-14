import dayjs from 'dayjs';
import { NavigateResponse, UpdateTokensResponse, request } from "../utils/request";
import { BASE_API } from '../utils/url';

export const getCurrentUser = async (): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Users/current`, {headers:{'Content-Type':'application/json'}});
};

export const getJourneys = async (): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Journeys`, {headers:{'Content-Type':'application/json'}});
};

export const addJourney = async (title: string, start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Journeys`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({title, start, end})
  });
};

export const getTextNotes = async (date: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Notes/textNote/${date}`, {
    headers:{'Content-Type':'application/json'}
  });
};

export const getVisitedPlaces = async (date: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/VisitedPlaces/${date}`, {
    headers:{'Content-Type':'application/json'}
  });
};

export const postOneTextNote = async (date: dayjs.Dayjs, content: string): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Notes/textNote`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({date, content})
  });
};

export const putTextNotes = async (id: string, content: string): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`${BASE_API}/api/Notes/textNote/${id}`, {
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({content})
  });
};