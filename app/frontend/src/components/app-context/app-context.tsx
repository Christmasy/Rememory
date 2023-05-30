import React, { Context, useEffect, useState } from 'react';

export const appContext = React.createContext({}) as any as Context<any>;

function AppContext(props: any) {
  const [state, setState] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      setState(token);
    }
  }, [])

  function setNewState(token: string) {
    localStorage.setItem('accessToken', token);
    setState(token);
  }

  return <appContext.Provider value={{state, setNewState}}>{props.children}</appContext.Provider>
}

export default AppContext;
