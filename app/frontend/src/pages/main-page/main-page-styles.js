import { createStyles, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

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
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' 
    },
    textField1: {
      width: '900px',
      margin: 0
    },
    textField2: {
      width: '900px',
      margin: 0
    },
    saveBtn: {
      border: '1px solid #06D9C5',
      borderRadius: '4px',
      color: '#FFFFFF'
    }
  }),
);