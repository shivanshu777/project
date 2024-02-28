import { Button, InputAdornment, Switch } from '@mui/material';
import React, { useState } from 'react';
import { CssTextField } from '../TextFieds';
import { useUser } from '../Auth/UserContext';
import { Avatar } from 'antd';
import { LoadingButton } from '@mui/lab';
import { sendAdminFeedBack } from '../Files/Other_DataBase';
import logo from '../../Assests/MicrosoftTeams-image (9).png';

const placeholderStyle = {
  '&::placeholder': {
    color: 'gray', // Adjust placeholder color here
    fontStyle: 'italic', // Adjust placeholder style here
  },
};

function Connect() {
  const { userDetails } = useUser();
  const [feedBack, setFeedBack] = useState('');
  const [indicate, setIndicate] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);

  const handleAdminFeedback = async () => {
    try {
      setLoadingProcess(true);
      console.log(indicate);
      const response = await sendAdminFeedBack(userDetails?.userId, feedBack, indicate);
      setFeedBack('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProcess(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '50%',
        alignItems: 'center',
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <img src={logo} style={{ height: '200px', width: '50%' }} alt="Logo" />
      <CssTextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar src={userDetails?.userProfile} alt="User" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <label style={{ color: 'teal', fontWeight: 'bold' }}> Important <Switch value={indicate} onChange={() => { setIndicate(!indicate) }} /> </label>
              <LoadingButton loading={loadingProcess} disabled={!feedBack.trim()} loadingIndicator={<Button variant='contained' disabled>sending..</Button>} variant='contained' onClick={() => { handleAdminFeedback() }}>send</LoadingButton>
            </InputAdornment>
          ),
        }}
        placeholder='Give us your thoughts.'
        fullWidth
        value={feedBack}
        onChange={(e) => { setFeedBack(e.target.value) }}
        sx={placeholderStyle} // Apply placeholder styles
      />
    </div>
  );
}

export default Connect;
