import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import {registerUser, generateOtp, getUserDetails} from '../Files/User_profile_avator'
import { forgotPassword } from '../Files/Other_DataBase';
import { Tooltip } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
function LoginPage({ onClose , onReturn}) {
  const [otpInput, setOtpInput] = useState(false);
  const [otpProcess,setOtpProcess]=useState(false);
  const [loginProcess,setLoginProcess]=useState(false);
  const [registeringProcess,setRegisteringProcess]=useState(false);
  const [userDetails,setUserDetails]=useState({
    userId:'',
    userName:"",
    userEmail:"",
    userPassword:"",
    userProfile:""
  })
  const [sendingNewPassword,setSendingNewPassword]=useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isforgotPassword,setForgotPassword]=useState(false);
  const [userPasswordC,setUserPasswordC]=useState("");
  const [userotp,setUserOtp]=useState("");
  const [otp,setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp]=useState(false);
  const showForgotPassword=()=>{
    setUserDetails({
      ...userDetails,
      userId:'',
      userName: "",
      userEmail: "",
      userPassword: ""
    });

    setForgotPassword(!isforgotPassword);
  }
  console.log(userDetails);
  const handleForgotPassword=async()=>{
    setSendingNewPassword(true);

    if(userotp==otp && userotp!='' && otp!=''){
      await forgotPassword(userDetails.userEmail);
      setSendingNewPassword(false);
      showForgotPassword();
    }else{
      setSendingNewPassword(false);
      message.error("entered otp is wrong");
    }
    
  }
  console.log(userDetails);
  const getOtp=async()=>{
    if(!userDetails.userEmail?.trim()){
      return null;
    }
    setOtpProcess(true)
    toggleOTPinput();
    const response=await generateOtp(userDetails.userEmail);
    setUserOtp(response);
    console.log("user otp"+userotp);
    setGeneratedOtp(!generatedOtp);
    setOtpProcess(false)
}
const navigate=useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  setLoginProcess(true)
  try {
    const userData = await getUserDetails(userDetails.userEmail);
    if (userData.userPassword === userDetails.userPassword) {
      console.log("login success");
      setUserDetails((prevState) => ({
        ...prevState,
        userId: userData.userId,
        userProfile: userData.userProfile,
        userName: userData.userName,
      }));
      
      // Use the updated userDetails from the state
      const updatedUserDetails = {
        ...userDetails,
        userId: userData.userId,
        userProfile: userData.userProfile,
        userName: userData.userName,
      };
      onReturn(userData);
      onClose();
    } else {
      message.error('Incorrect password');
      setLoginProcess(false);
    }
  } catch (error) {
    message.error('Email not found. Register!!!');
    setLoginProcess(false);
  }
};
const handleChange=(e)=>{
  const {name,value}=e.target;
  setUserDetails((preData)=>({
    ...userDetails,
    [name]:value
  }))
}
const passwordRegx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/ ;
const isPasswordValid=passwordRegx.test(userDetails.userPassword);
console.log(isPasswordValid);
const handleSubmit=async(e)=>{
  e.preventDefault();
  
  if(!isPasswordValid){
    message.error("Enter strong password");
    return ;
  }
  console.log('Current state values:', { otp, userotp, ...userDetails.userPassword, userPasswordC });
if(userotp !== ""){
  if( otp == userotp){
      if(userDetails.userPassword === userPasswordC){
          try {
            const updatedUserDetails = {
              ...userDetails,
            };setRegisteringProcess(true);
              const response = await registerUser(updatedUserDetails);
              message.success("User registered successfully.");
              navigate("/");
              onClose();
            } catch (error) {
              console.error('Error registering user:', error);
            }finally{
              setRegisteringProcess(false);
            }
            
}else{
  message.warning("Check password");
}
  }else{
      message.error("Entered otp is wrong.");
  }
}
else{
  getOtp();
}
}
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.userEmail)) {
      setErrorMessage('Invalid email address.');
      setPopupVisible(true);
    } else {
      getOtp();
    }
  };
  
 
  const closePopup = () => {
    setPopupVisible(false);
  };
  const toggleOTPinput = () =>{
    setOtpInput(!otpInput);
  };
  const popupStyle = {
    display: 'block',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };


  return (
    <div className='login-page-overlay' onClick={onClose}>
      <div className="login-signup-container" onClick={(e)=> e.stopPropagation()}>
    <input type="checkbox" id="chk" aria-hidden="true" />
    <div className="login">
    {!isforgotPassword ? (<><form className="login-form" style={{maxHeight:'345px',minHeight:'345px'}}>
        <label htmlFor="chk" aria-hidden="true">Log in</label>
        
        <input
          className="login-input"
          type="email"
          name='userEmail'
          value={userDetails.userEmail}
          placeholder="Email"
          onChange={handleChange}
          // required
        />
        <input className="login-input"
        type="password"
        name='userPassword'
        value={userDetails.userPassword}
        placeholder="Password"
        onChange={handleChange}
        // required
        />
        <span className='forgot-password' onClick={()=>showForgotPassword()}>Forgot password?</span>
        {/* <Button variant='contained' onClick={(e)=>handleLogin(e)}>Login In</Button> */}
        <div style={{width:'100%',display:'flex',alignItems:'center'}} ><LoadingButton loading={loginProcess} onClick={(e)=>handleLogin(e)} disabled={!userDetails.userEmail?.trim()} loadingIndicator={<div style={{display:'flex',alignItems:'center',color:'white',gap:'10px' }}>Checking User<CircularProgress color="primary" size={16} /></div>}> Login </LoadingButton></div>
        
      </form>
      </>) 
      : 
      (<><form className='forgot-form' style={{minHeight:'345px',maxHeight:'345px'}}>
      <label >Forgot password</label>
        <input
          className="login-input"
          type="email"
          name='userEmail'
          value={userDetails.userEmail}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {userotp && <input className="login-input"
        type="otp"
        name='otp'
        placeholder="Enter OTP"
        onChange={(e)=>setOtp(e.target.value)}
        required
        />}
        <span className='back-to-sign-in' onClick={()=>showForgotPassword()}>Back to sign in</span>
        {userotp ? (
          <> <LoadingButton variant='contained' loading={sendingNewPassword} loadingIndicator={<>Generating new password...</>} onClick={()=>handleForgotPassword()}>Generate Password</LoadingButton>
          </>
        ) : (<div onClick={()=>getOtp()} style={{width:'100%',display:'flex',alignItems:'center'}} disabled={!userDetails.userEmail?.trim()}>
        <LoadingButton loading={otpProcess} loadingIndicator={<div style={{display:'flex',alignItems:'center',color:'white',gap:'10px' }}>Sending OTP<CircularProgress color="primary" size={16} /></div>}> Get OTP</LoadingButton>
        </div>)}
        
      </form>
      </>)}
    </div>

    <div className="register">
      <form className="reg-form" onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">Register</label>
        <input className="reg-input" type="text"  name="userName" value={userDetails.userName} placeholder="Username" required onChange={handleChange}/>
        <div className='reg' style={{ display: "flex", flexDirection: "row",alignItems:'center',gap:'5px',marginLeft:'10px' }}>
        <input
            className="reg-input"
            type="email"
            name="userEmail"
            value={userDetails.userEmail}
            placeholder="Email"
            onChange={handleChange}
            style={{width:'312px',marginLeft:'58px'}}
            required
          />
          <div onClick={()=>getOtp()}>
            <LoadingButton variant="contained" sx={{width:50,height:30, fontSize:10,backgroundColor:'#573b8a'}} loading={otpProcess} loadingIndicator={<CircularProgress color="primary" size={16} />}> 
              Get OTP
            </LoadingButton>
          </div>
          
        </div>
         {userotp && <><input
      className="reg-input"
      type="text"
      name="otpreg"
      placeholder="Enter OTP"
      onChange={(e)=>setOtp(e.target.value)}
      style={{ paddingRight: '40px' }}
      required
    /></>}
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
      <input className="reg-input" type="password" style={{width:'315px',marginLeft:'25px'}} value={userDetails.userPassword} name="pswd" placeholder="Password" required onChange={(e)=>setUserDetails({...userDetails,userPassword:e.target.value})}/>
        <div className='pass-detail-container'>
        
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
    </div>
        <input className="reg-input" type="password" value={userPasswordC} name="cpswd" placeholder="Confirm Password" required onChange={(e)=>setUserPasswordC(e.target.value)}/>
        <div className='reg-button'  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <LoadingButton  
          loading={registeringProcess} 
          sx={{width:'100%'}} 
          type='submit' 
          disabled={registeringProcess} 
          variant='none' 
          loadingIndicator={
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
             Registering....
             <CircularProgress sx={{height:'10px',width:'10px'}}/> 
            </div>}
          >Register</LoadingButton>
          </div>
      </form>
    </div>
    </div>
        {isPopupVisible && (
          <div style={popupStyle}>
            <p>{errorMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        )}
      </div>
  );
}

export default LoginPage;