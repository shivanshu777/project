import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Profile.css';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TabView, TabPanel } from 'primereact/tabview';
import { Avatar, message, Upload } from 'antd';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from '../Auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import ProfileBottom from './ProfileBottom';

export default function ProfilePage() {
 
  const {userDetails}=useUser();
  const navigate=useNavigate();
  
  return userDetails ? (
    <section style={{ backgroundColor: 'rgb(151, 235, 207)', marginTop:'10vh',minHeight:'100%', width:'100%' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4 profile-left-info">
            <MDBCard className="mb-4" style={{height:"100%"}}>
              <MDBCardBody className="text-center">
                <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <img src={userDetails.userProfile} style={{height:'300px',width:'300px',borderRadius:'50%'}}/>
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
                    <MDBCardText className="text-muted">{userDetails.userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.userEmail}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Date of Birth</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.dateOfBirth}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>About</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.aboutUser}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div style={{marginTop:'10px', padding:'10px',height:'400px',width:'100%'}}>
           <ProfileBottom />
        </div>
       
      </MDBContainer>
    </section>
  ):( <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={()=>navigate("/")}>Back Home</Button>}
  />);
}
