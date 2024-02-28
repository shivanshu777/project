import { Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useUser } from '../Auth/UserContext'
import { Button, Rating } from '@mui/material';
import { fetchOrganizedGroups } from '../Files/Organzier_Details';
import { Tab } from 'bootstrap';

function UserOrganizedDetails() {
  const {organizerData,userDetails}=useUser();
  const [dataSource,setDataSource]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetchOrganizedGroups(userDetails?.userId);
      setDataSource(response);
    }
    fetchData();
  },[])
  
  
  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'name',
    },
    {
      title: 'Organizer Name',
      render: (record) => record.organizerData?.userData?.userName,
      key: 'address',
    },
    {
      title: 'Start Date',
      dataIndex: 'dateFrom',
      key: 'age',
    },
    {
      title: 'End Date',
      dataIndex: 'dateTo',
      key: 'address',
    },
    {
      title: 'Total Participant',
      dataIndex: 'participantsLimit',
      key: 'address',
    },
    {
      title: 'spot/event',
      render: (record)=>record.eventName? record.eventName:record.spotName,
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex:'groupStatus',
      key: 'groupStatus',
    }
  ]
  return (
    <div style={{display:'flex',flexDirection:'row',height:'100%'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'20%',fontSize:'50px',backgroundColor:'whitesmoke'}}>
        {organizerData? organizerData.organizedCount: "0"}
      </div>
      <Divider type='vertical' style={{borderWidth:'3px'}}/>
      <div style={{width:'100%', height:'300px'}}>{console.log(organizerData)}
      <label style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px'}} >Your Organizer Rating  <Rating readOnly value={organizerData?.rating?.rating}/> </label>
      <Table dataSource={dataSource} columns={columns}/>
      </div>
    </div>
  )
}

export default UserOrganizedDetails