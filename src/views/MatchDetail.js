import { useState, Fragment, useEffect } from 'react';
import { Paper, CssBaseline, Typography, Avatar}  from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';
import { useStylesAntDesign } from '../assets/jss/antdStyles';
import { useStyles } from '../assets/jss/addMatchStyles';
import { useParams } from 'react-router-dom';


export default function MatchDetail(props) {
    const classes = useStyles();
    let { matchId } = useParams();
    const antdClasses = useStylesAntDesign();
    const getName = (params) => {
        let id = params.getValue('id')
        let name = params.getValue('player_name')
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
        {
            field: 'playername',
            headerName: 'Name',
            width: 428,
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
            width: 200,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Avg Score',
            valueFormatter: (params) => Math.round(params.value).toLocaleString(),
            width: 200,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
            width: 200,
            type: 'number',
        },
        {
            field: 'average_position',
            headerName: 'Avg Position',
            width: 200,
            type: 'number'
        },
        {
            field: 'old_elo',
            headerName: 'Old ELO',
            width: 150,
            type: 'number'
        },  
        {
            field: 'new_elo',
            headerName: 'New ELO',
            width: 150,
            type: 'number'
        },
        {
            field: 'elo_change',
            headerName: 'Change',
            width: 150,
            type: 'number',
            renderCell: (params) => (renderEloCell(params.value))
        },    
    ]

    const [stats, setStats] = useState([]);
    
    useEffect( () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-summary/${matchId}`)
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