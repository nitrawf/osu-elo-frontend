import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
      [theme.breakpoints.up('xl')]: {
        width: 1920 * 0.9
      }
    },
    paper: {
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export { useStyles }

