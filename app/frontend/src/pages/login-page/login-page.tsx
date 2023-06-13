import React from 'react';
import useStyles from './login-page-styles';
import { TelegramLoginButton } from '../../components/telegram-login-btn/telegram-login-btn';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TelegramLoginButton navigate={useNavigate()} botName="RememoryBotBot" buttonSize= "large" requestAccess= "write" usePic={true} lang= "en" widgetVersion={9}/>
    </div>
  );
}
