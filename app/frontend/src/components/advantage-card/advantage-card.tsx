import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useStyles } from './advatage-card-styles';
import { CalendarToday } from '@material-ui/icons';
import Box from '@mui/material/Box';

export default function AdvantageCard() {
  const classes = useStyles();
  return (
    <Box className="box">
      <Card variant="outlined" className={classes.card}>
        <React.Fragment>
          <CardContent>
            <CalendarToday className={classes.icon}/>
            <Typography className={classes.advantage}>
              Удобные напоминания
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <Card variant="outlined" className={classes.card}>
        <React.Fragment>
          <CardContent>
            <Typography className={classes.advantage}>
              Не нужно ничего скачивать
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <Card variant="outlined" className={classes.card}>
        <React.Fragment>
          <CardContent>
            <Typography className={classes.advantage}>
              Удобные напоминания
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
