import background from '../../img/background.png';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const welcomePageStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${background})`,
      height: '100vh',
      width: '100vw'
    },
    appBar: {
      backgroundColor: "transparent",
      height: '64px',
    },
    button: {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '4px'
    },
    title: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '0.25px'
    },
    box: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
    bigMainText: {
      position: 'relative',
      top: '50px',
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '96px',
      lineHeight: '96px',
      letterSpacing: '1.5px',
      color: '#FFFFFF'
    },
    smallMainText: {
      position: 'relative',
      top: '60px',
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '40px',
      lineHeight: '50px',
      color: '#FFFFFF'
    }
  }),
);