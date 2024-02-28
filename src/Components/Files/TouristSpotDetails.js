import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { BaseUrl } from "../config/BaseUrl";
import { message } from "antd";
import { getUserDetailsById } from "./User_profile_avator";
export const pictureUrl = (image) => {
  return `data:image/jpeg;base64,${image}`;
};
export const fetchSpotBySpotName = async (spotName) => {
  try {
    console.log(spotName);
    const response = await axios.get(`${BaseUrl}/spot/${spotName}`);
    console.log(response);
    const picture = await axios.get(
      `${BaseUrl}/spot/pictureList/${response.data.spotId}`
    );
    const imageList = picture.data.map((pic) => {
      return pictureUrl(pic);
    });
    return {
      ...response.data,
      spotPictureList: imageList,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const fetch_spot_data = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/spots`);
    const spotwithpicture = await Promise.all(
      response.data.map(async (spot) => {
        const picture = await axios.get(
          `${BaseUrl}/spot/pictureList/${spot.spotId}`
        );
        const imageList = picture.data.map((pic) => {
          return pictureUrl(pic);
        });
        return {
          ...spot,
          spotPictureList: imageList,
        };
      })
    );
    console.log(spotwithpicture);
    return spotwithpicture;
  } catch (error) {
    console.log("error while fetching spot data ", error);
    return [];
  }
};

export const fetch_popularSpots = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/PopularSpots`);
    const spotwithpicture = await Promise.all(
      response.data.map(async (spot) => {
        const picture = await axios.get(
          `${BaseUrl}/spot/pictureList/${spot.spotId}`
        );
        const imageList = picture.data.map((pic) => {
          return pictureUrl(pic);
        });
        return {
          ...spot,
          spotPictureList: imageList,
        };
      })
    );

    return spotwithpicture;
  } catch (error) {
    console.log("error while fetching popular spots", error);
    return [];
  }
};

export const fetch_spots_by_id = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/spots/${id}`);
    const picture = await axios.get(
      `${BaseUrl}/spot/pictureList/${response.data.spotId}`
    );
    const imageList = picture.data.map((pic) => {
      return pictureUrl(pic);
    });
    return {
      ...response.data,
      spotPictureList: imageList,
    };
  } catch (error) {
    console.log("error while fetching spot by id", error);
    return [];
  }
};
export const postSpotComment=async(spotId,userId,comment,rating)=>{
  try{
    const response=await axios.post(`${BaseUrl}/spot/${spotId}/feedback`,{userId:userId,feedback:comment,ratings:rating});
    message.success(response.data);
  }catch(error){
    console.log(error);
  }
}

export const fetchSpotComments=async(spotId)=>{
  try{
    const response=await axios.get(`${BaseUrl}/spot/${spotId}/feedback`);
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