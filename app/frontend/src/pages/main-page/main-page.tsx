import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Logotype from '../../components/logotype/logotype';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { TextField } from '@material-ui/core';
import ModalWindow from '../../components/modal-window/modal-window';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import { getUsers, getUsers2 } from "../../server-api/server-api";
import useStyles from './main-page-styles';

export default function MainPage() {
    const classes = useStyles();
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [visitedPlaces, setVisitedPlaces] = useState<string>('');

    useEffect(() => {
      console.log(getUsers2());
      /*getUsers().then((res) => {
        console.log(res);
        console.log(res.status);
        console.log(res.json());
        if (res.status === 200) {
          res.json().then(({id, journeyId, date, visitedPlaces, description
                            }) => {
            setDate(date);
            setVisitedPlaces(visitedPlaces);
            setDescription(description);
          });
        }
      });*/
    }, []);

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
          paper: "drawerPaper",
        }}
      >
        <Toolbar />
        <div className={classes.drawerPaper}>
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
          value={date}
          label="Дата"
          multiline
          minRows={1}
          variant="filled"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          value={visitedPlaces}
          label="Место"
          multiline
          minRows={4}
          variant="filled"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          value={description}
          label="Расскажите о событиях"
          multiline
          minRows={15}
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
  )
};
