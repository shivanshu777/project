import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserDetailsById } from "../Files/User_profile_avator";
import { BaseUrl } from "../config/BaseUrl";
 
const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    // Load user details from localStorage on initial render
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });
 const [organizerData,setOrganizerData]=useState(()=>{
  const storedOrganizerDetails=localStorage.getItem('organizerDetails');
  return storedOrganizerDetails ? JSON.parse(storedOrganizerDetails) : null;
 });
 const [participantData,setParticipantData]=useState(()=>{
  const storedParticipantDetails=localStorage.getItem('participantDetails');
  return storedParticipantDetails ? JSON.parse(storedParticipantDetails) : null;
 });
 const [followersData,setFollowersData]=useState(()=>{
  const storedFollowersData=localStorage.getItem('FollowersList');
  return storedFollowersData ? JSON.parse(storedFollowersData):null;
 })
 const [followingData,setFollowingData]=useState(()=>{
  const storedFollowingData=localStorage.getItem('FollowingList');
  return storedFollowingData ? JSON.parse(storedFollowingData):null;
 })
 const [blockedData,setBlockedData]=useState(()=>{
  const storedBlockedData=localStorage.getItem('BlockedList');
  return storedBlockedData ? JSON.parse(storedBlockedData):null;
 })
 const updateOrganizerData=async(userData)=>{
  if(userData){
    try{
    const organizer=await axios.get(`${BaseUrl}/User/Organizer/${userData.userId}`);
    if(organizer.data){
      const organizerR=await axios.get(`${BaseUrl}/organizer/ratings/${organizer.data.organizerId}`);
      const organizerWithRating={
        ...organizer.data,
        rating:organizerR.data
      }
      localStorage.setItem('organizerDetails',JSON.stringify(organizerWithRating));
    }
  }
  catch(error){
    console.log(error);
  }
  }
 }
 const updateUserFollowersList=async(userData)=>{
  if(userData){
    try{
      const follwers=await axios.get(`${BaseUrl}/User/followersId/${userData.userId}`);
      localStorage.setItem('FollowersList',JSON.stringify(follwers.data));
    }catch(error){
      console.log(error);
    }
  }
 }
 const updateUserFollowingList=async(userData)=>{
  if(userData){
    try{
      const following=await axios.get(`${BaseUrl}/User/followingId/${userData.userId}`);
      localStorage.setItem('FollowingList',JSON.stringify(following.data));
    }catch(error){
      console.log(error);
    }
  }
 }
 const updateUserData=async()=>{
  if(userDetails.userId){
    const response=await getUserDetailsById(userDetails.userId);
    setUserData(response);
  }
 }
 const updateUserBlockedList=async(userData)=>{
  if(userData){
    try{
      const blocked=await axios.get(`${BaseUrl}/User/blockedId/${userData.userId}`);
      localStorage.setItem('BlockedList',JSON.stringify(blocked.data));
    }catch(error){
      console.log(error);
    }
  }
 }
 const updateParticipantData=async(userData)=>{
  if (userData) {
    try{
  const participant=await axios.get(`${BaseUrl}/User/Participant/${userData.userId}`);
  if(participant.data){
    const rating=await axios.get(`${BaseUrl}/Participant/rating/${participant.data.participantId}`);
    const participantWithRating={
      ...participant.data,
      rating:rating.data,
    }
      localStorage.setItem('participantDetails',JSON.stringify(participantWithRating));
  }
  
  }
  catch(error){
    console.log(error);
  }
  }

 }
  const setUserData = async(user) => {
    if(user===null){
      console.log("null need only on logout");
      localStorage.setItem('participantDetails',JSON.stringify(user));
      localStorage.setItem('organizerDetails',JSON.stringify(user));
    }
    localStorage.setItem('userDetails', JSON.stringify(user));
  };
  return (
    <UserContext.Provider value={{ userDetails, organizerData, participantData,followersData,followingData,blockedData, setUserData, updateOrganizerData,updateParticipantData,updateUserBlockedList,updateUserFollowersList,updateUserFollowingList,updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { userDetails,organizerData,participantData, setUserData, followersData, followingData,blockedData ,updateOrganizerData,updateParticipantData,updateUserFollowersList,updateUserBlockedList,updateUserFollowingList,updateUserData} = useContext(UserContext);
  const storedUserDetails = localStorage.getItem('userDetails');
  updateOrganizerData(JSON.parse(storedUserDetails));
  updateUserBlockedList(JSON.parse(storedUserDetails));
  updateUserFollowersList(JSON.parse(storedUserDetails));
  updateUserFollowingList(JSON.parse(storedUserDetails));
  updateParticipantData(JSON.parse(storedUserDetails));
  useEffect(() => {
    if (!userDetails && storedUserDetails) {
      setUserData(JSON.parse(storedUserDetails));
    }
  }, [userDetails, setUserData]);
 
  return { userDetails,organizerData,participantData,followersData,followingData,blockedData, setUserData ,updateOrganizerData,updateParticipantData,updateUserBlockedList,updateUserFollowersList,updateUserFollowingList,updateUserData};
};