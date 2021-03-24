import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function MatchIdForm(props) {

  const [matchId, setMatchId] = useState(props.matchId)

  const handleMatchIdChange = (e) => {
    setMatchId(e.target.value)
    props.parentCallback(e.target.value)
  }

  return (
    <React.Fragment>
      <div style={{ paddingBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Match Id
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="matchId"
              name="matchId"
              label="Match Id"
              variant="outlined"
              value={matchId}
              fullWidth
              onChange={handleMatchIdChange}
            />
          </Grid>
        </Grid>
      </div>     
    </React.Fragment >
  );
}