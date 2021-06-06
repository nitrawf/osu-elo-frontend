import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import { Paper, Avatar, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useStylesAntDesign } from '../assets/jss/antdStyles'
import { useRouteMatch } from 'react-router-dom';



export default function PlayerList(props) {
    const classes = useStyles();
    const antdClasses = useStylesAntDesign();
    let match = useRouteMatch();
    const getName = (params) => {
        let id = params.getValue('id')
        let name = params.getValue('name')
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
            valueFormatter: (params) => `# ${params.value}`,
        },
        {
            field: 'playername',
            headerName: 'Name',
            width: 353,
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
            headerName: 'ELO',
            width: 200,
            type: 'number'
        },
        {
            field: 'total_score',
            headerName: 'Total Score',
            width: 200,
            type: 'number'
        },
        {
            field: 'average_score',
            headerName: 'Average Score',
            valueFormatter: (params) => `${params.value.toFixed(2)}`,
            width: 200,
            type: 'number'
        },
        {
            field: 'average_accuracy',
            headerName: 'Accuracy',
            valueFormatter: (params) => `${(params.value * 100).toFixed(2)} %`,
            width: 200,
            type: 'number'
        },
        {
            field: 'maps_played',
            headerName: 'Maps Played',
            width: 200,
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
                <Paper className={classes.paper} minWidth={1920}>
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
                                field: 'elo',
                                sort: 'desc'
                            }
                        ]}
                        className={antdClasses.root}
                        rowsPerPageOptions={[10, 25, 50]}
                        pageSize={25}
                        sortingOrder={['asc', 'desc']}
                        onRowClick={handleClick}
                    />
                </Paper>           
            </main>
        </Fragment>
    )
}