import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import '../styleguide.css';
import LoginPage from '../LoginPage/LoginPage';
import SearchBar from '../SearchBar/SearchBar';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import { useUser } from '../Auth/UserContext';
import {Avatar} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../Assests/MicrosoftTeams-image (9).png';
import { DisabledByDefault } from '@mui/icons-material';
import { message } from 'antd';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function NavBar() {
  const navigate=useNavigate();
  const {userDetails,setUserData,participantData,organizerData} = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const [visible, setvisible] = useState(false);
  const [login,setLogin]=useState(false);
  const open = Boolean(anchorEl);
  const [profileAva,setProfileAva]=useState(userDetails?userDetails.userProfile:(<AccountCircleIcon/>));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfile=()=>{
    setAnchorEl(null);
    navigate(`/profile`);

  }
  const handleClose1= ()=>{
    setAnchorEl(null);
  }
  const handleGroup = () => {
    setAnchorEl(null);
    if(organizerData){
      navigate(`/GroupPage/${organizerData.groupId}`)
    }else if(participantData){
      navigate(`/GroupPage/${participantData.groupId}`)
    }else{
      return message.error("You are currently not in any group.");
    }
  };
  const log = () => {
    setvisible(!visible);
  }; 
  const handleClose=()=>{
    setvisible(false);
  }
  useEffect(()=>{
    setLogin(userDetails?true:false);
  },[userDetails]);

  const handleLogout=()=>{
    navigate("/");
    setUserData(null);
    window.location.reload();
  }
  const childValue=(value)=>{
    setUserData(value);
    setProfileAva(value.userProfile);
    window.location.reload();
  };
  return (
    <React.Fragment>
      <div className='nav-bar'>
      <div className='Trip-Logo-Container' style={{display:'flex',alignItems:'center'}}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img className='Trip-Logo' src={logo}/>
        </Link>
      </div>
      <div className='search-container' >
          <SearchBar/>
        </div>
      <div className='menu-list' style={{justifyContent:'center',alignItems:'center'}}>
        <div>
          <Link to='/EventsHomePage'><span>Events</span></Link>
        </div>
        <div><Link to='/TouristHomePage'><span>Tourist Spots</span></Link></div>
        
        <div className='login-signup-outline' onClick={(event)=>{login ? handleClick(event):log()}} style={{
              backgroundColor: 'white',
              backgroundPosition: 'center',
              margin: 0,
              padding: 0,
              cursor:'pointer'
      }}>{userDetails ? (<
        Avatar src={profileAva}sx={{objectFit:'scale-down'}}></Avatar>):(<AccountCircleIcon sx={{width:'100%',height:'100%'}}/>)} </div>
      </div>
      {!login ? <Dialog
        open={visible}
        TransitionComponent={Transition}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: 'auto', minHeight: 'auto' ,padding:'0px 0px', borderRadius:'15px',overflow:'hidden'} }}
      >
        <LoginPage onClose={handleClose} onReturn={childValue}/>
      </Dialog>
      :
      <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {console.log(participantData,organizerData)}
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        {(participantData?.participantStatus==="Busy" || organizerData?.organizerStatus==="Busy") && <MenuItem onClick={()=>handleGroup()}>My Group</MenuItem>}
        <MenuItem onClick={()=>handleLogout()} >Logout</MenuItem>
      </Menu>
      </>}
      
    </div>
    </React.Fragment>
    
  );
};

export default NavBar;
