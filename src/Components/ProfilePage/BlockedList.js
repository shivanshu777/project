import { Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { useUser } from '../Auth/UserContext';
import { getAllBlocked } from '../Files/User_profile_avator';
import { useNavigate } from 'react-router-dom';
function BlockedList() {
  const {userDetails}=useUser();
  const [dataSource,setDataSource]=useState([])
  const navigate=useNavigate();
  useEffect(()=>{
    const fetch=async()=>{
      const res=await getAllBlocked(userDetails.userId);
      setDataSource(res);
    }
    fetch();
  },[])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() =>navigate(`/profileFollow/${record.userId}`)}>View</Button>
      ),
    },
  ]
  return (
    <div style={{display:'flex',flexDirection:'row',height:'100%',justifyContent:'space-evenly'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'20%',fontSize:'50px',backgroundColor:'whitesmoke'}}>
        {dataSource?.length}
      </div>
      <Divider type='vertical' style={{borderWidth:'3px'}}/>
      <div style={{width:'100%', height:'100%'}}>
      <Table dataSource={dataSource} columns={columns}/>
      </div>
    </div>
  )
}

export default BlockedList