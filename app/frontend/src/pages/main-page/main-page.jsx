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

import ModalWindow from '../../components/modal-window/modal-window';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/*import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';*/

export default function MainPage() {
  const classes = mainPageStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Logotype/>
            <div>
            <Button variant="outlined" startIcon={<SettingsIcon />}
              style={{border: '1px solid rgba(255, 255, 255, 0.5)',
                    color: 'rgba(255, 255, 255, 1)',
                    marginRight: '10px'}}
            >
              Настройки
            </Button>
            <Button variant="outlined" startIcon={<AccountCircleIcon />}
              style={{border: '1px solid rgba(255, 255, 255, 0.5)',
                    color: 'rgba(255, 255, 255, 1)'}}
            >
              Юлия Алексеева
            </Button>
            </div>
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
          <ModalWindow/>
          <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 350, overflowY: 'auto', fontWeight: 500, color: '#FFFFFF' }}
              >
              <TreeItem nodeId="1" label="Франция, Париж, 2013">
              </TreeItem>
              <TreeItem nodeId="5" label="Италия, 2010">
                  <TreeItem nodeId="10" label="День 1. 24.11.2010" />
                  <TreeItem nodeId="6" label="День 2. 25.11.2010" />
                  <TreeItem nodeId="8" label="День 3. 26.11.2010" />
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
          rows={1}
          variant="filled"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          variant="filled"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          label="Расскажите о событиях"
          multiline
          rows={15}
          variant="filled"
          className={classes.textField}
          margin="normal"
        />
        <Button variant="outlined"
          style={{border: '1px solid rgba(3, 116, 105, 1)',
          color: 'rgba(3, 116, 105, 1)',
          width: '200px',
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          marginTop: '20px'}}>
            Сохранить
        </Button>
        <div>
      </div>
      </main>
    </div>
  );
}