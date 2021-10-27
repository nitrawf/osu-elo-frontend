import { useState, Fragment, useEffect } from 'react';
import { Paper, CssBaseline, Typography, Avatar }  from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';
import { useStylesDatagrid } from '../assets/jss/datagridStyles';
import { useStyles } from '../assets/jss/addMatchStyles';
import { useParams } from 'react-router-dom';


export default function MatchDetail(props) {
    const classes = useStyles();
    let { matchId } = useParams();
    const datagridClasses = useStylesDatagrid();
    const getName = (params) => {
        let id = params.row.player_id
        let name = params.row.player_name
        return {
            id: id,
            name: name
        }
    }
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
        // Add match rank
        {
            field: 'playername',
            headerName: 'Name',
            width: 300,
            valueGetter: getName,
            renderCell: (params) => (
                <>
                    <Avatar src={`https://a.ppy.sh/${params.value.id}`} alt='Avatar not available'/> 
                    <Typography style={{paddingLeft: 10}}>
                        {params.value.name}
                    </Typography>
                </>
            ),
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getName(cellParams1).name.localeCompare(getName(cellParams2).name),
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            minWidth: 200,
            flex: 1,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Average Score',
            valueFormatter: (params) => `${params.value.toLocaleString()}`,
            minWidth: 200,
            flex: 1,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)} %`,
            minWidth: 125,
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'average_position',
            headerName: 'Avg Position',
            minWidth: 125,
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'old_elo',
            headerName: 'Old Elo',
            minWidth: 125,
            flex: 0.75,
            type: 'number'
        },  
        {
            field: 'new_elo',
            headerName: 'New Elo',
            minWidth: 125,
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'elo_change',
            headerName: 'Change',
            minWidth: 125,
            flex: 0.75,
            type: 'number',
            renderCell: (params) => (renderEloCell(params.value))
        },    
    ]

    const [stats, setStats] = useState([]);
    
    useEffect( () => {
        fetch(`/api/match/get-summary/${matchId}`)
        .then(resp => resp.json())
        .then(data => setStats(data))
    }, [matchId])
    
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
                                field: 'average_position',
                                sort: 'asc'
                            }
                        ]}
                        onRowClick={handleClick}
                        rowsPerPageOptions={[16]}
                        pageSize={16}
                        pagination
                        sortingOrder={['asc', 'desc']}
                        className={datagridClasses.root}
                    />
                </Paper>
            </main>
        </Fragment>
    )
}