import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    advantageCard: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      top: '50px',
      flexWrap: 'wrap',
    },
    card: {
      borderRadius: '50px',
      width: '180px',
      padding: '70px 40px 0 40px',
      margin: '50px',
      height: '270px',
      background: 'rgba(255, 255, 255, 0.85)',
      display: 'flex',
      flexDirection: 'row',
    },
    advantage: {
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '40px',
      textAlign: 'center',
      letterSpacing: '0.25px',
      color: 'rgba(0, 0, 0, 0.6)',
    },
    icon: {
      color: 'rgba(0, 0, 0, 0.6)',
      width: '70px',
      height: '70px',
      padding: '40px',
    },
  });