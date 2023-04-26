import { createStyles, makeStyles } from '@material-ui/core/styles';
import background from '../../img/left.png';

const drawerWidth = 350;

export const mainPageStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#009688',
      height: '64px',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundImage: `url(${background})`,
    },
    drawerContainer: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    textField: {
      width: '900px',
      marginBottom: '30px'
    }
  }),
);