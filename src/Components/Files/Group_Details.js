import axios from "axios";
import { getUserDetailsById } from "./User_profile_avator";
import { BaseUrl } from "../config/BaseUrl";
import { message } from "antd";

export const postGroup = async (value) => {
  try {
    const response = await axios.post(`${BaseUrl}/organizer`, value);

    if (response.status === 201) {
      message.success("You have created a group successfully.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 409) {
      alert(error.response.data);
    }
    console.log("error while creating group " + error);
    return false;
  }
};
export const getAllParticipantsById = async (grpId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/Participant/group/${grpId}`
    );
    const participantR=await Promise.all(
      response.data.map(async(participant)=>{
        const rating=await axios.get(`${BaseUrl}/Participant/rating/${participant.participantId}`);
        return {
          ...participant,
          participantRating:rating.data,
        }
      })
    )
    const participantWithUserData = await Promise.all(
      participantR.map(async (participant) => {
        const userData = await getUserDetailsById(participant.userId);
        console.log(userData);
        return {
          ...participant,
          userData: userData,
        };
      })
    );
    return participantWithUserData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getGroupById = async (grpId) => {
  console.log(grpId);
  try {
    const response = await axios.get(
      `${BaseUrl}/Group/groupId/${grpId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getGroup = async (eventName, spotName) => {
  try {
    if (eventName) {
      const response = await axios.get(
        `${BaseUrl}/event/group/${eventName}`
      );

      return response.data;
    } else if (spotName) {
      const response = await axios.get(
        `${BaseUrl}/spot/group/${spotName}`
      );
      return response.data;
    } else {
      console.log("no values");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
