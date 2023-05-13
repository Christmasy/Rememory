import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url('../../img/background.png')",
    height: '100vh',
    width: '100vw',
  },
  appBar: {
    backgroundColor: 'transparent',
    height: 64,
  },
  button: {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    color: '#FFFFFF',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 34,
    lineHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.25,
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  content: {
    position: 'relative',
    top: 150,
  },
  bigMainText: {
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
  smallMainText: {
    position: 'relative',
    top: 10,
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 40,
    lineHeight: '50px',
    color: '#FFFFFF',
  },
}));

export default useStyles;
