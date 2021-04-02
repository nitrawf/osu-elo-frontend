import Stat from '../assets/components/Stat'
import {
    Box,
    Grid,
    Paper,
    CssBaseline,
  } from '@material-ui/core';
import { useStyles } from '../assets/jss/addMatchStyles'
import { Fragment, useEffect, useState } from 'react';
import EloGraph from '../assets/components/EloGraph'
import PlayerHistoryTable from '../assets/components/PlayerHistoryTable'
import { useParams } from 'react-router-dom';




export default function PlayerDetail(props) {
    const classes = useStyles();
    const { playerId } = useParams();
    const [playerStats, setPlayerStats] = useState({})
    const [playerHistory, setPlayerHistory] = useState([])
    const [gridItems, setGridItems] = useState([])
    
    const getPlayerSummary = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/player/${playerId}/summary`)
      .then(resp => resp.json())
      .then(data => setPlayerStats(data))
    }

    const getPlayerHistory = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/player/${playerId}/elo-history`)
      .then(resp => resp.json())
      .then(data => setPlayerHistory(data))
    }

    useEffect(() => {
      getPlayerSummary();
      getPlayerHistory();

    }, [])

    useEffect(() => {
      let grid = []
      for (let key in playerStats) {
        grid.push(
        <Grid item sm={4} key={key}>
          <Stat label={key} value={playerStats[key]}  />
        </Grid>
        )
      }
      setGridItems(grid.map((x) => x))
    }, [playerStats])
    
    return (
    <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xl={3} xs={12}>
                    <Box>
                        <img src={`https://a.ppy.sh/${playerId}`}/>
                    </Box>
                </Grid>
                <Grid item xl={9} xs={12}>
                  <Box
                    sx={{
                        minHeight: '100%',
                        py: 3
                    }}
                    >
                    <Grid container spacing={3}>
                      { gridItems } 
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box style= {{ paddingTop: 20 }}>
                    <EloGraph history={playerHistory}/>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box style= {{ paddingTop: 20 }}>
                    <PlayerHistoryTable data={playerHistory} history={props.history} />
                  </Box>
                </Grid>
            </Grid>
        </Paper>
      </main>   
    </Fragment>
    
    )
    
}