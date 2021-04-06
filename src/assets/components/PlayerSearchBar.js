import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";

export default function PlayerSearchBar() {
  const [options, setOptions] = useState([]);
  let history = useHistory()

  
  const getPlayers = (event, query) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/player/search/${query}`)
      .then(resp => resp.json())
      .then(data => {
          setOptions(data)
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
          />
        )
      }}
    />
  );
}