import { makeStyles } from '@material-ui/core/styles';

const useStylesAntDesign = makeStyles((theme) => ({
    root: {

      '& .MuiDataGrid-root .MuiDataGrid-cell--textRight' : {
        textAlign: 'center'
      },
      '& .MuiDataGrid-colCellTitleContainer' : {
        justifyContent: 'center',
        paddingLeft: 26
      },
      '& .MuiDataGrid-colCellCenter .MuiDataGrid-colCellTitleContainer' : {
        paddingLeft: 0,
        paddingRight: 0
      },   
    },
  }));

export { useStylesAntDesign };