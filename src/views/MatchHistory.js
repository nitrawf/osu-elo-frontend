import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useRouteMatch } from 'react-router-dom';
import { useStylesDatagrid } from '../assets/jss/datagridStyles';
import { useAuth } from '../auth';

export default function MatchHistory(props) {
    const classes = useStyles();
    const datagridClasses = useStylesDatagrid()
    let logged = useAuth()[0];
    let match = useRouteMatch();
    const columns = [
        {
            field: 'id',
            headerName: 'Match Id',
            width: 150
        },
        {
            field: 'name',
            headerName: 'Match Name',
            minWidth: 400,
            flex: 2     
        },
        {
            field: 'start_time',
            headerName: 'Start Time',
            valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
            minWidth: 300,
            flex: 1
        },        
        {
            field: 'end_time',
            headerName: 'End Time',
            valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
            minWidth: 300,
            flex: 1
        }
    ]

    const [matches, setMatches] = useState([]);

    const getMatches = () => {
        fetch(`/api/match/get-all`)
        .then(resp => resp.json())
        .then(data => setMatches(data))
    }
    
    useEffect(() => getMatches(), [])

    const handleClick = (param, event) => {
        props.history.push(`${match.url}/${param.id}`);
    }

    const handleAdd = (e) => {
        props.history.push(`${match.url}/new`)
    }

    const handleAbandonedAdd = (e) => {
        props.history.push(`${match.url}/abandoned`)
    }


    return(
        <Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: 20 }}>
                       Match History
                    </Typography>
                    <DataGrid 
                        autoHeight
                        rows={matches} 
                        columns={columns} 
                        sortModel={[
                            {
                                field: 'id',
                                sort: 'desc'
                            }
                        ]}
                        onRowClick={handleClick}
                        rowsPerPageOptions={[25]}
                        pageSize={25}
                        sortingOrder={['asc', 'desc']}
                        className={datagridClasses.root}
                    />
                    
                    {
                        logged &&
                        <Fragment>
                            <Box style={{ justifyContent: 'space-between', paddingTop: 20, display: 'flex' }}>
                                <Button variant='contained' color="primary" onClick={handleAdd}> New Match </Button>
                                <Button 
                                variant='contained' 
                                color="secondary"
                                onClick={handleAbandonedAdd}
                                > 
                                    New Abandoned Match
                                </Button>
                            </Box>
                        </Fragment>
                        
                    }
                </Paper>
            </main>
        </Fragment>
        
    )
}