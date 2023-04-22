import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logotype from '../../components/logotype/logotype';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { mainPageStyles } from './main-page-styles';
import { TextField } from '@material-ui/core';
import { Input } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';*/

export default function MainPage() {
  const classes = mainPageStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Logotype/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Button variant="outlined" className={classes.saveBtn} onClick={handleClickOpen}>
            Добавить новую поездку
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
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
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" className={classes.saveBtn} onClick={handleClose}>Сохранить</Button>
            </DialogActions>
          </Dialog>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="MUI">
                    <TreeItem nodeId="8" label="index.js" />
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          className={classes.textField1}
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={15}
          defaultValue="Default Value"
          variant="filled"
          className={classes.textField}
        />
        <div>
      </div>
      </main>
    </div>
  );
}