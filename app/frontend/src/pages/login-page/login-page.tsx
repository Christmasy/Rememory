import React from 'react';
import TelegramLoginButton, { TelegramUser } from '@v9v/ts-react-telegram-login';

const handleTelegramResponse = (user: TelegramUser) => {
    console.log(user);
};

function LoginPage() {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <b>Shalom!</b>
            <br />
            <TelegramLoginButton dataOnAuth={handleTelegramResponse} botName="lou_bookkeeper_dev_bot" />
        </div>
    );
}

export default LoginPage;