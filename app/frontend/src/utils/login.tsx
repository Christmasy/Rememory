import { NavigateFunction } from 'react-router-dom';
import { getDeviceId } from './generate-deviceId';
import { BASE_API } from './url';

export async function login(
  user: {
    id: number,
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
  let deviceId = localStorage.getItem('deviceId');
  if(!deviceId) {
    deviceId = getDeviceId();
    localStorage.setItem('deviceId', deviceId);
  }
  const result = await fetch(`${BASE_API}/api/Auth/login`, {
    method:'POST',
    body:JSON.stringify(user),
    headers:{'Content-Type':'application/json', 'DeviceId':deviceId}
  });
  const {accessToken, refreshToken} = await result.json();
  console.log(accessToken);
  setState(accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  navigate('/main');
}
