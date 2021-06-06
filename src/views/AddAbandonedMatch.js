import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useStyles } from '../assets/jss/addMatchStyles';
import { authFetch } from '../auth';




export default function AddAbandonedMatch(props) {
    const [formData, setFormData] = useState({
        'winnerId': '',
        'loserId': '',
        'numMaps': '',
        'matchName': ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [snackbarMsg, setSnackbarMsg] = useState('');


    const classes = useStyles();

    const handleClick = async () => {
        let resp = await authFetch(`/api/match/new/abandoned`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        let data = await resp.json();
        await props.history.push(`matches/${data['id']}`);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validatePlayer1 = () => {
        validatePlayer(formData["winnerId"]);
    }

    const validatePlayer2 = () => {
        validatePlayer(formData["loserId"]);
    }

    function validatePlayer(playerId) {
        fetch(`/api/player/${playerId}/validate`)
        .then(resp => resp.json())
        .then(data => {
            if ('error' in data) {
                setSeverity('error');
                setSnackbarMsg('Player Validation Failed');
                
            }
            else {
                setSeverity('success');
                setSnackbarMsg(`Player Validated: ${data['name']}`);
            }
            setSnackbarOpen(true);
        })
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return(
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: 20 }}>
                       Add Abandoned Match
                    </Typography>
                    <Grid container spacing={3} justify="center" style={{ paddingTop: 20}}>
                        <Grid item sm={5}>
                            <TextField
                                required
                                id="winnerId"
                                name="winnerId"
                                label="Winner Id"
                                variant="outlined"
                                value={formData['winnerId']}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={1} style={{ paddingTop: 26 }}>
                            <Button
                                color="primary"
                                onClick={validatePlayer1}
                            >
                                Validate
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center">
                        <Grid item sm={5}>
                            <TextField
                                required
                                id="loserId"
                                name="loserId"
                                label="Loser Id"
                                variant="outlined"
                                value={formData['loserId']}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={1} style={{ paddingTop: 26 }}>
                            <Button
                                color="primary"
                                onClick={validatePlayer2}
                            >
                                Validate
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center">
                        <Grid item sm={6}>
                            <TextField
                                required
                                id="numMaps"
                                name="numMaps"
                                label="Number of Maps"
                                variant="outlined"
                                value={formData['numMaps']}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center">
                        <Grid item sm={6}>
                            <TextField
                                required
                                id="matchName"
                                name="matchName"
                                label="Match Name"
                                variant="outlined"
                                value={formData['matchName']}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center" style={{ marginTop: 40}}>
                        <Grid item sm={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            fullWidth
                        >
                            Add
                        </Button>
                        </Grid>
                    </Grid>
                    
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={severity}>
                            {snackbarMsg}
                        </Alert>
                    </Snackbar>
                
                </Paper>
            </main>
        </>
    )


}