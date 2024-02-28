import React, { useEffect, useState } from 'react'
import { useUser } from '../Auth/UserContext';
import { Box, Button, Divider, TextField, Tooltip } from '@mui/material';
import { message } from 'antd';
import { updatePassword } from '../Files/User_profile_avator';

function ChangePassword({ onClose }) {
    const {userDetails,updateUserData}=useUser();
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [isPasswordValid,setIsPasswordValid]=useState(false);
    useEffect(()=>{
        const passwordRegx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/ ;
        setIsPasswordValid(passwordRegx.test(newPassword));
    },[newPassword]);

    const ChangeUserPassword=async(e)=>{
        e.preventDefault();
        if(oldPassword==userDetails.userPassword){
            if(newPassword===confirmPassword){
                try{
                    await updatePassword(userDetails.userId,newPassword);
                    updateUserData();
                    onClose();
                }catch(error){
                    console.log(error);
                }
                
            }else{
                message.error("new password and confirm password are not same")
            }
            message.success("password correct");
        }else{
            message.error("Wrong old password")
        }
    }
  return (
    <div>ChangePassword
        <Divider style={{marginTop:'5px'}}/>
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display:'flex',
                alignItems:'center',
                flexDirection:'column'
            }}
            onSubmit={ChangeUserPassword}
            noValidate
            autoComplete="off"
        >
            <TextField required id='outlined-required' label="Old password" type='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
            <div style={{display:'flex',flexDirection:'row',marginLeft:'15px'}}>
                <TextField required id='outlined-required' label="New password" type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                {isPasswordValid ? 
        (<Tooltip title="Password containes at least one uppercase letter, one numeric digit, one special character and one lowercase letter" placement='top' disableInteractive>
        <svg className='pass-detail' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" style={{color:'green'}}>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg></Tooltip>)
:<Tooltip title="Password must contain at least one uppercase letter, one numeric digit, and one special character." placement='top' disableInteractive><svg className='pass-detail' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></Tooltip>}
            </div>
            
            <TextField required id='outlined-required' label="Confirm password" type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Button type='Submit' disabled={!isPasswordValid}>Submit</Button>
        </Box>
        
    </div>
  )
}

export default ChangePassword