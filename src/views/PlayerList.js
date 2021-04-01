import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';


export default function PlayerList() {
    const classes = useStyles();

    const columns = [
        {
            field: 'id', 
            headerName: 'Avatar',
            renderCell: (params) => (
                <img src={`https://a.ppy.sh/${params.value}`} alt='Avatar not available' height="52" width="52"/>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'elo',
            headerName: 'ELO',
            width: 150,
            type: 'number'
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            width: 150,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Average Score',
            width: 150,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Average Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
            width: 150
        },
        {
            field: 'maps_played',
            headerName: 'Maps Played',
            width: 150,
            type: 'number'
        },
        {
            field: 'matches_played',
            headerName: 'Matches Played',
            width: 200,
            type: 'number'
        }
    ]

    const [stats, setStats] = useState([]);

    const getStats = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/player/get-all`)
        .then(resp => resp.json())
        .then(data => setStats(data))
    }
    
    useEffect(getStats, [])

    return(
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center"  style={{ paddingBottom: 20 }}>
                    Player Leaderboards
                    </Typography>
                    <DataGrid 
                        autoHeight 
                        rows={stats} 
                        columns={columns} 
                        getRowId={(row)=> row.id}
                        sortModel={[
                            {
                                field: 'elo',
                                sort: 'desc'
                            }
                        ]}
                    />
                </Paper>
            </main>
        </Fragment>
    )
}