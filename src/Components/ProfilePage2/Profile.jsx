import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Profile.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import ProfileBottom from './ProfileBottom';
import { getAllBlocked, getUserDetailsById } from '../Files/User_profile_avator';
import { LoadingButton, Rating } from '@mui/lab';
import { useUser } from '../Auth/UserContext';
import { userBlockingOrganizer, userBlockingUser, userFollowParticipant, userUnBlockingUser, userUnfollowParticipant } from '../Files/Other_DataBase';
import { fetchOrganizerDataById, fetchOrganizerDataByUserId } from '../Files/Organzier_Details';
import { fetchParticipantByUserId } from '../Files/Participant_Details';

export default function ProfilePage2() {
  const [userDetails1,setUserDetails]=useState(null);
  const {userId}=useParams();
  const [followUnfollowProcess,setFollowUnfollowProcess]=useState(false);
  const [blockedProcess,setBlockedProcess]=useState(false);
  const {userDetails,followersData,followingData,blockedData,updateUserBlockedList,updateUserFollowersList,updateUserFollowingList} =useUser();
  console.log(blockedData);
  const handleFollow=async()=>{
    try{
      setFollowUnfollowProcess(true);
      await userFollowParticipant(userDetails.userId,userId);
      updateUserFollowingList();
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setFollowUnfollowProcess(false);
    }
  }
  const handleUnfollow=async()=>{
    try{
      setFollowUnfollowProcess(true);
      await userUnfollowParticipant(userDetails.userId,userId);
      updateUserFollowingList();
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setFollowUnfollowProcess(false);
    }
  }
  const handleBlocked=async()=>{
    try{
      setBlockedProcess(true);
      await userBlockingUser(userDetails.userId,userId);
      updateUserBlockedList();
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setBlockedProcess(false);
    }
  }
  const handleUnblocked=async()=>{
    try{
      setBlockedProcess(true);
      await userUnBlockingUser(userDetails.userId,userId);
      updateUserBlockedList();
      window.location.reload();
    }catch(error){
      console.log(error);
    }finally{
      setBlockedProcess(false);
    }
  }
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response=await getUserDetailsById(userId);
        const organizerR=await fetchOrganizerDataByUserId(userId);
        const participantR=await fetchParticipantByUserId(userId);
        const blockedList=await getAllBlocked(userId);
      setUserDetails({
        userData:response,
        organizerR:organizerR,
        participantR:participantR,
        blockedList:blockedList
      });
      }catch(error){
        console.log(error);
      }
    }
    fetchUser();
  },[userId]);
  const navigate=useNavigate();

  return (
    <>
    {userDetails?.userId !== userId ? (
        <>{console.log(userDetails.blockedList)}
        {userDetails1?.blockedList?.some(user=>user.userId==userDetails.userId) ? (
            <section style={{ backgroundColor: 'rgb(151, 235, 207)', marginTop:'10vh', minHeight:'100%', width:'100%' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4 profile-left-info">
                        <MDBCard className="mb-4" style={{height:"100%"}}>
                            <MDBCardBody className="text-center">
                                <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <img src={userDetails1?.userData.userProfile} style={{height:'300px',width:'300px',borderRadius:'50%'}} alt="User Profile"/>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4" style={{height:'100%'}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetails1?.userData.userName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Gender</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetails1?.userData.gender}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Date of Birth</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetails1?.userData.dateOfBirth}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>About</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userDetails1?.userData.aboutUser}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Organizer Ratings</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <Rating value={userDetails1?.organizerR?.rating ?? 0} readOnly />
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Participant Ratings</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"><Rating readOnly value={userDetails1?.participantR?.rating}/></MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow style={{marginTop:'50px'}}>
                                    <MDBCol sm="3">
                                        <>
                                        {(followersData.includes(parseInt(userId)) && !followingData.includes(parseInt(userId))) &&  <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>{handleFollow()}}> Follow Back </LoadingButton>}
                                        {(!followersData.includes(parseInt(userId)) && !followingData.includes(parseInt(userId))) && <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>{handleFollow()}}>Follow</LoadingButton>}
                                        {(followingData.includes(parseInt(userId))) && <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>(handleUnfollow())}>Unfollow</LoadingButton>}
                                        </>
                                    </MDBCol>
                                    <MDBCol sm="3" >
                                        {(blockedData?.includes(parseInt(userId))) ? (
                                            <LoadingButton
                                                variant='contained'
                                                loading={blockedProcess}
                                                loadingIndicator={<p>Unblocking user...</p>}
                                                onClick={()=>handleUnblocked()}
                                            >
                                                Unblock
                                            </LoadingButton>  
                                        ) : (
                                            <LoadingButton
                                                variant='contained'
                                                loading={blockedProcess}
                                                loadingIndicator={<p>Blocking user...</p>}
                                                onClick={()=>handleBlocked()}
                                            >
                                                Block
                                            </LoadingButton>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
        ) : (
            <section style={{ backgroundColor: 'rgb(151, 235, 207)', marginTop:'10vh', minHeight:'100%', width:'100%' }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol lg="4 profile-left-info">
                            <MDBCard className="mb-4" style={{height:"100%"}}>
                                <MDBCardBody className="text-center">
                                    <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        <img src={userDetails1?.userData.userProfile} style={{height:'300px',width:'300px',borderRadius:'50%'}} alt="User Profile"/>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol lg="8">
                            <MDBCard className="mb-4" style={{height:'100%'}}>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{userDetails1?.userData.userName}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{userDetails1?.userData.userEmail}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Gender</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{userDetails1?.userData.gender}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Date of Birth</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{userDetails1?.userData.dateOfBirth}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>About</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{userDetails1?.userData.aboutUser}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Organizer Ratings</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <Rating value={userDetails1?.organizerR?.rating ?? 0} readOnly />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Participant Ratings</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted"><Rating readOnly value={userDetails1?.participantR?.rating}/></MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow style={{marginTop:'50px'}}>
                                        <MDBCol sm="3">
                                            <>
                                            {(followersData.includes(parseInt(userId)) && !followingData.includes(parseInt(userId))) &&  <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>{handleFollow()}}> Follow Back </LoadingButton>}
                                            {(!followersData.includes(parseInt(userId)) && !followingData.includes(parseInt(userId))) && <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>{handleFollow()}}>Follow</LoadingButton>}
                                            {(followingData.includes(parseInt(userId))) && <LoadingButton variant='contained' loading={followUnfollowProcess} onClick={()=>(handleUnfollow())}>Unfollow</LoadingButton>}
                                            </>
                                        </MDBCol>
                                        <MDBCol sm="3" >
                                            {(blockedData?.includes(parseInt(userId))) ? (
                                                <LoadingButton
                                                    variant='contained'
                                                    loading={blockedProcess}
                                                    loadingIndicator={<p>Unblocking user...</p>}
                                                    onClick={()=>handleUnblocked()}
                                                >
                                                    Unblock
                                                </LoadingButton>  
                                            ) : (
                                                <LoadingButton
                                                    variant='contained'
                                                    loading={blockedProcess}
                                                    loadingIndicator={<p>Blocking user...</p>}
                                                    onClick={()=>handleBlocked()}
                                                >
                                                    Block
                                                </LoadingButton>
                                            )}
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <div style={{marginTop:'10px', padding:'10px',height:'400px',width:'100%'}}>
                        <ProfileBottom/>
                    </div>
                </MDBContainer>
            </section>
        )}
        </>
    ) : (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={()=>navigate("/")}>Back Home</Button>}
        />
    )}
    </>
);
    }
