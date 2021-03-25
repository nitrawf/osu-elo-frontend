import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';



const columns = [
    {
      field: 'bg',
      headerName: 'Background',
      renderCell: (params) => (
        <img src={params.value} alt='Background not available' height="75" width="120"/>
      ),
      width: 120
    },
    {
      field: 'title', 
      headerName: 'Title',
      flex: 1
    },
    {
      field: 'artist', 
      headerName: 'Artist',
      flex: 1
    },
    {
      field: 'version',
      headerName: 'Difficulty',
      flex: 1
    }

]

export default function BeatmapForm(props) {
    const [selectionModel, setSelectionModel] = useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
        props.parentCallback(newSelection.selectionModel);
    }

    return (
        <React.Fragment>
            <div style={{ paddingBottom: 20 }}>
                <Typography variant="h6" gutterBottom>
                Player Selection
                </Typography>
                <DataGrid 
                    autoHeight 
                    rowHeight={75} 
                    rows={props.beatmapList} 
                    columns={columns} 
                    pageSize={8} 
                    checkboxSelection 
                    onSelectionModelChange={handleSelectionChange} 
                    selectionModel={selectionModel}
                />
            </div>          
        </React.Fragment>
    );
}