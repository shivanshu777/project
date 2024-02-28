import { Avatar, Badge, Button, CircularProgress, Divider, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import './ChatBox.css';
import { useUser } from '../Auth/UserContext';
import { getMessagesOfGroupId, sendingMessage } from '../Files/Other_DataBase';
import { LoadingButton } from '@mui/lab';

function ChatBox({group, organizer}) {
  const {userDetails} = useUser();
  const [message, setMessage] = useState('');
  const [render, setRender] = useState(false);
  const [messageProcess, setMessageProcess] = useState(false);
  const [messageForm, setMessageForm] = useState({
    userId: userDetails.userId
  });
  const [groupMessages, setGroupMessages] = useState([]);

  const handleMessage = () => {
    setMessageForm({
      ...messageForm,
      content: message,
    });
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await getMessagesOfGroupId(group.groupId);
        setGroupMessages(response);
      } catch(error) {
        console.log(error);
      }
    };
    getMessages();
  }, [render]);

  const sendMessage = async () => {
    try {
      setMessageProcess(true);
      await sendingMessage(group.groupId, messageForm);
      setRender(!render);
      setMessage('');
      setMessageProcess(false);
    } catch(error) {
      console.log(error);
      setMessageProcess(false);
    }
  };

  return (
    <div>
      <div><RefreshIcon style={{cursor:'pointer',position:'absolute'}} onClick={() => { setRender(!render) }} /></div>
      <div className='chatBox' style={{ width: "85vh", height: '70vh', borderRadius: '5px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'flex-end' }}>
        {groupMessages.length > 0 ? (
          <div className='messages-box' style={{ display: 'flex', flexDirection: 'column', justifyItems: 'flex-end', overflow: 'hidden', overflowY: 'scroll' }}>
            {groupMessages.map((message, index) => (
              <React.Fragment key={index}>
                {index > 0 && new Date(groupMessages[index - 1].time).toDateString() !== new Date(message.time).toDateString() && (
                  <Divider>
                    {new Date(message.time).toLocaleDateString()}
                  </Divider>
                )}
                <div className={`message ${index === 0 ? 'first-message' : ''}`} style={{
                  ...userDetails.userId == message.userId
                    ? { display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start', padding: '5px' }
                    : { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '5px' }
                }}>
                  {index !== 0 && (
                    <>
                      <Badge color='primary' variant={(organizer.userId === message.userId) && "dot"}>
                        <Tooltip title={`Name: ${message.userData.userId === userDetails.userId ? "me" : message.userData.userName} Time: ${new Date(message.time).toLocaleTimeString()}`} >
                          <Avatar src={message.userData.userProfile} sx={{ height: '20px', width: '20px', margin: '4px' }} />
                        </Tooltip>
                      </Badge>
                      <div style={{ backgroundColor: 'wheat', borderRadius: '5px', padding: '5px' }}>{message.content}</div>
                    </>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'GrayText' }}>Welcome to group chat</div>
        )}
        <Divider />
        <div className='message-text-area' style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', padding: '5px' }}>
          <Avatar src={userDetails.userProfile} sx={{ width: 25, height: 25, marginRight: '5px' }} />
          <textarea style={{ width: '100%', height: '30px', border: 'none', resize: 'none', outline: 'none', backgroundColor: 'white', padding: '0px 4px 0px 4px', marginRight: '10px' }} placeholder='type your message here' value={message} onChange={(e) => setMessage(e.target.value)} onBlur={handleMessage} />
            <LoadingButton variant='outlined' sx={{}} onClick={sendMessage} disabled={!message.trim()} loading={messageProcess} loadingIndicator={<CircularProgress sx={{ color: 'blue', height: '15px', width: '15px' }} />}>
              <SendIcon sx={{ color: 'blue' }} />
            </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
