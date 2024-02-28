// ParticipantList.js
import { AccessAlarmOutlined } from '@mui/icons-material';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '../Auth/UserContext';
import { userFollowParticipant, userUnfollowParticipant } from '../Files/Other_DataBase';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { giveParticipantRating } from '../Files/Participant_Details';


const ParticipantList = ({ participants }) => {
  const [participantR,setParticipantR]=useState(2);
  const [participantRP,setParticipantRP]=useState(false);
  const navigate=useNavigate();
  const {followersData,followingData,blockedData,userDetails,updateUserBlockedList,updateUserFollowersList,updateUserFollowingList}=useUser();
  const handlePR=async(participantId)=>{
    try{
      setParticipantRP(true);
      await giveParticipantRating(participantId,userDetails.userId,participantR);
    }catch(error){
      console.log(error);
    }finally{
      setParticipantRP(false);
    }
  }
    return (

    <div style={{width:'100%'}}>
      <h2>Participants</h2>
      <ul id="participants">
      {participants.map((participant, index) => (
        <li key={index}>
          <div className="participant-info" style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
            <div className="profile-pic">
              <Avatar
                src={participant.userData.userProfile}
                alt="Profile Pic"
                width="40" // Adjust the width as needed
                height="40" // Adjust the height as needed
              />
            </div>  
          <span className="participant-name">{participant.userData.userName}</span>
          <div style={{padding:'10px'}}>{console.log(participant)}
            { participant?.participantRating?.ratingsList?.some(rating=>rating.userId==userDetails.userId) || (participant?.userId == userDetails?.userId) ?
            <Rating readOnly value={participant?.participantRating?.rating ?? 0 }/> :
            <>
              <Rating value={participantR} onChange={(e)=>setParticipantR(e.target.value)}/>
              <LoadingButton loading={participantRP} loadingIndicator={<>submitting..</>} onClick={()=>{handlePR(participant.participantId)}}>Submit rating</LoadingButton>
            </>
          }
          </div>
          <br />
             {!(userDetails.userId==participant.userId) &&  <button className="button-85" onClick={() => navigate(`/profileFollow/${participant.userId}`)}>
            View More
          </button>}
          
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ParticipantList;
