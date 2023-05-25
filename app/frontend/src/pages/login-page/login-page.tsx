import React from 'react';
import useStyles from './login-page-styles';
import { TelegramLoginButton } from '../../components/telegram-login-btn/telegram-login-btn';

export default function LoginPage() {
  const handleTelegramResponse = (response: any) => {
    console.log(response);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TelegramLoginButton className={classes.loginBtn} dataOnauth={handleTelegramResponse} botName="RememoryBotBot" buttonSize= "large" requestAccess= "write" usePic={true} lang= "en" widgetVersion={9}/>
    </div>
  );
}
