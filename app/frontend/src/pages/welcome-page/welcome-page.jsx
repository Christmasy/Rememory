import { Button, Toolbar, Typography, Paper, Grid } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { welcomePageStyles } from '../welcome-page/welcome-page-styles';
import OutlinedCard from '../../components/advantage-card/advantage-card';
import Logotype from '../../components/logotype/logotype';

export default function WelcomePage() {
    const classes = welcomePageStyles();
    return (
        <Paper className={classes.back}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Logotype/>
              <div>
                <Button className={classes.button} variant="outlined">Зарегистрироваться</Button>
                <Button className={classes.button} variant="outlined">Войти</Button>
              </div>
            </Toolbar>
          </AppBar>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.bigMainText}>
              ReMemory
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.smallMainText}>
              Пусть путешествия будут незабываемыми
            </Typography>
          </Grid>
          <OutlinedCard/>
        </Paper>
    );
}