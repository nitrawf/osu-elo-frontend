import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import { Paper, Avatar, Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useStylesDatagrid } from '../assets/jss/datagridStyles'
import { useRouteMatch } from 'react-router-dom';



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

    const getStats = () => {
        fetch(`/api/player/get-all`)
        .then(resp => resp.json())
        .then(data => {
            setStats(data)})
    }

    const handleClick = (param, event) => {
        props.history.push(`${match.url}/${param.id}`)
    }
    
    useEffect(getStats, [])

    return(
        <Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center"  style={{ paddingBottom: 20 }}>
                        Player Leaderboards
                    </Typography>
                    <DataGrid 
                        autoHeight 
                        rows={stats}
                        columns={columns} 
                        getRowId={(row)=> row.id}
                        sortModel={[
                            {
                                field: 'player_rank',
                                sort: 'asc'
                            }
                        ]}
                        rowsPerPageOptions={[10, 25, 50]}
                        pageSize={25}
                        sortingOrder={['asc', 'desc']}
                        onRowClick={handleClick}
                        className={datagridClasses.root}
                    />
                </Paper>           
            </main>
        </Fragment>
    )
}