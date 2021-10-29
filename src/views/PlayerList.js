import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, useEffect } from 'react'
import { Paper, Avatar, Typography, Grid, FormControlLabel, Switch, Box } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useStylesDatagrid } from '../assets/jss/datagridStyles'
import { useRouteMatch } from 'react-router-dom';
import _ from 'lodash';



export default function PlayerList(props) {
    const classes = useStyles();
    const datagridClasses = useStylesDatagrid();
    let match = useRouteMatch();
    const getName = (params) => {
        let id = params.row.id
        let name = params.row.name
        return {
            id: id,
            name: name
        }
    }

    const columns = [
        {
            field: 'player_rank',
            headerName: 'Rank',
            width: 125,
            type: 'number',
            valueFormatter: (params) => `# ${params.value}`,
        },
        {
            field: 'playername',
            headerName: 'Name',
            minWidth: 250,
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
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getName(cellParams1).name.localeCompare(getName(cellParams2).name),
        },
        {
            field: 'elo',
            headerName: 'Elo',
            minWidth: 125,
            flex: 0.5,
            type: 'number'
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            minWidth: 200,
            flex: 0.75,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Average Score',
            valueFormatter: (params) => `${params.value.toLocaleString()}`,
            minWidth: 200,
            flex: 0.75,
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
            field: 'maps_played',
            headerName: 'Maps',
            minWidth: 125,
            flex: 0.5,
            type: 'number'
        },
        {
            field: 'matches_played',
            headerName: 'Matches',
            minWidth: 125,
            flex: 0.5,
            type: 'number'
        },
        {
            field: 'last_played_days',
            headerName: 'Last Seen',
            minWidth: 150,
            flex: 0.75,
            type: 'number',
            valueFormatter: (params) => `${params.value} days ago`

        }
    ]

    const [stats, setStats] = useState([]);
    const [sortModel, setSortModel] = useState([
        {
            field: 'player_rank',
            sort: 'asc'
        }
    ]);
    const [showInactive, setShowInactive] = useState(false);

    const getStats = () => {
        if (showInactive) {
            fetch(`/api/player/get-all`)
            .then(resp => resp.json())
            .then(data => setStats(data))
        }
        else {
            fetch(`/api/player/get-active`)
            .then(resp => resp.json())
            .then(data => {
                for (let i = 0; i < data.length; i ++) {
                    data[i]['player_rank'] = i + 1;
                }
                setStats(data);
            })
        }
       
    }

    const handleClick = (param, event) => {
        props.history.push(`${match.url}/${param.id}`)
    }
    
    useEffect(getStats, [showInactive])

    return(
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center"  style={{ paddingBottom: 20 }}>
                            Player Leaderboards
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' flexDirection='row-reverse'>
                            <FormControlLabel 
                                control={
                                    <Switch
                                        checked={showInactive}
                                        onChange={(e) => setShowInactive(e.target.checked)}
                                        name='showInactiveSwitch'
                                        color='primary'
                                    />
                                }
                                label='Show Inactive Players'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid 
                            autoHeight 
                            rows={stats}
                            columns={columns} 
                            getRowId={(row)=> row.id}
                            sortModel={sortModel}
                            onSortModelChange={(model) => {if (!_.isEqual(model, sortModel)) { setSortModel(model); }}}
                            rowsPerPageOptions={[25]}
                            pageSize={25}
                            pagination
                            sortingOrder={['asc', 'desc']}
                            onRowClick={handleClick}
                            className={datagridClasses.root}
                        />
                    </Grid>
                </Grid>                
            </Paper>           
        </main>
    )
}