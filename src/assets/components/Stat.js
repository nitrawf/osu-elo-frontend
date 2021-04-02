import {
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';

  
  const Stat = (props) => (
    <Card
      sx={{ height: '100%' }}
    >
        <CardContent>
            <Grid style={{ justifyContent: 'center', alignContent: 'center' }}item>
            <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
            >
                {props.label}
            </Typography>
            <Typography
                color="textPrimary"
                variant="h3"
            >
                {props.value}
            </Typography>
            </Grid>
        </CardContent>
    </Card>
  );
  
  export default Stat;