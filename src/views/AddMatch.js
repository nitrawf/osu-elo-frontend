import { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Button, Typography, Box } from '@material-ui/core';
import MatchIdForm from '../assets/components/MatchIdForm'
import PlayerForm from '../assets/components/PlayerForm';
import BeatmapForm from '../assets/components/BeatmapForm';
import { useStyles } from '../assets/jss/addMatchStyles';
import { authFetch } from '../auth'

export default function AddMatch(props) {
  const classes = useStyles();

  const steps = ['Match Details', 'Player Details', 'Map Details'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MatchIdForm handleMatchIdChange={handleMatchId} handleDefaultEloChange={handleDefaultElo} matchId={matchId} defaultElo={defaultElo}/>;
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
  const [defaultElo, setDefaultElo] = useState(1000)
  const [playerList, setPlayerList] = useState([])
  const [beatmapList, setBeatmapList] = useState([])
  const [filteredPlayerList, setFilteredPlayerList] = useState([])
  const [filteredBeatmapList, setFilteredBeatmapList] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const handleMatchId = (x) => {
    setMatchId(x)
  }

  const handleBeatmapFilter = (x) => {
    setFilteredBeatmapList(x)
  }

  const handlePlayerFilter = (x) => {
    setFilteredPlayerList(x)
  }
  
  const handleDefaultElo = (x) => {
    setDefaultElo(x)
  }

  const handleNext = () => {
    if (activeStep === 0) {
      authFetch(`/api/match/new/get-details/${matchId}`)
      .then(resp => {
        if (resp.status === 401){
          return {'error' : 'You need to authenticate to continue.'}
        }
        return resp.json()
      }
      )
      .then(data => {
        if ('error' in data) {
          console.error(data['error'])
          setErrorMsg(data['error'])
          return
        }
        setPlayerList(data['players'])
        setBeatmapList(data['beatmaps'])
        setErrorMsg('')
        setActiveStep(activeStep + 1);
      })
    }
    else if (activeStep === 1) {
      if (filteredPlayerList.length < 2) {
        setErrorMsg('Select atleast 2 players.')
      }
      else {
        setErrorMsg('')
        setActiveStep(activeStep + 1)
      }
    }
    else if (activeStep === steps.length - 1) {
      if (filteredBeatmapList.length === 0) {
        setErrorMsg('Select atleast 1 beatmap.')
      }
      else {
        setErrorMsg('')
        authFetch(`/api/match/new/process-match`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({matchId: matchId, filteredPlayerList : filteredPlayerList, filteredBeatmapList: filteredBeatmapList, defaultElo: defaultElo})
        })
        .then(resp => {
          if (resp.status === 401){
            return {'error' : 'You need to authenticate to continue.'}
          }
          return resp.json()
        })
        .then(data => {
          alert(JSON.stringify(data))
          setActiveStep(activeStep + 1);
          props.history.push(`/matches/${data.id}`)
        })
      }    
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      props.history.push('/matches')
    }
    else {
      setErrorMsg('')
      setActiveStep(activeStep - 1);
    }
   
  };

  return (
    <>
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
          {
            errorMsg !== '' &&
            <Typography color='error' align='right' variant='overline'>{errorMsg}</Typography>
          }
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Match added.
                </Typography>
                <Typography variant="subtitle1">
                  Go to match history tab to view the match.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box style={{ justifyContent: 'space-between', paddingTop: 20, display: 'flex' }}>
                  
                  <Button variant="contained" color="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}