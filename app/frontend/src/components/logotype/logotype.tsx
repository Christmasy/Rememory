import { useStyles } from '../logotype/logotype-styles'
import { Typography } from '@material-ui/core';

export default function Logotype() {
  const classes = useStyles();
  return (
    <Typography className={classes.logotype} variant="h6">
      ReMemory
    </Typography>
  );
}