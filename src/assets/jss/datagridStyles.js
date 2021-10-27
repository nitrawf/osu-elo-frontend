import { makeStyles } from '@material-ui/core/styles';

const useStylesDatagrid = makeStyles((theme) => ({
    root: {
      '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.primary.main,
      },
    }
  }));

export { useStylesDatagrid };