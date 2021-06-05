import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../assets/jss/loginStyles';
import Container from '@material-ui/core/Container';


import { login } from '../auth'


export default function Login(props) {
  const classes = useStyles();
  const [creds, setCreds] = useState({})
  const [error, setError] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/login`, {
      method: 'POST',
      headers: {
				"Content-Type": "application/json",
			},
      body: JSON.stringify(creds)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          login(token)
          console.log(token)
          window.localStorage.setItem('user', creds['username'])
          props.history.push("/")

        }
        else {
          console.log("Please type in correct username/password")
          setError(true)
        }
      })
  }

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name] : e.target.value })
  }
    
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          {
            error !== false &&
            <Typography color='error' align='right' variant='overline'>Invalid credentials</Typography>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
