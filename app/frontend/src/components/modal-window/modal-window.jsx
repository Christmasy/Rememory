import { modalWindowStyles } from '../modal-window/modal-window-styles'
import { Typography } from '@material-ui/core';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React from 'react';
import { TextField } from '@material-ui/core';

export default function ModalWindow() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  const classes = modalWindowStyles();
  return (
    <>
    <Button variant="outlined" onClick={handleClickOpen}
     style={{border: '1px solid rgba(3, 116, 105, 1)',
     color: 'rgba(3, 116, 105, 1)',
     width: '300px',
     margin: '0 auto',
     marginTop: '40px',
     marginBottom: '30px',
     backgroundColor: 'rgba(255, 255, 255, 0.85)'}}>
            Добавить новую поездку
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
              {"Новая поездка"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" className={classes.dialogContentText}>
                Задайте параметры поездки
              </DialogContentText>
              <TextField
                id="input-slot"
                label="Название поездки"
                type="input"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}
                style={{border: '1px solid rgba(3, 116, 105, 1)',
                color: 'rgba(3, 116, 105, 1)',
                width: '200px',
                margin: '0 auto',
                marginBottom: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)'}}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    </>
  );
}