export const getUsers = async () => {
  return await fetch('https://localhost:5001/api/Journey/days?journeyId=2ee7822c-faac-46fe-89fa-ab6559d6fd55', {
    mode: 'no-cors'
  });
};

export const tryGet = async () => {
  return await fetch('https://b51b-109-195-105-137.ngrok-free.app', {
    method: 'get',
    headers: new Headers({
      'ngrok-skip-browser-warning': '1',
    }),
  });
}

export const getUsers2 = async () => {
  return await fetch('http://158.160.104.212/api/Users')
};