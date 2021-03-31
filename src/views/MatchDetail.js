import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';

import { Link, useParams } from 'react-router-dom';

export default function MatchDetail() {
    const classes = useStyles();
    let { matchId } = useParams();

    const renderEloCell = (value) => {
        if (value > 0) {
            return (
                <Fragment>
                    <TrendingUpRoundedIcon color='primary'/>&nbsp;&nbsp;{value}
                </Fragment>     
            )
        }
        else {
            return (
                <Fragment>
                    <TrendingDownRoundedIcon color='error'/>&nbsp;&nbsp;{value}
                </Fragment>
            )
        }
    }

    const columns = [
        {
            field: 'player_id', 
            headerName: 'Avatar',
            renderCell: (params) => (
                <img src={`https://a.ppy.sh/${params.value}`} alt='Avatar not available' height="52" width="52"/>
            )
        },
        {
            field: 'player_name',
            headerName: 'Player Name',
            flex: 1
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Avg Score',
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
            flex: 0.5
        },
        {
            field: 'average_position',
            headerName: 'Avg Position',
            flex: 0.5,
            type: 'number'
        },
        {
            field: 'elo_change',
            headerName: 'ELO change',
            flex: 0.5,
            type: 'number',
            renderCell: (params) => (renderEloCell(params.value))
        },
        {
            field: 'elo',
            headerName: 'New ELO',
            flex: 0.75,
            type: 'number'
        } 
    ]

    const [stats, setStats] = useState([]);

    const getStats = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-summary/${matchId}`)
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
                    Match Details
                    </Typography>
                    <DataGrid 
                        autoHeight 
                        rows={stats} 
                        columns={columns} 
                        getRowId={(row)=> row.player_id}
                        sortModel={[
                            {
                                field: 'average_score',
                                sort: 'desc'
                            }
                        ]}
                    />
                    <Link to='/matches' className={classes.buttons} style={{ paddingTop: 20}}>
                        <Button color="primary">
                        Back
                        </Button>
                    </Link>
                </Paper>
            </main>
        </Fragment>
    )
}