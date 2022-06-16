import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function MatchIdForm(props) {

    const [matchId, setMatchId] = useState(props.matchId)
    const [defaultElo, setDefaultElo] = useState(props.defaultElo)

    const handleMatchIdChange = (e) => {
        setMatchId(e.target.value)
        props.handleMatchIdChange(e.target.value)
    }

    const handleDefaultEloChange = (e) => {
        setDefaultElo(e.target.value)
        props.handleDefaultEloChange(e.target.value)
    }

    return (
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
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="default-elo-input-label">Initial ELO</InputLabel>
                        <Select
                            labelId="default-elo-select-label-id"
                            id="default-elo-select-id"
                            value={defaultElo}
                            onChange={handleDefaultEloChange}
                            label="Initial ELO"
                        >
                            <MenuItem value={1300}>Match 1 | 1300</MenuItem>
                            <MenuItem value={1200}>Match 2 | 1200</MenuItem>
                            <MenuItem value={1100}>Match 3 | 1100</MenuItem>
                            <MenuItem value={1000}>Match 4 | 1000</MenuItem>
                            <MenuItem value={850}>T2 | 850</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}