import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useUser } from '../Auth/UserContext'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { updateUserDetails } from '../Files/User_profile_avator';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

function ChangeOtherUserDetails({onClose}) {
  const {userDetails,setUserData,updateUserData}=useUser();
  const [submitProcess,setSubmitingProcess]=useState(false);
  const navigate=useNavigate();
  const [updatedUserDetails,setUpdatedUserDetails]=useState(userDetails);
  const updateUser=async(e)=>{
    e.preventDefault();
    setSubmitingProcess(true);
    try{
      const response=await updateUserDetails(updatedUserDetails);
      setUserData(response);
      updateUserData();
      onClose();
    }catch(error){
      console.log(error);
    }finally{
      setSubmitingProcess(false);
    }
  }
  const [otherGender, setOtherGender] = useState('');
  
  const handleGenderChange=(event)=>{
    const value = event.target.value;
    if (value === 'other') {
      setOtherGender('');
    }
    // Update gender in updatedUserDetails
    setUpdatedUserDetails({ ...updatedUserDetails, gender: value });
  }
  const handleDataChange=(dateOfBirth)=>{
    setUpdatedUserDetails((pre)=>({
      ...pre,
      dateOfBirth:dayjs(dateOfBirth).format('YYYY-MM-DD')
    }))
  }
  return (
    <div>
      ChangeOtherUserDetails
      <Divider style={{margin:'10px'}}/>
      <div>
      <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display:'flex',
                alignItems:'center',
                flexDirection:'column'
            }}
            noValidate
            onSubmit={(e)=>updateUser(e)}
            autoComplete="off"
        >
          
            <TextField required id='outlined-required' label="User Name" type='text' value={updatedUserDetails.userName} onChange={(e)=>setUpdatedUserDetails({...updatedUserDetails,userName:e.target.value})}/>
            <FormControl style={{ marginLeft: '10px' }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={updatedUserDetails.gender}
        onChange={handleGenderChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      {updatedUserDetails.gender === 'other' && (
        <TextField
          label="Other Gender"
          value={otherGender}
          onChange={(event) => setOtherGender(event.target.value)}
          fullWidth
        />
      )}
    </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    onChange={handleDataChange}
                    disableFuture
                    label="Date of birth"
                    format="YYYY-MM-DD"
                    style={{color:'black'}}
                    inputProps={{
                      readOnly:true
                    }}
                  />

                  </LocalizationProvider>
            <TextField label="About" value={updatedUserDetails.aboutUser} onChange={(e)=>setUpdatedUserDetails({...updatedUserDetails,aboutUser:e.target.value})}/>
            <LoadingButton type='Submit' loading={submitProcess} loadingIndicator={<>Updating....</>} disabled={!updatedUserDetails.userName.trim()}>Submit</LoadingButton>
          
            
        </Box>
      </div>

    </div>
  )
}

export default ChangeOtherUserDetails