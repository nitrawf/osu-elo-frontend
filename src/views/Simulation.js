import { useState } from "react";
import { useStyles } from "../assets/jss/addMatchStyles";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';


export default function Simulation() {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        'p1Elo' : '',
        'p2Elo' : '',
        'p1Wins' : '',
        'p2Wins' : ''
    })

    const [p1Change, setP1Change] = useState();
    const [p2Change, setP2Change] = useState();
    const [p1Elo, setP1Elo] = useState();
    const [p2Elo, setP2Elo] = useState();

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleClick = async () => {
        let resp = await fetch(`/api/simulate/elo?` + new URLSearchParams(formData));
        let data = await resp.json();

        setP1Change(data['p1Change']);
        setP2Change(data['p2Change']);
        setP1Elo(parseInt(data['p1Change']) + parseInt(formData['p1Elo']))
        setP2Elo(parseInt(data['p2Change']) + parseInt(formData['p2Elo']))

    }

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: 20 }}>
                        Simulate ELO
                    </Typography>
                    <Grid container spacing={3} justify="center" style={{ paddingTop: 20}}>
                        <Grid item sm={3} style={{ paddingRight: 20}}>
                            <Grid container spacing={3}>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        id="p1Elo"
                                        name="p1Elo"
                                        label="Player 1 ELO"
                                        variant="outlined"
                                        value={formData['p1Elo']}
                                        onChange={handleChange}
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        id="p1Wins"
                                        name="p1Wins"
                                        label="Player 1 Wins"
                                        variant="outlined"
                                        value={formData['p1Wins']}
                                        onChange={handleChange}
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item sm={3} style={{ paddingLeft: 20}}>
                            <Grid container spacing={3}>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        id="p2Elo"
                                        name="p2Elo"
                                        label="Player 2 ELO"
                                        variant="outlined"
                                        value={formData['p2Elo']}
                                        onChange={handleChange}
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        required
                                        id="p2Wins"
                                        name="p2Wins"
                                        label="Player 2 Wins"
                                        variant="outlined"
                                        value={formData['p2Wins']}
                                        onChange={handleChange}
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
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
                                Simulate
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        p1Change &&
                        <Grid container spacing={3} justify="center" style={{ marginTop: 40}}>
                            <Grid item sm={3}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Player 1
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                        New ELO: {p1Elo}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                        Change: {parseInt(p1Change)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item sm={3}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Player 2
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                        New ELO: {p2Elo}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                        Change: {parseInt(p2Change)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    }
                    
                </Paper>
            </main>
        </>
    )

}