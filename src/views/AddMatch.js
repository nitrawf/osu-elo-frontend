import React, { useState } from 'react';
import { useStyles } from '../assets/jss/addMatchStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MatchIdForm from '../assets/components/MatchIdForm'
import PlayerForm from '../assets/components/PlayerForm';
import BeatmapForm from '../assets/components/BeatmapForm';

export default function AddMatch() {
  const classes = useStyles();

  const steps = ['Match Details', 'Player Details', 'Map Details'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MatchIdForm parentCallback={handleMatchId} matchId={matchId}/>;
      case 1:
        return <PlayerForm playerList={playerList} parentCallback={handlePlayerFilter}/>;
      case 2:
        return <BeatmapForm beatmapList={beatmapList} parentCallback={handleBeatmapFilter}/>
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = useState(0)
  const [matchId, setMatchId] = useState('')
  const [playerList, setPlayerList] = useState([])
  const [beatmapList, setBeatmapList] = useState([])
  const [filteredPlayerList, setFilteredPlayerList] = useState([])
  const [filteredBeatmapList, setFilteredBeatmapList] = useState([])

  const handleMatchId = (x) => {
    setMatchId(x)
  }

  const handleBeatmapFilter = (x) => {
    setFilteredBeatmapList(x)
  }

  const handlePlayerFilter = (x) => {
    setFilteredPlayerList(x)
  }

  const handleNext = () => {
    if (activeStep === 0) {
      fetch(`/api/match/new/get-details/${matchId}`)
      .then(resp => resp.json())
      .then(data => {
        setPlayerList(data['players'])
        setBeatmapList(data['beatmaps'])
      })
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            osu!India
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Add Match
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}