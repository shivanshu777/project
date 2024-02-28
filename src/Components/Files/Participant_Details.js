import { message } from "antd";
import axios from "axios";
import { fetchOrganizerDataById } from "./Organzier_Details";
import { BaseUrl } from "../config/BaseUrl";
export const participantJoining=async(value)=>{
    try{
        const response=await axios.post(`${BaseUrl}/Participant`,value);
        if(response.status===200){
            return alert(response.data);
        }
    }catch(error){
        if(error.response.status===409){
            console.log(error)
            return alert(error.response.data);
        }else{
            console.log(error)
            return alert(error.response.data);
        }
    }
}
export const fetchParticipatedGroups=async(userId)=>{
    try{
        const response=await axios.get(`${BaseUrl}/Participant/allGroupsParticipated/${userId}`);
        const groupWithOrganizerData=await Promise.all(
            response.data.map(async(group)=>{
                const res=await fetchOrganizerDataById(group.organizerId);
                return {
                    ...group,
                    organizerData: res,
                }
            })
        )
        return groupWithOrganizerData;
    }catch(error){
        console.log(error);
        return [];
    }
}
export const participantLeaving=async(participantId,groupId)=>{
    try{
        const response=await axios.get(`${BaseUrl}/Participant/leaveGroupByParticipantId`,{params:{
            participantId:participantId,
            groupId:groupId,
        }});
        message.success(response.data);
    }catch(error){
        message.error(error.response.data);
    }
}

export const fetchParticipantByUserId=async(userId)=>{
    try{
        const response=await axios.get(`${BaseUrl}/Participant/userId/${userId}`);
        const rating=await axios.get(`${BaseUrl}/Participant/rating/${response.data.participantId}`);
        return rating.data;
    }catch(error){
        console.log(error);
    }
}
export const giveParticipantRating=async(participantId,userId,rating)=>{
    try{
        const rasponse=await axios.post(`${BaseUrl}/Participant/rating/${participantId}`,{userId:userId,rating:rating});
    }catch(error){
        console.log(error);
    }
}