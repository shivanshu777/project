import axios from "axios";
import { getUserDetailsById } from "./User_profile_avator";
import { BaseUrl } from "../config/BaseUrl";
import { message } from "antd";
export const fetchOrganizerDataByUserId=async(userId)=>{
  try{
    const organizer=await axios.get(`${BaseUrl}/organizer/userId/${userId}`);
    const rating=await axios.get(`${BaseUrl}/organizer/ratings/${organizer.data.organizerId}`);
    return(rating.data);
  }catch(error){
    console.log(error);
  }
}
export const fetchOrganizerDataById = async(id)=>{
    try{
      const organizer = await axios.get(`${BaseUrl}/organizer/organizerId/${parseInt(id)}`)
      const rating=await axios.get(`${BaseUrl}/organizer/ratings/${organizer.data.organizerId}`);
      const organizerWithUserData= await getUserDetailsById(organizer.data.userId);
      return {
        ...organizer.data,
        organizerRating:rating.data,
        userData:organizerWithUserData,
      }
      
    }catch(error){
      console.log("error while fetching organizer by Id :" + error);
    }
  }

  export const fetchOrganizedGroups=async(userId)=>{
    try{
        const response=await axios.get(`${BaseUrl}/organizer/allGroupsOrganizedByOrganizer/${userId}`);
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

export const giveOrganizerRating=async(organizerId,userId,rating)=>{
  try{
    const response=await axios.post(`${BaseUrl}/organizer/ratings/${organizerId}`,{userId:userId,rating:rating});
    message.success(response.data);
  }catch(error){
    console.log(error);
    message.error(error.response.data);
  }
}