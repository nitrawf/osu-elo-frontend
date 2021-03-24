import React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
    {
        field: 'avatar', 
        headerName: 'Avatar',
        renderCell: (params) => (
            <img src={params.value} alt='' height="64" width="64"/>
        )
    },
    {
        field: 'name', 
        headerName: 'Name',
        flex: 1
    },
    {
        field: 'rank',
        headerName : 'Rank',
        type: 'number'
    }
]

const kelaPlayers = [
    {
        'id' : 1,
        'name' : 'banana',
        'rank' : 1000,
        'avatar' : 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg'
    },
    {
        'id' : 2,
        'name' : 'akela',
        'rank' : 727,
        'avatar' : 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        'id' : 3,
        'name' : 'somebloodood',
        'rank' : 420,
        'avatar' : 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg'
    }
]

export default function PlayerForm() {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    }
    

    return (
        <React.Fragment>
            <div style={{ paddingBottom: 20 }}>
                <Typography variant="h6" gutterBottom>
                Player Selection
                </Typography>
                <DataGrid 
                    autoHeight 
                    rowHeight={64} 
                    rows={kelaPlayers} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                    onSelectionModelChange={handleSelectionChange} 
                    selectionModel={selectionModel}
                />
            </div>          
        </React.Fragment>
    );
}