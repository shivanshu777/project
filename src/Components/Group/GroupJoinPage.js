import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import {Group_details, getGroup} from '../Files/Group_Details';
import { participantJoining } from '../Files/Participant_Details';
import { useUser } from '../Auth/UserContext';
import { useNavigate } from 'react-router-dom';

function GroupJoinPage(props) {
    const {userDetails}=useUser();
  const { onClose, open, eventName, spotName, ...other } = props;
  const [groupDetails,setGroupDetails]=React.useState([{}]);
  const radioGroupRef = React.useRef(null);
  const [joinDetails,setjoinDetails]=React.useState({})
  const navigate=useNavigate();
  React.useEffect(()=>{
    const fetchGroup=async()=>{
      const groups=await getGroup(eventName,spotName);
      setGroupDetails(groups);
    }
    fetchGroup();
  },[eventName,spotName])
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
const openLogin=()=>{
  
}
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
  };

  const handleJoin=(e)=>{
    navigate(`/GroupPage/${e.target.value}`)
  }
  const Participation=async()=>{
  const response=await participantJoining(joinDetails);
  onClose();
  }
  return userDetails? (
    
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, backgroundColor: '#383838', color:'white' } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Groups List</DialogTitle>
      <DialogContent>
        {groupDetails.length > 0 ? (
        groupDetails.map((grp)=>(<DialogContent dividers style={{display:'flex',justifyContent:'space-between'}}>{grp.groupName} <Button variant='contained' name="groupId" value={grp.groupId} onClick={(e)=>handleJoin(e)}> view </Button></DialogContent>)))
      :
      (<>No Groups to Join</>)
      }
      </DialogContent>
      
        
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={()=>handleOk()}>Ok</Button>
      </DialogActions>
    </Dialog>
  ):(
    <><Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, backgroundColor: '#383838', color:'white', display:'flex',alignItems:'center' } }}
    maxWidth="xs"
    TransitionProps={{ onEntering: handleEntering }}
    open={open}
    {...other}
  >
    <DialogTitle>Groups List</DialogTitle>
      Login First

    <DialogActions>
      <Button variant='contained' autoFocus onClick={()=>handleCancel()}>Ok</Button>
    </DialogActions>
  </Dialog></>
  );
}

GroupJoinPage.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default GroupJoinPage;