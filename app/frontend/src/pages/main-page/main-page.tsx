import * as React from 'react';
import { Drawer, AppBar, CssBaseline, Toolbar, TextField } from '@mui/material';
import Logotype from '../../components/logotype/logotype';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import ModalWindow from '../../components/modal-window/modal-window';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState, useContext } from "react";
import { getCurrentUser } from "../../server-api/server-api";
//import useStyles from './main-page-styles';
import { withAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../../components/app-context/app-context';
// @ts-ignore
import background from '../../img/left.png';

export default function MainPage() {
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [visitedPlaces, setVisitedPlaces] = useState<string>('');

    const navigate = useNavigate();
    const {setNewState} = useContext(appContext);

    useEffect(() => {
      withAuth(navigate, setNewState, getCurrentUser).then(async (res) => {
        console.log(await res?.text());
      });
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
    <div style={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#009688',
          height: '64px',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Logotype/>
            <div>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'rgba(255, 255, 255, 1)',
                marginRight: '10px'
              }}
            >
              Настройки
            </Button>
            <Button
              variant="outlined"
              startIcon={<AccountCircleIcon />}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'rgba(255, 255, 255, 1)'
              }}
            >
              Юлия Алексеева
            </Button>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 350,
          flexShrink: 0
        }}
        variant="permanent"
        classes={{
          paper: "drawerPaper",
        }}
      >
        <Toolbar />
        <div style={{
            width: 350,
            backgroundImage: `url(${background})`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <ModalWindow/>
          <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 350,
                overflowY: 'auto',
                fontWeight: 500,
                color: '#FFFFFF'
              }}
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
      <main style={{
          flexGrow: 1,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        <TextField
          id="filled-multiline-static"
          value={date}
          label="Дата"
          multiline
          minRows={1}
          variant="filled"
          sx={{
            width: 900,
          }}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          value={visitedPlaces}
          label="Место"
          multiline
          minRows={4}
          variant="filled"
          sx={{
            width: 900,
          }}
          margin="normal"
        />
        <TextField
          id="filled-multiline-static"
          value={description}
          label="Расскажите о событиях"
          multiline
          minRows={15}
          variant="filled"
          sx={{
            width: 900,
          }}
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
