// GroupPage.js
import React, { useEffect, useState } from "react";
import "./GroupPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getAllParticipantsById, getGroupById } from "../Files/Group_Details";
import { fetchOrganizerDataById, giveOrganizerRating } from "../Files/Organzier_Details";
import {
  participantJoining,
  participantLeaving,
} from "../Files/Participant_Details";
import { useUser } from "../Auth/UserContext";
import ParticipantList from "./ParticipantList";
import { LoadingButton } from "@mui/lab";
import { Avatar, CircularProgress, DialogActions, Rating} from "@mui/material";
import ChatBox from "./ChatBox";
import {
  AccessAlarmOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Button, Divider, Result } from "antd";
import {
  userFollowOrganizer,
  userUnfollowOrganizer,
} from "../Files/Other_DataBase";

const GroupPage = () => {
  const {
    organizerData,
    participantData,
    userDetails,
    updateOrganizerData,
    updateParticipantData,
  } = useUser();
  const [groupDetails, setGroupDetails] = useState(null);
  const navigate = useNavigate();
  const [organizer, setOrganizer] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [userFollowingProcess, setUserFollowingProcess] = useState(false);
  const { groupId } = useParams();
  const [joinDetails, setjoinDetails] = React.useState({});
  const [joining, setJoining] = useState(false);
  const [render, setRender] = useState(false);
  const [leavingProcess, setLeavingProcess] = useState(false);
  const { followersData, followingData, blockedData } = useUser();
  const [organizerRating,setOrganizerRating]=useState(2);
  const [organizerRatingProcess,setOrganizerRatingProcess]=useState(false);
  console.log(followersData, followingData);
  const [alert, setAlert] = useState(false);
  let isOrganizer;
  let isParticipant;
  if (organizerData || participantData) {
    isOrganizer = organizerData?.groupId == groupId;
    isParticipant = participantData?.groupId == groupId;
  }
  console.log(userDetails, participantData, organizerData);
  const Participation = async () => {
    try {
      setJoining(true);
      console.log("detail", joinDetails);
      const response = await participantJoining(joinDetails);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setJoining(false);
    }
  };
  const handleRatingOrganizer=async()=>{
    try{
      setOrganizerRatingProcess(true);
      const response= await giveOrganizerRating(organizer.organizerId,userDetails.userId,organizerRating);
      
    }catch(error){
      console.log(error);
    }finally{
      setOrganizerRatingProcess(false);
    }
  }
  useEffect(() => {
    console.log("renders");
    const fetchData = async () => {
      console.log("fetch");
      try {
        const response = await getGroupById(groupId);
        console.log(response);
        setGroupDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        console.log(groupDetails);
        const response = await fetchOrganizerDataById(groupDetails?.organizerId);
        setOrganizer(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganizer();
  }, [groupDetails]);

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await getAllParticipantsById(groupDetails?.groupId);
        setParticipants(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParticipant();
  }, [groupDetails]);

  console.log(groupDetails, participants, organizer);

  useEffect(() => {
    if (userDetails) {
      if (
        (!organizerData && !participantData) ||
        (organizerData?.groupId !== groupId &&
          participantData?.groupId !== groupId)
      ) {
        setjoinDetails({
          ...joinDetails,
          userId: userDetails.userId,
          groupId: groupId,
        });
      }
    }
  }, [render]);

  const handleJoinClick = async () => {
    Participation();
  };
  const handleLeaveClick = async () => {
    if (window.confirm("Are you sure you want to leave?")) {
      setLeavingProcess(true);
      try {
        const response = await participantLeaving(
          participantData.participantId,
          groupId
        );
        const updatedParticipants = participants.filter(
          (participant) =>
            participant.participantId !== participantData.participantId
        );
        setParticipants(updatedParticipants);
        // Assuming you have a function to update participant data in the context
        updateParticipantData();
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLeavingProcess(false);
      }
    }

    // Add your leave logic here
  };

  return (groupId && groupDetails && participants && organizer) ? (
    <div className="body1">
      <div className="group-container">
        <div className="header1">
          <h1 className="headerh1">
            <span className="group-icon">👥</span> {groupDetails.groupName}
          </h1>{console.log(groupDetails)}
          {groupDetails.participantsCount !==
            groupDetails.participantsLimit && (
            <>
              {isParticipant && !isOrganizer && (
                <div className="button-32">
                  <LoadingButton
                    variant="none"
                    loading={leavingProcess}
                    loadingIndicator={
                      <p style={{ color: "white" }}>Leaving...</p>
                    }
                    onClick={() => handleLeaveClick()}
                  >
                    Leave
                  </LoadingButton>
                </div>
              )}
              {!isOrganizer && !isParticipant && (
                <div className="button-32">
                  <LoadingButton
                    variant="none"
                    loading={joining}
                    onClick={() => handleJoinClick()}
                    loadingIndicator={
                      <CircularProgress sx={{ color: "white" }} />
                    }
                  >
                    Join
                  </LoadingButton>
                </div>
              )}
            </>
          )}
        </div>
        <div>
          <span>participant count </span>
          {groupDetails.participantsCount}/{groupDetails.participantsLimit}
        </div>
        <div className="organizer-info" style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <h3>Organizer</h3>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            {organizer.userData.userProfile ? (
            <Avatar
              src={organizer.userData.userProfile}
              alt="Organizer Profile"
              className="profile-pic"
            />
          ) : (
            <AccountCircleOutlined />
          )}
          <div className="organizer-container" style={{width:'100%'}}>
            <h2 className="organizer-text">{organizer.userData.userName}</h2>
            <DialogActions>
              {userDetails.userId != organizer.userId && (
                <button
                  className="button-85"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate(`/profileFollow/${organizer.userId}`)}
                >
                  View More
                </button>
              )}
            </DialogActions>
          </div>
          </div>
          <div style={{padding:'10px'}}>
            { organizer?.organizerRating?.ratingsList?.some(rating=>rating.userId==userDetails.userId) || (organizer?.userId == userDetails?.userId) ?
            <Rating readOnly value={organizer?.organizerRating?.rating ?? 0 }/> :
            <>
              <Rating value={organizerRating} onChange={(e)=>setOrganizerRating(e.target.value)}/>
              <LoadingButton loading={organizerRatingProcess} loadingIndicator={<>submitting..</>} onClick={()=>{handleRatingOrganizer()}}>Submit rating</LoadingButton>
            </>
          }
          </div>
          
        </div>
        <div className="date-format" style={{display:'flex',alignItems:'center'}}>
          <marquee>
            <div style={{display:'flex',alignItems:'center', padding:'10px',marginTop:'16px'}}>
              <p >
              Date From: {groupDetails.dateFrom} Date To: {groupDetails.dateTo}
            </p>
            <Divider type="vertical" />
            <p>Group Description : {groupDetails.about}</p>
            </div>
            
          </marquee>
        </div>
        <div id="participants-list">
          {participants.length > 0 ? (
            <ParticipantList participants={participants} />
          ) : (
            <>no participants</>
          )}
        </div>
      </div>
      <div className="chat-system">
        {(participantData?.groupId == groupId ||
          groupDetails?.organizerId == organizerData?.organizerId) && (
          <ChatBox group={groupDetails} organizer={organizer} />
        )}
      </div>
    </div>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default GroupPage;
