
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { welcomePageStyles } from '../welcome-page/welcome-page-styles';
import AdvantageCard from '../../components/advantage-card/advantage-card';
import Logotype from '../../components/logotype/logotype';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function WelcomePage() {
    const classes = welcomePageStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                <Logotype/>
                <div>
                    <Button className={classes.button} variant="outlined">Зарегистрироваться</Button>
                    <Button className={classes.button} variant="outlined">Войти</Button>
                </div>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
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
                <AdvantageCard/>
            </div>
        </div>
    );
}