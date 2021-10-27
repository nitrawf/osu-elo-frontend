import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id', 
        headerName: 'Avatar',
        renderCell: (params) => (
            <img src={`https://a.ppy.sh/${params.value}`} alt='Avatar not available' height="64" width="64"/>
        ),
        minWidth: 125,
    },
    {
        field: 'name', 
        headerName: 'Name',
        minWidth: 300,
        flex: 1
    }
]

export default function PlayerForm(props) {


    const [selectionModel, setSelectionModel] = useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection);
        props.parentCallback(newSelection)
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
                    rows={props.playerList} 
                    columns={columns} 
                    checkboxSelection 
                    onSelectionModelChange={handleSelectionChange} 
                    selectionModel={selectionModel}
                />
            </div>          
        </React.Fragment>
    );
}