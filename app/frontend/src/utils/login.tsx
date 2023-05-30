import { NavigateFunction } from 'react-router-dom';
import { getDeviceId } from './generate-deviceId';

export async function login(
  user: {
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_data: number,
    hash: string,
  },
  navigate: NavigateFunction,
  setState: (acessToken: string) => void,
){
  const result = await fetch('/api/login', {
    method:'POST',
    body:JSON.stringify(user),
    headers:{'Content-Type':'application/json'}
  });
  const [acessToken, refreshToken] = (await result.json()).data;
  setState(acessToken);
  localStorage.setItem('refreshToken', refreshToken);
  const deviceId = getDeviceId(); // куда сохранять
  localStorage.setItem('deviceId', deviceId);
  navigate('/main');
}
