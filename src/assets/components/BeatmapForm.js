import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'bg',
        headerName: 'Background',
        renderCell: (params) => (
            <img src={params.value} alt='Background not available' height="75" width="120" />
        ),
        width: 175
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        minWidth: 400
    },
    {
        field: 'artist',
        headerName: 'Artist',
        flex: 1,
        minWidth: 200
    },
    {
        field: 'version',
        headerName: 'Difficulty',
        flex: 1,
        minWidth: 300
    }
]

export default function BeatmapForm(props) {
    const [selectionModel, setSelectionModel] = useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection);
        props.parentCallback(newSelection);
    }

    return (
        <div style={{ paddingBottom: 20 }}>
            <Typography variant="h6" gutterBottom>
                Player Selection
            </Typography>
            <DataGrid
                autoHeight
                rowHeight={75}
                rows={props.beatmapList}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={handleSelectionChange}
                selectionModel={selectionModel}
            />
        </div>
    );
}