import NavBar from '../NavBar/NavBar'
import { useParams } from 'react-router-dom'
import '../Events/Event.css'
import {fetchSpotBySpotName, fetch_spot_data, fetch_spots_by_id } from '../Files/TouristSpotDetails';
import Footer from '../Footer/Footer';
import Loading from '../LoadingComponents/Loading';
import { useEffect, useState } from 'react';
import GroupOrganizeForm from '../Group/GroupOrganizeForm';
import { useUser } from '../Auth/UserContext';
import GroupJoinPage from '../Group/GroupJoinPage';
import { Alert } from '@mui/material';
import AlertCom from '../AlertCom';
import { Galleria } from 'primereact/galleria';
import FeedBack from '../Feedback/FeedBack';
import NearByTouristSpots from '../Suggestions/NearByTouristSpots';
function TouristSpot() {
  const {userDetails,participantData,organizerData}=useUser();
  const [spot,setSpots]=useState({});
  const [alert,setAlert]=useState(false);
  const [open, setOpen] = useState(false);
  const {spotName} = useParams();
  useEffect(()=>{
      const fetchData = async () => {
      try {
        const response1 = await fetchSpotBySpotName(spotName);
        setSpots(response1);
      } catch (error) {
        console.log("Error while fetching event data:", error);
      }
    };
    fetchData();
  },[spotName])

 const handleAlertClose=()=>{
  setAlert(false);
 }
  useEffect(()=>{
  console.log(spot);
  },[spot])


  const handleClickListItem = () => {
    if(((!organizerData || organizerData.organizerStatus=="Free") && (!participantData || participantData.participantStatus=="Free"))){
      setOpen(true);
    }
    else{
      setAlert(true);
    }
    
  };
  const handleClose = () => {
    setOpen(false);
    setOrganizeFormVisible(false);
  }
  const handleOrganizeClick = () => {
    if(((!organizerData || organizerData.organizerStatus=="Free") && (!participantData || participantData.participantStatus=="Free"))){
      setOrganizeFormVisible(true);
    }
    else{
      setAlert(true);
    }
  };
  const [organizeFormVisible, setOrganizeFormVisible] = useState(false);


const getStatus = () => {
  const lowThreshold = 50;
  const mediumThreshold = 100;

  if (spot.peopleCount < lowThreshold) {
    return 'Low';
  } else if (spot.peopleCount < mediumThreshold) {
    return 'Medium';
  } else {
    return 'High';
  }
};
const handleOrganizeSubmit = (formData) => {
  console.log('Organize Form Data:', formData);
  setOrganizeFormVisible(false);
};
const responsiveOptions = [
  {
      breakpoint: '100px',
      numVisible: 4
  },
  {
      breakpoint: '100px',
      numVisible: 3
  },
  {
      breakpoint: '100px',
      numVisible: 1
  }
];
const itemTemplate = (item) => {
  return <img src={item} alt={item} style={{ minWidth: '500px',height:'500px',objectFit:'cover' }} />
}

const thumbnailTemplate = (item) => {
  return <img src={item} alt={item} style={{height:'70px',width:'100%'}}/>
}
  return (
    <div className='front-page' style={{marginTop:'50px'}}>
       <div className='event-page' style={{minHeight:'100vh'}}>
        <div className='content-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='event-content' style={{ display: 'flex', flexDirection: 'column', width: '200vh', justifyContent: 'center', position: 'relative' }}>
    {spot ? (
          <>
          <div style={{width:'100%'}}>
          <Galleria value={spot.spotPictureList} responsiveOptions={responsiveOptions} circular numVisible={3} autoPlay transitionInterval={3000} item={itemTemplate} thumbnail={thumbnailTemplate}/>
          </div>
          
          
          <div className='content-details' style={{backgroundColor:'#b1f2f2',color:'black',display:'flex',flexDirection:'row',borderRadius:'10px',justifyContent:'space-between',padding:"30px 180px 30px 180px",alignItems:'center'}}>
            <label><strong>SPOT NAME: </strong><h1>{spot.spotName}</h1></label>
            <label><strong>SPOT LOCATION:</strong> {spot.location?.street},{spot.location?.city},{spot.location?.state},{spot.location?.country},{spot.location?.postalCode}</label>
            <label><strong>SPOT DESCRIPTION:</strong> {spot.description}</label>
            <label><strong>PEOPLE COUNT:</strong> {getStatus()}</label>
            <div className='join-organize-button' >
              <button onClick={handleClickListItem} >Join</button>
              <button onClick={handleOrganizeClick} >Organize</button>
            </div>
            </div>
            <GroupJoinPage
          id="ringtone-menu"
          keepMounted
          eventName={null}
          spotName={spot.spotName}
          open={open}
          onClose={()=>handleClose()}
        />
          <GroupOrganizeForm id="ringtone-menu"
          keepMounted
          spotName={spot.spotName}
          open={organizeFormVisible}
          onClose={()=>handleClose()} onSubmit={()=>handleOrganizeSubmit()} />
          <div>
            <NearByTouristSpots/>
          </div>
          <div style={{padding:'5px'}}>
            <FeedBack spotId={spot?.spotId}/>
          </div>
          </> 
        ) : (
          <Loading/>
        )}
    </div>
        </div>
        
    </div>
    {alert && (
      <AlertCom onOpen={true} onClose={handleAlertClose} title={"Alert"} body={"You are already busy in other groups."}/>
    )}
    </div>
  );
}

export default TouristSpot;
