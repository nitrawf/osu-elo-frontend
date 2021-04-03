import { useStyles } from '../assets/jss/addMatchStyles';
import { useState, Fragment, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';
import { useStylesAntDesign } from '../assets/jss/antdStyles'
import { useParams } from 'react-router-dom';

export default function MatchDetail(props) {
    const classes = useStyles();
    let { matchId } = useParams();
    const antdClasses = useStylesAntDesign();
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
            width: 200,
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            width: 200,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Avg Score',
            valueFormatter: (params) => `${params.value.toFixed(2)}`,
            width: 200,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
            width: 150,
            flex: 1,
            type: 'number',
        },
        {
            field: 'average_position',
            headerName: 'Avg Position',
            width: 150,
            flex: 1,
            type: 'number'
        },
        {
            field: 'old_elo',
            headerName: 'Old ELO',
            width: 150,
            flex: 1,
            type: 'number'
        },  
        {
            field: 'new_elo',
            headerName: 'New ELO',
            width: 150,
            flex: 1,
            type: 'number'
        },
        {
            field: 'elo_change',
            headerName: 'ELO change',
            width: 150,
            flex: 1,
            renderCell: (params) => (renderEloCell(params.value))
        },    
    ]

    const [stats, setStats] = useState([]);

    const getStats = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-summary/${matchId}`)
        .then(resp => resp.json())
        .then(data => setStats(data))
    }
    
    useEffect(getStats, [])
    
    const handleClick = (param, event) => {
        props.history.push(`/players/${param.id}`)
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
                        getRowId={(row)=> row.player_id}
                        sortModel={[
                            {
                                field: 'average_score',
                                sort: 'desc'
                            }
                        ]}
                        className={antdClasses.root}
                        onRowClick={handleClick}
                        rowsPerPageOptions={[10, 25, 50]}
                        pageSize={10}
                        sortingOrder={['asc', 'desc']}
                    />
                </Paper>
            </main>
        </Fragment>
    )
}