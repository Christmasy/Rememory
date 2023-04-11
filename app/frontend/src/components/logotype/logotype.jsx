import { logotypeStyles } from '../logotype/logotype-styles'
import { Typography } from '@material-ui/core';

export default function Logotype() {
  const classes = logotypeStyles();
  return (
    <Typography className={classes.logotype} variant="h6">
      ReMemory
    </Typography>
  );
}