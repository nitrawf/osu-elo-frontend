import { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Link }  from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';
import { useStylesDatagrid } from '../assets/jss/datagridStyles';
import { useStyles } from '../assets/jss/addMatchStyles';
import { useParams } from 'react-router-dom';
import _ from 'lodash';


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
    const renderEloCell = (value) => (
        value > 0 ? 
        <> <TrendingUpRoundedIcon color='primary'/>&nbsp;&nbsp;{value} </>     
        :
        <> <TrendingDownRoundedIcon color='error'/>&nbsp;&nbsp;{value} </>
    )

    const columns = [
        {
            field: 'rank',
            headerName: 'Rank',
            width: 125,
            valueFormatter: (params) => `# ${params.value}`,
            type: 'number'
        },
        {
            field: 'playername',
            headerName: 'Name',
            minWidth: 300,
            flex: 1,
            valueGetter: getName,
            renderCell: (params) => (
                <>
                    <Avatar src={`https://a.ppy.sh/${params.value.id}`} alt='Avatar not available'/> 
                    <Typography style={{paddingLeft: 10}}>
                        {params.value.name}
                    </Typography>
                </>
            ),
            sortComparator: (v1, v2, param1, param2) =>
            param1.api.getCellValue(param1.id, 'player_name') - param2.api.getCellValue(param2.id, 'player_name'),
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
        .then(data => {
            data.sort((a, b) => parseFloat(a['average_position']) - parseFloat(b['average_position']));
            for (let i = 0; i < data.length; i ++) {
                data[i]['rank'] = i + 1
            }
            setStats(data);
        })
    }, [matchId])
    
    const handleClick = (param, event) => {
        props.history.push(`/players/${param.id}`)
    }

    const [sortModel, setSortModel] = useState([
        {
            field: 'rank',
            sort: 'asc'
        }
    ])

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center"  style={{ paddingBottom: 20 }}>
                    { 
                        stats.length > 0 && 
                        <Link href={`https://osu.ppy.sh/community/matches/${matchId}`} target="_blank" color="inherit">
                            {stats[0]['match_name']}
                        </Link>          
                    }
                </Typography>
                <DataGrid 
                    autoHeight 
                    rows={stats} 
                    columns={columns} 
                    getRowId={(row)=> row.player_id}
                    sortModel={sortModel}
                    onSortModelChange={(model) => {if (!_.isEqual(model, sortModel)) { setSortModel(model); }}}
                    onRowClick={handleClick}
                    rowsPerPageOptions={[16]}
                    pageSize={16}
                    pagination
                    sortingOrder={['asc', 'desc']}
                    className={datagridClasses.root}
                />
            </Paper>
        </main>
    )
}