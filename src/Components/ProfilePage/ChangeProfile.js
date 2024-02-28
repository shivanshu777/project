import { LoadingButton } from '@mui/lab';
import { Button, Divider } from '@mui/material';
import { upload } from '@testing-library/user-event/dist/upload';
import React, { useState } from 'react';
import { useUser } from '../Auth/UserContext';
import { UploadUserProfile } from '../Files/User_profile_avator';
import { Avatar, message } from 'antd';

function ChangeProfile({onClose,render}) {
  const {userDetails,updateUserData}=useUser();
  const [previewImage, setPreviewImage] = useState(userDetails.userProfile);
  const [profileImage,setProfileImage] = useState(null);
  const [UploadProcess,setUploadProcess]=useState(false);
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if(file){
      const filesize=file.size;
    if(filesize > (500 * 1024)){
      message.error("Image should be below 500kb.")
      return 
    }
    }
    
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const beforeUpload=async()=>{  
    const formData = new FormData();
    formData.append("profilePicture", profileImage); // Corrected key name to match backend
    await UploadPicture(formData);
  }
  const UploadPicture=async(formData)=>{
    try{
      setUploadProcess(true);
      const upload=await UploadUserProfile(userDetails.userId,formData);
      updateUserData();
      onClose();
    }catch(error){
      console.log(error);
    }
    setUploadProcess(false);
  }
  return (
    <div>
      <div>ChangeProfile</div>
      <Divider style={{margin:'10px'}}/>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <input type="file" onChange={handleFileChange} />
      {previewImage && (
        <>
          <h2>Preview</h2>
          <Avatar src={previewImage} alt="Preview" style={{ width: '200px', height: '200px', borderRadius:'50%',objectFit:'cover' }} />
          <LoadingButton variant='contained' style={{padding:'10px',marginTop:'10px'}} loading={UploadProcess} onClick={()=>{beforeUpload()}} disabled={previewImage===userDetails.userProfile}>Upload</LoadingButton> 
        </>
      )}
      </div>
      
    </div>
  );
}

export default ChangeProfile;
