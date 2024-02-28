import { LoadingButton } from '@mui/lab';
import { Backdrop, Box, Button, Fade, Modal, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useUser } from '../Auth/UserContext';
import { generateOtp } from '../Files/User_profile_avator';
import { message } from 'antd';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import ChangeProfile from './ChangeProfile';
import ChangeOtherUserDetails from './ChangeOtherUserDetails';

function UpdateProfile() {
  const [verification,setVerification]=useState(false);
  const [show,setShow]=useState(true);
  const {userDetails}=useUser();
  const [otpSent,setOtpSent]=useState('');
  const [otpProcess,setOtpProcess]=useState(false);
  const [otpRecived,setOtpRecived]=useState('');
  const [renderComponent,setRenderComponent]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showEmail,setShowEmail]=useState(false);
  const [password,setPassword]=useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const checkPassword=()=>{
    if(password==userDetails.userPassword){
      message.success("Verification success.");
      setVerification(true);
    }
    else{
      message.error("Wrong Password");
    }
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const sendOtp=async()=>{
    setOtpProcess(true);
    try{

        const otp=await generateOtp(userDetails.userEmail);
        message.success('otp sent successfully');
        setOtpSent(otp);
    } catch(error){
      console.log(error);
    }
    setOtpProcess(false);
  }
  const checkOtp=async()=>{
    setOtpProcess(true);
    if(otpRecived==otpSent){
      message.success("verification success");
      setVerification(true);
    }else{
      message.error("Wrong otp");
    }
    setOtpProcess(false);
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'200px',gap:'5px'}}>
      {show && <> 
      <Button variant='contained' onClick={()=>{setShowPassword(!showPassword);setShow(!show)}}>Verify via Password</Button>
      <Button variant='contained' onClick={()=>{setShowEmail(!showEmail);setShow(!show)}}>Verify via Otp</Button>
      </>}
      



      {verification?(
        <div>
          <Button onClick={()=>{setRenderComponent(<ChangePassword onClose={handleOk}/>);showModal()}}>Change Password</Button>
          <Button onClick={()=>{setRenderComponent(<ChangeEmail onClose={handleOk}/>);showModal()}}>Change Email</Button>
          <Button onClick={()=>{setRenderComponent(<ChangeProfile onClose={handleOk}/>);showModal()}}>Profile Image</Button>
          <Button onClick={()=>{setRenderComponent(<ChangeOtherUserDetails onClose={handleOk} />);showModal()}}>Other Details</Button>
        </div>
      ):(
      <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
        {showEmail && <><input placeholder={userDetails.userEmail} style={{padding:'5px'}} disabled/>
      {otpSent && <input placeholder='Enter the otp.' style={{padding:'5px'}} value={otpRecived} onChange={(e)=>setOtpRecived(e.target.value)}/>}
      <div style={{display:'flex',flexDirection:'row',gap:'5px'}}>
        {otpSent ? (
          <LoadingButton variant='contained' loading={otpProcess} loadingIndicator={<div style={{padding:'5px'}}>Checking Otp...</div>} onClick={()=>checkOtp()} disabled={!otpRecived.trim()}>Submit</LoadingButton>
        ):(
        <LoadingButton variant='contained' loading={otpProcess} loadingIndicator={<div style={{padding:'5px'}}>Sending Otp...</div>} onClick={()=>sendOtp()}>GetOtp</LoadingButton>
    )}
    <Button variant='contained' onClick={()=>{setShowEmail(!showEmail);setShow(!show)}}>Back</Button>
    </div></> }
      {showPassword && <>
      <input placeholder='Enter your Password' type="password" style={{padding:'5px'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <Button variant='contained' onClick={()=>{checkPassword()}} disabled={!password.trim()}>Submit</Button>
      <Button variant='contained' onClick={()=>{setShowPassword(!showPassword);setShow(!show)}}>Back</Button>
      </>}
    </div>
    )}
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleOk}
        closeAfterTransition
        sx={{zIndex:100}}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={style}>
            {renderComponent}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default UpdateProfile