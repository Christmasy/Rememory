import { makeStyles } from "@material-ui/core";

export const mainPageStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "blue"
    },
  
    mainArea: {
      padding: theme.spacing(0),
      textAlign: "center",
      color: theme.palette.text.primary,
      background: "aqua",
      height: "100%",
      border: "5px solid brown"
    }
}));