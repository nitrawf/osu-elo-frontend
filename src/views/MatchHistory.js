import { useStyles } from '../assets/jss/addMatchStyles'
import { useState, Fragment, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useRouteMatch } from 'react-router-dom';
import { authFetch, useAuth } from '../auth';
import { useStylesAntDesign } from '../assets/jss/antdStyles'

export default function MatchHistory(props) {
    const classes = useStyles();
    const antdClasses = useStylesAntDesign();
    let logged = useAuth()[0];
    let match = useRouteMatch();
    const columns = [
        {
            field: 'id',
            headerName: 'Match Id',
            width: 125
        },
        {
            field: 'name',
            headerName: 'Match Name',
            width: 500
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
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [update, setUpdate] = useState(0);

    const getMatches = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/match/get-all`)
        .then(resp => resp.json())
        .then(data => setMatches(data))
    }
    
    useEffect(() => getMatches(), [update])

    const handleClick = (param, event) => {
        props.history.push(`${match.url}/${param.id}`);
    }

    const handleAdd = (e) => {
        props.history.push(`${match.url}/new`)
    }

    const handleSelectionChange = (newSelection) => {
        setSelectedMatches(newSelection.selectionModel);
        if(newSelection.selectionModel.length > 0) {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true);
        }
    }
    
    const handleDelete = () => {
        authFetch(`${process.env.REACT_APP_API_URL}/api/match/delete/`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'matchIds' : selectedMatches})
        })
        .then(resp => resp.json())
        .then(data => alert(JSON.stringify(data)))
        .then(setTimeout(() => setUpdate(update + 1), 2000))
    }
    
    const [btnDisabled, setBtnDisabled] = useState(true)
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
                        checkboxSelection={logged}
                        rows={matches} 
                        columns={columns} 
                        pageSize={8}
                        sortModel={[
                            {
                                field: 'start_time',
                                sort: 'desc'
                            }
                        ]}
                        onRowClick={handleClick}
                        onSelectionModelChange={handleSelectionChange}
                        selectionModel={selectedMatches}
                        className={antdClasses.root}
                    />
                    
                    {
                        logged &&
                        <Fragment>
                        {/* <Box style={{ paddingTop: 20 }}>
                            
                        </Box> */}
                            <Box style={{ justifyContent: 'space-between', paddingTop: 20, display: 'flex' }}>
                                <Button variant='contained' color="primary" onClick={handleAdd}> New Match </Button>
                                <Button 
                                variant='contained' 
                                color="secondary" 
                                disabled={btnDisabled} 
                                onClick={handleDelete}> 
                                    Delete {selectedMatches.length === 0 ? '' : `Selected ${selectedMatches.length}`} 
                                </Button>
                            </Box>
                        </Fragment>
                        
                    }
                </Paper>
            </main>
        </Fragment>
        
    )
}