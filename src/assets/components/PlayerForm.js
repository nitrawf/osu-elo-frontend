import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
    {
        field: 'id', 
        headerName: 'Avatar',
        renderCell: (params) => (
            <img src={`https://a.ppy.sh/${params.value}`} alt='Avatar not available' height="64" width="64"/>
        )
    },
    {
        field: 'name', 
        headerName: 'Name',
        flex: 1
    }
]

export default function PlayerForm(props) {
    const [selectionModel, setSelectionModel] = useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
        props.parentCallback(newSelection.selectionModel)
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