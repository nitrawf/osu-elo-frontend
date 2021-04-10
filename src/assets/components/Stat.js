import {
    Card,
    CardContent,
    Grid,
    Typography,
    Divider
  } from '@material-ui/core';

  
  const Stat = (props) => (
    <Card variant="outlined">
        <CardContent>
            <Grid style={{ justifyContent: 'center', alignContent: 'center' }} item>
            <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
            >
                {props.label}
            </Typography>
            <Divider/>
            <Typography
                color="textPrimary"
                variant="h3"
                style={{paddingTop : 5}}
            >
                {props.value ? props.value.toLocaleString() : 0}
            </Typography>
            </Grid>
        </CardContent>
    </Card>
  );
  
  export default Stat;