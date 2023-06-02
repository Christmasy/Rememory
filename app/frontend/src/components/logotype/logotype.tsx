import { useStyles } from '../logotype/logotype-styles'
import { Typography } from '@mui/material';

export default function Logotype() {
  const classes = useStyles();
  return (
    <Typography className={classes.logotype} variant="h6">
      ReMemory
    </Typography>
  );
}