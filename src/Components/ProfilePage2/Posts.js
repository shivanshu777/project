import {

  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,

} from '@ant-design/icons';
import ImageList from '@mui/material/ImageList';
import React, { useEffect, useState } from 'react';
import { Image, Space, message } from 'antd';
import { getUserPosts } from '../Files/User_profile_avator';
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router';

function Posts() {
  const { userId } = useParams();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserPosts(userId);
        setUserPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      {userPosts.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ImageList sx={{ width: '100%', height: 350 }} cols={4}>
            {userPosts?.map((item) => (
              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '200px', height: '220px' }}>
                <Image
                  width={200}
                  height={200}
                  src={item.postUrl}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight },
                      },
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                      </Space>
                    ),
                  }}
                />
                <div style={{ overflowY: 'auto', maxHeight: '50px', scrollbarWidth: 'none', '-ms-overflow-style': 'none', '::-webkit-scrollbar': { display: 'none' } }}>
                  <Typography>{item.description}</Typography>
                </div>
              </div>
            ))}
          </ImageList>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', height: '400px', justifyContent: 'center' }}>
          nothing posted
        </div>
      )}
    </>
  );
}

export default Posts;
