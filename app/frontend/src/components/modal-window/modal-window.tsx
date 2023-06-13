import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { withAuth } from '../../utils/auth';
import { appContext } from '../../components/app-context/app-context';
import { useEffect, useState, useContext } from "react";
import { NavigateFunction } from 'react-router-dom';
import { addJourney } from "../../server-api/server-api";
import { useNavigate } from 'react-router-dom';

async function createJourney(
  title: string,
  start: Dayjs,
  end: Dayjs,
  navigate: NavigateFunction,
  setNewState: any,
  handleClose: () => void,
  setTitleError: (hasTitleError: boolean) => void,
  setDateError: (hasDateError: boolean) => void
){
  if(title === "") {
    setTitleError(true);
    return;
  }
  const journeyRes = await withAuth(navigate, setNewState, () => addJourney(title, start, end));
  if(journeyRes!.status === 422) {
    setDateError(true);
    return;
  }
  handleClose();
}

export default function ModalWindow() {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(dayjs(new Date(Date.now())));
  const [end, setEnd] = useState(dayjs(new Date(Date.now())));
  const [hasTitleError, setTitleError] = useState(false);
  const [hasDateError, setDateError] = useState(false);

  const navigate = useNavigate();
  const {setNewState} = useContext(appContext);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}
        style={{
          border: '1px solid rgba(3, 116, 105, 1)',
          color: 'rgba(3, 116, 105, 1)',
          width: '300px',
          margin: '0 auto',
          marginTop: '40px',
          marginBottom: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
        }}
      >
        Добавить новую поездку
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx= {{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              '& .MuiDialogContent-root': {
                //paddingTop: '20px !important',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              },
              minWidth: "650px",  // Set your width here
            },
          },
          minHeight: '450px',
        }}
      >
        <DialogTitle id="alert-dialog-title"
          sx= {{
            textAlign: 'center'
          }}
        >
          {"Новая поездка"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Задайте параметры поездки
          </DialogContentText>
          <TextField
            id="input-slot"
            label="Название поездки"
            type="input"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Дата начала поездки"
                value={start}
                onChange={(newStart) => setStart(newStart!)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Дата конца поездки"
                value={end}
                onChange={(newEnd) => setEnd(newEnd!)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
            onClick={() => createJourney(title, start, end, navigate, setNewState, handleClose, setTitleError, setDateError)}
            style={{
              border: '1px solid rgba(3, 116, 105, 1)',
              color: 'rgba(3, 116, 105, 1)',
              width: '200px',
              margin: '0 auto',
              marginBottom: '40px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            Сохранить
          </Button>
          <Snackbar open={hasTitleError} autoHideDuration={3000} onClose={() => setTitleError(false)}>
            <Alert severity="error" sx={{ width: '100%' }}>
              Заголовок не может быть пустым.
            </Alert>
          </Snackbar>
          <Snackbar open={hasDateError} autoHideDuration={3000} onClose={() => setDateError(false)}>
            <Alert severity="error" sx={{ width: '100%' }}>
              Данные даты для поездки уже заняты. Попробуйте другие.
            </Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </>
  );
}
