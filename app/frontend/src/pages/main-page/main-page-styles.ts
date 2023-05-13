import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import background from '../../img/left.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#009688',
    height: '64px',
  },
  drawer: {
    width: 350,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 350,
    backgroundImage: `url(${background})`
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textField: {
    width: 900,
    marginBottom: 30,
  },
}));

export default useStyles;