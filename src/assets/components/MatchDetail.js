import { useStyles } from '../jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function MatchDetail(props) {
    const classes = useStyles();

    const columns = [
        {
            field: 'playerId', 
            headerName: 'Avatar',
            renderCell: (params) => (
                <img src={`https://a.ppy.sh/${params.value}`} alt='Avatar not available' height="64" width="64"/>
            )
        },
        {
            field: 'playerName',
            headerName: 'Player Name',
            flex: 1
        },
        {
            field: 'totalScore',
            headerName: 'Total Score',
            flex: 1,
            type: 'number'
        },
        {
            field: 'averageScore',
            headerName: 'Average Score',
            flex: 1,
            type: 'number'
        },
        {
            field: 'averageAccuracy',
            headerName: 'Average Accuracy',
            valueFormatter: (params) => `${params.value * 100}%`,
            flex: 1
        },
        {
            field: 'averagePosition',
            headerName: 'Average Position',
            flex: 1,
            type: 'number'
        },       
    ]

    const [stats, setStats] = useState([]);

    const getStats = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-summary/${props.matchId}`)
        .then(resp => resp.json())
        .then(data => setStats(data))
    }
    
    useEffect(() => getStats(), [])

    const handleClick = () => {
        props.parentCallback('')
    }

    return(
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center"  style={{ paddingBottom: 20 }}>
                    Match Details
                    </Typography>
                    <DataGrid 
                        autoHeight 
                        rows={stats} 
                        columns={columns} 
                        getRowId={(row)=> row.playerId}
                    />
                    <Button onClick={handleClick} className={classes.button}>
                    Back
                    </Button>
                </Paper>
            </main>
        </Fragment>
        
    )
}