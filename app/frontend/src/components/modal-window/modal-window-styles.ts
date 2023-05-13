import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    dialogPaper: {
      minHeight: '450px',
      minWidth: '750px',
      display: 'flex',
      paddingLeft: '60px',
      paddingRight: '60px',
    },
    dialogTitle: {
      textAlign: 'center',
    },
    dialogContentText: {
      marginTop: '70px',
    },
  });