import { useStyles } from '../jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';

export default function MatchHistory(props) {
    const classes = useStyles();

    const columns = [
        {
            field: 'id',
            headerName: 'Match Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Match Name',
            flex: 1
        },
        {
            field: 'start_time',
            headerName: 'Start Time',
            valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
            flex: 1
        },
        
        {
            field: 'end_time',
            headerName: 'End Time',
            valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
            flex: 1
        }
    ]

    const [matches, setMatches] = useState([]);

    const getMatches = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-all`)
        .then(resp => resp.json())
        .then(data => setMatches(data))
    }
    
    useEffect(() => getMatches(), [])

    const handleClick = (param, event) => {
        props.parentCallback(param.id)
    }
    
    return(
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: 20 }}>
                       Match History
                    </Typography>
                    <DataGrid 
                        autoHeight 
                        rows={matches} 
                        columns={columns} 
                        pageSize={8}
                        onRowClick={handleClick}
                    />
                </Paper>
            </main>
        </Fragment>
        
    )
}