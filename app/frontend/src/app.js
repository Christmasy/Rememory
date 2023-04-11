import './app.css';
import { Button, Toolbar, Typography, Paper, Box, Grid } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { welcomePageStyles } from './pages/welcome-page/welcome-page-styles.js';
import OutlinedCard from './components/advantage-card';

const App = () => {
  const classes = welcomePageStyles();
  return (
    <Paper className={classes.back}>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography className={classes.logotype} variant="h6">
            ReMemory
          </Typography>
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

export default App;
