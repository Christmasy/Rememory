import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { advantageCardStyles } from './advantage-card-styles';
import { CalendarToday } from '@material-ui/icons';

export default function OutlinedCard() {
  const classes = advantageCardStyles();
  return (
    <Box className={classes.box}>
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