import { Fragment, useEffect, useState } from 'react';
import { Box, Grid, Paper, CssBaseline, Table, TableBody, TableCell, TableContainer, TableRow, Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import EloGraph from '../assets/components/EloGraph'
import PlayerHistoryTable from '../assets/components/PlayerHistoryTable'
import Stat from '../assets/components/Stat'
import { useStyles } from '../assets/jss/addMatchStyles'



function formatData(data) {
  let tableData = [];
  tableData.push({name : 'Accuracy', value : (data['average_accuracy'] * 100).toFixed(2) + ' %'});
  tableData.push({name : 'Average Score', value : data['average_score'].toLocaleString()});
  tableData.push({name : 'Total Score', value : data['total_score'].toLocaleString()});
  tableData.push({name : 'Maps Played', value : data['maps_played']});
  tableData.push({name : 'Matches Played', value : data['matches_played']});
  return tableData;
}


export default function PlayerDetail(props) {
    const classes = useStyles();
    const { playerId } = useParams();
    const [playerStats, setPlayerStats] = useState({})
    const [playerHistory, setPlayerHistory] = useState([])
    const [playerData, setPlayerData] = useState([])
    
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/player/${playerId}/summary`)
      .then(resp => resp.json())
      .then(data => {
        setPlayerStats(data);
        setPlayerData(formatData(data));
      })
      
      fetch(`${process.env.REACT_APP_API_URL}/api/player/${playerId}/elo-history`)
      .then(resp => resp.json())
      .then(data => setPlayerHistory(data))
    }, [playerId])

    
    return (
    <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={3} alignItems="center" justify="space-between">
              <Grid item lg={4} md={6} xs={12}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item sm={7} xs={12} >
                    <img 
                      src={`https://a.ppy.sh/${playerStats['id']}`} 
                      style={{margin: 'auto', width: '100%'}}
                      alt="Unavailable"
                    />
                  </Grid>
                  
                  <Grid item sm={5} xs={12} container spacing={2} direction="column" justify="flex-end" alignItems="stretch">
                      <Grid item>
                        <Stat label="Rank" value={playerStats['player_rank']}/>
                      </Grid>
                      <Grid item>
                        <Stat label="ELO" value={playerStats['elo']} />
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="Stats Table">
                    <TableBody>
                      { playerData.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">{row.name}</TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Divider style={{marginTop : 25}}/>
            <Grid container alignItems="center">
              <Grid item xs={12} style= {{ marginTop: 25}}>
                <Box >
                  <EloGraph history={playerHistory}/>
                </Box>
              </Grid>
            </Grid>
            <Divider style={{marginTop : 25}}/>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Box style= {{ marginTop: 25 }}>
                  <PlayerHistoryTable data={playerHistory} history={props.history} />
                </Box>
              </Grid>
            </Grid>
        </Paper>
      </main>   
    </Fragment>
    
    )
    
}