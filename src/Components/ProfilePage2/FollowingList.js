import { Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllFollowing } from '../Files/User_profile_avator';
import { useUser } from '../Auth/UserContext';
import { useParams } from 'react-router';
function FollowingList() {
  const {userId}=useParams();
  const [dataSource,setDataSource]=useState([])
  useEffect(()=>{
    const fetch=async()=>{
      const res=await getAllFollowing(userId);
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
      dataIndex: 'button'
    }
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

export default FollowingList