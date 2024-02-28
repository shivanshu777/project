import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { allEventTitle, allSpotTitle } from '../Files/Other_DataBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { to } from 'react-spring';
export default function FreeSolo() {
  const [type, setType] = React.useState('');
  const navigate=useNavigate();
  const [value,setValue]=React.useState('');
  React.useEffect(()=>{
    if(type==='event'){
      navigate(`/Events/${value}`)
    }else if(type==='spot'){
      navigate(`/Spot/${value}`)
    }
  },[value])
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [Name,setName]=React.useState([]);
  const fetch=async()=>{
    if(type==='event'){
      const fetchEvent=await allEventTitle();
    setName(fetchEvent);
    }
    else if(type==='spot'){
      const fetchSpot=await allSpotTitle();
      setName(fetchSpot)
    }
  }
  return (
    <div onClick={fetch} style={{display:'flex',flexDirection:'row'}}>
       <Box sx={{maxHeight: 10,'& .MuiInputBase-input':{color:'black',borderColor:'black'}}}>
      <FormControl fullWidth variant='filled' sx={{bgcolor:'white',width:100,fontSize:10}}>
        <InputLabel id="demo-simple-select-label">Event / Spot</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={'event'}>Event</MenuItem>
          <MenuItem value={'spot'}>Tourist Spot</MenuItem>
        </Select>
      </FormControl>
    </Box>
      <Stack spacing={2} sx={{ width: 300 }} >
      <Autocomplete
        freeSolo
        style={{color:'black',backgroundColor:'white'}}
        id="free-solo-2-demo"
        sx={{'& input':{color:'black'}}}
        disableClearable
        value={value}
        onChange={(event,newValue)=>{
          setValue(newValue);
        }}
        options={Name.map((option) => option.Name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            style={{color:'black'}}
          />
        )}
      />
    </Stack>
    </div>
  );
}
