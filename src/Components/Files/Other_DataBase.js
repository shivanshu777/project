import axios from "axios";
import { useState } from "react";
import { getUserDetailsById } from "./User_profile_avator";
import { message } from "antd";
import { BaseUrl } from "../config/BaseUrl";

export const forgotPassword=async(userEmail)=>{
    try{
        await axios.post(`${BaseUrl}/User/forgotPassword`,null,{
            params:{
                userEmail:userEmail
            }
        }).then((response)=>{console.log(response.data)});
        alert("check your email for new password");
    }
    catch(error){
        console.log("error while sending forgotPassword Request : "+error)
    }
}
export const sendAdminFeedBack=async(userId,feedBack,indicate)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/adminFeedBack`,{userId:userId,feedBack:feedBack,indicate:indicate});
        message.success(response.data);
    }catch(error){
        console.log(error);
    }
}
export const allSpotTitle=async()=>{
    console.log('renders')
    try{
        const getTitle=await axios.get(`${BaseUrl}/spots`);
        const title=getTitle.data.map((spot)=>{
            return{
                ...spot,
                Name:spot.spotName,
                id:spot.spotId
            }
        })
        return title;
    }catch(error){
        console.log(error);
        return [];
    }
}
export const getMessagesOfGroupId=async(groupId)=>{
    try{
        const response=await axios.get(`${BaseUrl}/Group/messages/${groupId}`);
        const response1= await Promise.all(response.data.map(async(message)=>{
            const user=await getUserDetailsById(message.userId);
            return {
                ...message,
                userData:user
            }
        }))
        return response1;
    }catch(error){
        console.log(error);
        return [];
    }
}
export const sendingMessage=async(groupId,messageContent)=>{
    try{
        const response=await axios.post(`${BaseUrl}/Group/messages/${groupId}`,messageContent);
    }catch(error){
        console.log(error);
    }
}
export const allEventTitle=async()=>{
    console.log('renders')
    try{
        const getTitle=await axios.get(`${BaseUrl}/activeEvents`);
        const title=getTitle.data.map((event)=>{
            return{
                ...event,
                Name:event.eventName,
                id:event.eventId
            }
        })
        return title;
    }catch(error){
        console.log(error);
        return [];
    }
}
export const deleteUserPost=async(userId,post)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/deletePost/${userId}`,post,{headers:{"Content-Type":'application/form-data'}});
        message.success(response.data);
    }catch(error){
        console.log(error);
    }
}

export const userFollowParticipant=async(userId,participantId)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userFollowing`,null,{params:{userId:userId,followingId:participantId,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}

export const userUnfollowParticipant=async(userId,participantId)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userUnfollowing`,null,{params:{userId:userId,followingId:participantId,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}
export const userBlockingParticipant=async(userId,participantId)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userBlocking`,null,{params:{userId:userId,blockingId:participantId,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}

export const userFollowOrganizer=async(userId,organizerId)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userFollowing`,null,{params:{userId:userId,followingId:organizerId,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}

export const userUnfollowOrganizer=async(userId,organizerId)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userUnfollowing`,null,{params:{userId:userId,followingId:organizerId,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}
export const userBlockingUser=async(userId,userId2)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userBlocking`,null,{params:{userId:userId,blockingId:userId2,},});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}
export const userUnBlockingUser=async(userId,userId2)=>{
    try{
        const response=await axios.post(`${BaseUrl}/User/userUnBlocking`,null,{params:{userId:userId,blockedUserId:userId2}});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
        console.log(error);
    }
}