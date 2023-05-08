import styles from './logotype.module.css';
import { Typography } from '@material-ui/core';
import React from 'react'

export default function Logotype() {
  return (
    <Typography className={styles.logotype} variant="h6">
      ReMemory
    </Typography>
  );
}
