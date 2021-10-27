import { useStylesDatagrid } from '../jss/datagridStyles'
import { DataGrid } from '@mui/x-data-grid';
import { Fragment } from 'react'
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TrendingDownRoundedIcon from '@material-ui/icons/TrendingDownRounded';

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
        field: 'id',
        headerName: 'Match Id',
        width: 150,
    },
    {
        field: 'name',
        headerName: 'Match Name',
        minwidth: 300,
        flex: 2
    },
    {
        field: 'start_time',
        type: 'date',
        headerName: 'Start Time',
        valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
        minWidth: 300,
        flex: 1
    },
    
    {
        field: 'end_time',
        type: 'dateTime',
        headerName: 'End Time',
        valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
        minWidth: 300,
        flex: 1
    },
    {
        field: 'elo_change',
        header: 'Elo Change',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (renderEloCell(params.value))
    }
  ]

export default function PlayerHistoryTable(props) {
    const datagridClasses = useStylesDatagrid();
    
    const handleClick = (param, event) => {
        props.history.push(`/matches/${param.id}`);
    }
    const matches = props.data

    return (
        <DataGrid 
            autoHeight
            rows={matches} 
            columns={columns} 
            rowsPerPageOptions={[5]}
            pageSize={5}
            pagination
            sortingOrder={['asc', 'desc']}
            sortModel={[
                {
                    field: 'start_time',
                    sort: 'desc'
                }
            ]}
            onRowClick={handleClick}
            className={datagridClasses.root}
        />
    )
}