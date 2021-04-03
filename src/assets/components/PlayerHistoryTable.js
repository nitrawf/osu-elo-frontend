import { useStylesAntDesign } from '../jss/antdStyles'
import { DataGrid } from '@material-ui/data-grid';
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
        width: 125,
    },
    {
        field: 'name',
        headerName: 'Match Name',
        width: 500,
    },
    {
        field: 'start_time',
        type: 'date',
        headerName: 'Start Time',
        valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
        width: 200,
        flex: 1
    },
    
    {
        field: 'end_time',
        type: 'dateTime',
        headerName: 'End Time',
        valueFormatter: (params) => `${params.value.replace('T', ' | ')}`,
        width: 200,
        flex: 1
    },
    {
        field: 'elo_change',
        header: 'Elo Change',
        width: 200,
        flex: 1,
        renderCell: (params) => (renderEloCell(params.value))
    }
  ]

export default function PlayerHistoryTable(props) {
    const antdClasses = useStylesAntDesign();
    
    const handleClick = (param, event) => {
        props.history.push(`/matches/${param.id}`);
    }
    const matches = props.data

    return (
        <DataGrid 
            autoHeight
            rows={matches} 
            columns={columns} 
            rowsPerPageOptions={[5, 10, 25]}
            pageSize={5}
            sortingOrder={['asc', 'desc']}
            sortModel={[
                {
                    field: 'start_time',
                    sort: 'desc'
                }
            ]}
            onRowClick={handleClick}
            className={antdClasses.root}
        />
    )
}