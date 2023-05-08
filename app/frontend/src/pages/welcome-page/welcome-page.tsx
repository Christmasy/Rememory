import styles from './welcome-page.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AdvantageCard from '../../components/advantage-card/advantage-card';
import Logotype from '../../components/logotype/logotype';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react'

export default function WelcomePage() {
    return (
        <div className={styles.root}>
            <CssBaseline />
            <AppBar className={styles.appBar}>
                <Toolbar>
                <Logotype/>
                <div>
                    <Button className={styles.button} variant="outlined">Зарегистрироваться</Button>
                    <Button className={styles.button} variant="outlined">Войти</Button>
                </div>
                </Toolbar>
            </AppBar>
            <div className={styles.content}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography className={styles.bigMainText}>
                    ReMemory
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography className={styles.smallMainText}>
                    Пусть путешествия будут незабываемыми
                    </Typography>
                </Grid>
                <AdvantageCard/>
            </div>
        </div>
    );
}
