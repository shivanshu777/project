import { message } from "antd";
import axios from "axios"
import { BaseUrl } from "../config/BaseUrl";
export const pictureUrl = (image) => {
  return `data:image/jpeg;base64,${image}`;
};

export const updateUserDetails=async(value)=>{
  try{
    const updateUser=await axios.put(`${BaseUrl}/User/updateUser/${value.userId}`,value);
    const picture=await axios.get(`${BaseUrl}/User/userProfile/${updateUser.data.userId}`);
    return {
      ...updateUser.data,
      userProfile:pictureUrl(picture.data)
    };
  }catch(error){
    console.log(error);
    return null;
  }
}
export const updatePassword = async (userId, password) => {
  try {
    const updateUser = await axios.put(`${BaseUrl}/User/changePassword/${userId}`,null, {params:{
      userPassword: password,
    }
    });
    message.success(updateUser.data);
  } catch (error) {
    console.log(error) // Accessing error response data directly
  }
};

export const updateEmail = async (userId, email) => {
  try {
    const updateUser = await axios.put(`${BaseUrl}/User/updateEmail/${userId}`, {
      userEmail: email
    });
    message.success(updateUser.data);
  } catch (error) {
    message.error(error.response.data); // Accessing error response data directly
  }
};
export const getUserPosts=async(userId)=>{
  try{
    const posts=await axios.get(`${BaseUrl}/User/userPost/${userId}`);
    const postsUrl=posts.data.map(post=>{
      const postUrl=pictureUrl(post.post)
      return {
        ...post,
        postUrl:postUrl
      };
    })
    return postsUrl;
  }catch(error){
    console.log(error);
    return []
  }
}
export const getAllFollowers=async(userId)=>{
  try{
    const response=await axios.get(`${BaseUrl}/User/getAllFollowers/${userId}`)
    return response.data;
  }catch(error){
    console.log(error);
    return [];
  }
}
export const getAllFollowing=async(userId)=>{
  try{
    const response=await axios.get(`${BaseUrl}/User/getAllFollowing/${userId}`)
    return response.data;
  }catch(error){
    console.log(error);
    return [];
  }
}
export const getAllBlocked=async(userId)=>{
  try{
    const response=await axios.get(`${BaseUrl}/User/getAllBlocked/${userId}`)
    return response.data;
  }catch(error){
    console.log(error);
    return [];
  }
}
export const getUserDetailsById=async(value)=>{
  try{
    const fetchUser=await axios.get(`${BaseUrl}/User/${value}`);
    const picture=await axios.get(`${BaseUrl}/User/userProfile/${value}`);
    return {
      ...fetchUser.data,
      userProfile:pictureUrl(picture.data)
    };
  }catch(error){
    console.log(error);
  }
}
export const getUserDetails=async(value)=>{
  try{
    const fetchUser=await axios.get(`${BaseUrl}/User/email/${value}`);
    const picture=await axios.get(`${BaseUrl}/User/userProfile/${fetchUser.data.userId}`);
    console.log(picture.data);
    return {
      ...fetchUser.data,
      userProfile:pictureUrl(picture.data)
    };
  }catch(error){
    console.log("error occured while fetching user data :", error);
  }
}
export const registerUser=async(value)=>{
  try{
    await axios.post(`${BaseUrl}/User`,value).then((response)=>{return (response.status)})
  }catch(error){
    console.log("error occured while registering user :", error)
  }
}
export const generateOtp=async(value)=>{
  console.log(" otp rendered")
  try{
    const response=await axios.get(`${BaseUrl}/User/otp/${value}`);
    const otp=response.data;
    console.log("otp obtained "+otp+ "response obtained "+response);
    return otp
  }catch(error){
    console.log("error while sending otp :",error)
  }
}
export const UploadUserProfile=async(userId,profile)=>{
  try{
    console.log(profile);
    const response=await axios.post(`${BaseUrl}/User/updateProfile/${userId}`,profile);
    message.success(response.data);
  }catch(error){
    console.log(error);
  }
}
export const uploadUserPost=async(userId,formdata)=>{
  try{
    const response=await axios.post(`${BaseUrl}/User/userPost/${userId}`,formdata,{headers:{'Content-Type':'multipart/form-data',},});
    message.success(response.data);
  }catch(error){
    message.error(error.response.data);
  }
}
