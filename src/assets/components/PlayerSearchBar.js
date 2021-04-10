import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PlayerSearchBar() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  let history = useHistory()

  
  const getPlayers = (event, query) => {
    setLoading (true);
    fetch(`${process.env.REACT_APP_API_URL}/api/player/search/${query}`)
      .then(resp => resp.json())
      .then(data => {
          setOptions(data);
          setLoading(false);
      })
  }

  const onPlayerSelect = (event, obj) => {
    setOptions([]);
    if (obj !== null){
      history.push(`/players/${obj.id}`)
    }
  }

  return (
    <Autocomplete
      id="player-search"
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      fullWidth={true}
      onInputChange={getPlayers}
      onChange={onPlayerSelect}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search Players"
            variant="outlined"
            color="secondary"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <SearchIcon/>
              ),
              endAdornment: (
                <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )
      }}
    />
  );
}