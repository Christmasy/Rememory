import * as React from 'react';
import { Drawer, AppBar, CssBaseline, Toolbar, TextField } from '@mui/material';
import Logotype from '../../components/logotype/logotype';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import ModalWindow from '../../components/modal-window/modal-window';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState, useContext } from "react";
import { getJourneys, getCurrentUser, getTextNotes, getVisitedPlaces, postOneTextNote, putTextNotes } from "../../server-api/server-api";
import { withAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../../components/app-context/app-context';
// @ts-ignore
import background from '../../img/left.png';
import getDaysJourneyArray from '../../utils/get-days-journey-array';
import { Journey } from '../../models/journey';
import { TextNote } from '../../models/text-note';
import dayjs from 'dayjs';
import dayjsToVizualizeFormat from '../../utils/dayjs-to-visualize-format';

async function updateTextFields(
  textNotes: any[]
){
  textNotes.forEach((textNote) => {
    putTextNotes(textNote.id, textNote.content);
  });
}

export default function MainPage() {
    const [date, setDate] = useState<string>('');
    const [visitedPlaces, setVisitedPlaces] = useState<string>('');
    const [textNotes, setTextNotes] = useState([]);

    const [isChoosedDay, setIsChoosedDay] = useState<boolean>(false);

    const [journeys, setJourenys] = useState([]);
    const [userName, setUserName] = useState<string>('Аноним');

    const navigate = useNavigate();
    const {setNewState} = useContext(appContext);

    const handleTreeItemClick = async (day: dayjs.Dayjs, formattedDay: string) => {
      setIsChoosedDay(true);
      setDate(formattedDay);
      setTextNotes([]);
      const textNotesRes = await withAuth(navigate, setNewState, () => getTextNotes(day));
      const textNotes = (await textNotesRes!.json()).map((textNote: any) => new TextNote(
          textNote.id,
          textNote.content
        )
      );
      if(textNotes.length === 0) {
        const now = dayjs()
        const updatedTextNoteRes = await (await withAuth(navigate, setNewState, () => postOneTextNote(now, "")))!.json();
        const updatedTextNote = new TextNote(
          updatedTextNoteRes.id,
          updatedTextNoteRes.content
        );
        textNotes.push(updatedTextNote);
      }
      setTextNotes(textNotes);
      const visitedPlacesRes = await withAuth(navigate, setNewState, () => getVisitedPlaces(day));
      const visitedPlaces = (await visitedPlacesRes!.json()).map((visitedPlace: any) => visitedPlace.title).join(', ');
      setVisitedPlaces(visitedPlaces);
    }

    const updateCurTextNote = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newArr : TextNote[]  = [...textNotes];
      newArr[index].content = e.target.value;
      setTextNotes(newArr as any);
    }

    useEffect(() => {
      async function fetchData() {
        const journeysRes = await withAuth(navigate, setNewState, getJourneys);
        const journeys = await journeysRes!.json();
        setJourenys(journeys.map((journey: any) => new Journey(
              journey.id,
              journey.userId, 
              journey.title,
              journey.start,
              journey.end
            )
          )
        );
        const userRes = await withAuth(navigate, setNewState, getCurrentUser);
        const user = await userRes!.json();
        if(user.firstName !== undefined && user.lastName !== undefined) {
          setUserName(`${user.firstName} ${user.lastName}`);
        }
      }
      fetchData();
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
              startIcon={<AccountCircleIcon />}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'rgba(255, 255, 255, 1)'
              }}
            >
              {userName}
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
            flexDirection: 'column',
            height: '100%'
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
              {
                journeys.map((journey: any) => {
                    const journeyDays = getDaysJourneyArray(journey.start, journey.end);
                    return (
                      <TreeItem nodeId={journey.id} key={journey.id} label={journey.title}>
                        {
                          journeyDays.map((day: any, index: number) => {
                            const formattedDay = dayjsToVizualizeFormat(day, index + 1);
                              return (<TreeItem
                                  nodeId={day}
                                  key={day}
                                  label={
                                    <div onClick={event => event.stopPropagation()}>
                                      <div onClick={() => handleTreeItemClick(day, formattedDay)}>
                                        {formattedDay}
                                      </div>
                                    </div>
                                  }
                                />);
                            }
                          )
                        }
                      </TreeItem>
                    )
                  }
                )
              }
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
        {
          isChoosedDay ? (
            <>
              <TextField
                id="filled-multiline-static"
                key={"1"}
                value={date}
                label="Дата"
                multiline
                minRows={1}
                variant="filled"
                sx={{
                  width: 900,
                }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true
                }}
                margin="normal"
              />
              <TextField
                id="filled-multiline-static"
                key={"2"}
                value={visitedPlaces}
                label="Места"
                multiline
                minRows={1}
                variant="filled"
                sx={{
                  width: 900,
                }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true
                }}
                margin="normal"
              />
              {
                textNotes.map((textNote: any, index) =>  (
                    <TextField
                      id={textNote.id}
                      key={textNote.id}
                      defaultValue={textNote.content}
                      onChange={updateCurTextNote(index)}
                      label="Расскажите о событиях"
                      multiline
                      minRows={8}
                      variant="filled"
                      sx={{
                        width: 900,
                      }}
                      margin="normal"
                    />
                  )
                )
              }
              <Button variant="outlined"
                onClick={() => updateTextFields(textNotes)}
                style={{
                  border: '1px solid rgba(3, 116, 105, 1)',
                  color: 'rgba(3, 116, 105, 1)',
                  width: '200px',
                  margin: '0 auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  marginTop: '20px'
                }}>
                  Сохранить
              </Button>
            </>
          ) : (
            <></>
          )
        }
        
        <div>
      </div>
      </main>
    </div>
  )
};
