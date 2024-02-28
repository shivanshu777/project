import './GroupOrganizerForm.css';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { postGroup } from '../Files/Group_Details';
import { useUser } from '../Auth/UserContext';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
const GroupOrganizeForm = ({event,eventName, spotName, ...props }) => {
  const {userDetails,updateOrganizerData}=useUser();
  const [submitProcess,setSubmitProcess]=useState(false);
  const navigate=useNavigate();
  const { onClose, onSubmit, open, ...other } = props;
  const [organizerFrom,setOrganizerFrom]=useState({
    organizer:{
      userId:userDetails?.userId.toString()||null
    }
  })
  const [groupForm,setGroupForm]=useState({
    groupName:"",
    about:"",
    dateFrom:"",
    dateTo:"",
    eventName:"",
    spotName:"",
    participantsLimit:0
  })
  const isAllFieldsFilled = () => {
    for (const key in groupForm) {
      if (key !== 'eventName' && key !== 'spotName' && !groupForm[key]) {
        return false;
      }
    }
    return true;
  };
  React.useEffect(() => {
    setOrganizerFrom({
      ...organizerFrom,
      group: groupForm,
    });
  }, [groupForm]);
  React.useEffect(() => {
    if (eventName !== undefined) {
      setGroupForm({
        ...groupForm,
        eventName: eventName,
      });
    } else if (spotName !== undefined) {
      setGroupForm({
        ...groupForm,
        spotName: spotName,
      });
    }
  }, [eventName, spotName]);
  const handleCancel = () => {
    setGroupForm({
      ...groupForm,
      groupName:'',
      about:'',
      dateTo:'',
      dateFrom:'',
      eventName:'',
      spotName:'',
      participantsLimit:''
    })
    onClose();
  };

  const handleOk = async() => {
    setSubmitProcess(true);
    try{
      const groupResponse=await postGroup(organizerFrom);
      if(groupResponse){
        updateOrganizerData();
        navigate(`/GroupPage/${groupResponse.groupId}`);
        onSubmit();
      }
    }catch(error){
      console.log(error);
      alert("error while sending group form");
    }
    setSubmitProcess(false);
  };
  const radioGroupRef = React.useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  


  const handleStartDateChange = (newStartDate) => {
    setGroupForm((prevData) => ({
      ...prevData,
      dateFrom: dayjs(newStartDate).format('YYYY-MM-DD'), // Assuming you want to store the date as a string in ISO format
    }));
  };
  
  const handleEndDateChange = (newEndDate) => {
    if (dayjs(newEndDate).isBefore(groupForm.dateFrom)) {
      alert("End date should not be before start date.");
      setGroupForm((prevData)=>(
        
        {
        ...prevData,
        dateTo: null
      }))
    } else {
      setGroupForm((prevData) => ({
        ...prevData,
        dateTo: dayjs(newEndDate).format('YYYY-MM-DD'),
      }));
    }
  };
  const handleParticipantLimit = (e) => {
    let value = e.target.value;
  
    // Check if the entered value is less than 0, and if so, set it to 0
    value = Math.max(1, value);
  
    // Update the state with the new value
    setGroupForm({ ...groupForm, participantsLimit: value });
  };
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
  return userDetails? (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', minHeight: 435, backgroundColor: '#383838', color:'white', display:'flex', flexDirection:'column', gap:'10px'} }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle> <h2>Organize Group</h2></DialogTitle>
      <DialogContent sx={{display:'flex',flexDirection:'column',gap:"12"}}>
          <label>Group Name:</label>
          <input type="text" name='groupName' placeholder='Enter Your Group Name' value={groupForm.groupName} onChange={handleChange} style={{color:'black'}}/>

          <label>Group Description:</label>
          <textarea name='about' value={groupForm.about} onChange={handleChange} style={{color:'black'}} placeholder='Enter About Your Group'/>

          <label>
                  Start Date:<br></br>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    className='akash1' 
                    value={groupForm.dateFrom}
                    onChange={handleStartDateChange}
                    disablePast
                    minDate={event && dayjs(event.startDate)}
                    maxDate={event && dayjs(event.endDate)}
                    format="YYYY-MM-DD"
                    style={{color:'black'}}
                    inputProps={{
                      readOnly:true
                    }}
                  />

                  </LocalizationProvider>
                </label>
                <label>
                  End Date:<br></br>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker  className='akash1'
                      value={groupForm.dateTo}
                      minDate={event && dayjs(event.startDate)}
                      maxDate={event && dayjs(event.endDate)}
                      onChange={handleEndDateChange}
                      format="YYYY-MM-DD"
                      disablePast
                      
                    />
                  </LocalizationProvider>
                </label>
          <label>No. of Participants:</label>
          <input type="number" name='participantsLimit' placeholder="Enter Participant Limit" style={{color:'black',padding:'5px'}} value={groupForm.participantsLimit} onChange={handleParticipantLimit} />
      </DialogContent>
        <DialogActions>
        <Button onClick={() => handleOk()} disabled={!isAllFieldsFilled()}>
  <LoadingButton loading={submitProcess} loadingIndicator={<CircularProgress color="primary" size={16}/>} >
    Submit
  </LoadingButton>
</Button>

          <Button variant='outlined' onClick={()=>handleCancel() }>Cancel</Button>
        </DialogActions>
    </Dialog>
  ):(<>
  <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', minHeight: 435, backgroundColor: '#383838', color:'white', display:'flex', flexDirection:'column', gap:'10px',alignItems:'center',justifyContent:'center'} }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle> <h2>Organize Group</h2></DialogTitle>
      <DialogContent sx={{display:'flex',flexDirection:'column',gap:"12"}}>
          login First !!!!
      </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={()=>handleCancel() }>Ok</Button>
        </DialogActions>
    </Dialog></>);
};

export default GroupOrganizeForm;