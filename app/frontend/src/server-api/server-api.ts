import dayjs from 'dayjs';
import { NavigateResponse, UpdateTokensResponse, request } from "../utils/request";

export const getCurrentUser = async (): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request('/api/Users/current', {headers:{'Content-Type':'application/json'}});
};

export const getJourneys = async (): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request('/api/Journeys', {headers:{'Content-Type':'application/json'}});
};

export const addJourney = async (title: string, start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request('/api/Journeys', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({title, start, end})
  });
};

export const getTextNotes = async (date: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`/api/Notes/textNote/${date}`, {
    headers:{'Content-Type':'application/json'}
  });
};

export const getVisitedPlaces = async (date: dayjs.Dayjs): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`/api/VisitedPlaces/${date}`, {
    headers:{'Content-Type':'application/json'}
  });
};

export const postOneTextNote = async (date: dayjs.Dayjs, content: string): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`/api/Notes/textNote`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({date, content})
  });
};

export const putTextNotes = async (id: string, content: string): Promise<NavigateResponse | UpdateTokensResponse | Response> => {
  return request(`/api/Notes/textNote/${id}`, {
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({content})
  });
};