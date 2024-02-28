import axios from "axios";
import { BaseUrl } from "../config/BaseUrl";
import { message } from "antd";
import { getUserDetailsById } from "./User_profile_avator";
export const pictureUrl = (image) => {
  return `data:image/jpeg;base64,${image}`;
};
export const fetch_Event_Details = async() => {
  try{
    const response=await axios.get(`${BaseUrl}/activeEvents`);
    const eventwithpicture=await Promise.all(
      response.data.map(async(event)=>{
        const picture=await axios.get(`${BaseUrl}/event/pictureList/${event.eventId}`);
        const imageList=picture.data.map(pic=>{
          return pictureUrl(pic);
        })
        return{
          ...event,
          eventPictureList:imageList,
        };
      })
    );
    console.log(eventwithpicture);
    return eventwithpicture;
  }catch(error){
    console.log(error);
    return [];
  }
}

export const fetch_Event_By_id=async(id)=>{
  try{
    const response=await axios.get(`${BaseUrl}/activeEvents/${id}`)
    const picture=await axios.get(`${BaseUrl}/event/pictureList/${response.data.eventId}`);
    const imageList=picture.data.map(pic=>{
      return pictureUrl(pic);
    })
    return {
      ...response.data,
      eventPictureList:imageList,
    };
  }catch(error){
    console.error(error);
    return [];
  }
}
export const fetchEventByEventName=async(eventName)=>{
  try{
    const response=await axios.get(`${BaseUrl}/activeEvent/${eventName}`);
    const picture=await axios.get(`${BaseUrl}/event/pictureList/${response.data.eventId}`);
    const imageList=picture.data.map(pic=>{
      return pictureUrl(pic);
    })
    const eventWithPicture={
      ...response.data,
      eventPictureList:imageList
    };
    return eventWithPicture;
  }catch(error){
    console.log(error);
  }
}
export const fetch_popularEvents=async()=>{
  try{
    const response=await axios.get(`${BaseUrl}/PopularEvents`);
    const eventwithpicture=await Promise.all(
      response.data.map(async(event)=>{
        const picture=await axios.get(`${BaseUrl}/event/pictureList/${event.eventId}`);
        const imageList=picture.data.map(pic=>{
          return pictureUrl(pic);
        })
        return{
          ...event,
          eventPictureList:imageList
        };
      })
    );
    return eventwithpicture;
  }catch(error){
    console.error(error);
    return [];
  }
}
export const postEventComment=async(eventId,userId,comment,rating)=>{
  try{
    const response=axios.post(`${BaseUrl}/event/${eventId}/feedback`,{userId:userId,feedback:comment,ratings:rating});
    message.success(response.data);
  }catch(error){
    console.log(error);
  }
}

export const fetchEventComments=async(eventId)=>{
  try{
    const response=await axios.get(`${BaseUrl}/event/${eventId}/feedback`);
    const responseWithUserData=await Promise.all(
      response.data.map(async(comment)=>{
        const userData=await getUserDetailsById(comment.userId);
        return{
          ...comment,
          userData:userData,
        };
      })
    )
    return responseWithUserData;
  }catch(error){
    console.log(error);
  }
}