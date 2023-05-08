import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import styles from './advantage-card.module.css'
import { CalendarToday } from '@material-ui/icons';

export default function AdvantageCard() {
  return (
    <Box className={styles.box}>
      <Card variant="outlined" className={styles.card}>
        <React.Fragment>
          <CardContent>
            <CalendarToday className={styles.icon}/>
            <Typography className={styles.advantage}>
              Удобные напоминания
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <Card variant="outlined" className={styles.card}>
        <React.Fragment>
          <CardContent>
            <Typography className={styles.advantage}>
              Не нужно ничего скачивать
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <Card variant="outlined" className={styles.card}>
        <React.Fragment>
          <CardContent>
            <Typography className={styles.advantage}>
              Удобные напоминания
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
