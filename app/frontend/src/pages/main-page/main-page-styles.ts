import { makeStyles } from '@mui/styles';
// @ts-ignore
import background from '../../img/left.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#009688',
    height: '64px',
  },
  drawer: {
    width: 350,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 350,
    backgroundImage: `url(${background})`,
    display: 'flex',
    flexDirection: 'column'
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: '24px',
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
