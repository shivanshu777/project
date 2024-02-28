import { useParams } from 'react-router-dom'
import './Event.css'
import { Event_Details, fetchEventByEventName, fetch_Event_By_id } from '../Files/Event_Details';
import Loading from '../LoadingComponents/ContentLoading';
import { useEffect, useState } from 'react';
import GroupOrganizeForm from '../Group/GroupOrganizeForm';
import { useUser } from '../Auth/UserContext';
import GroupJoinPage from '../Group/GroupJoinPage';
import AlertCom from '../AlertCom';
import { Galleria } from 'primereact/galleria';
import FeedBack from '../Feedback/FeedBack';
import NearByEvents from '../Suggestions/NearByEvents';
import NearByTouristSpots from '../Suggestions/NearByTouristSpots';

function Event() {
  const [event, setEvent] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add state for current image index
  const { userDetails, participantData, organizerData } = useUser();
  const [alert, setAlert] = useState(false);
  const [organizeFormVisible, setOrganizeFormVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAlert = () => {
    setAlert(!alert);
  }
console.log(participantData,organizerData)
  const handleClickListItem = () => {
    if (((!organizerData || (organizerData.organizerStatus == "Free")) && (!participantData || (participantData.participantStatus == "Free")))) {
      setOpen(true);
    } else {
      setAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setAlert(false);
  }

  const handleClose = () => {
    setOpen(false);
    setOrganizeFormVisible(false);
  }

  const getStatus = () => {
    const lowThreshold = 50;
    const mediumThreshold = 100;

    if (event.peopleCount < lowThreshold) {
      return 'Low';
    } else if (event.peopleCount < mediumThreshold) {
      return 'Medium';
    } else {
      return 'High';
    }
  };

  const { eventName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEventByEventName(eventName);
      setEvent(response);
    }
    fetchData();
  }, [eventName])

  const handleOrganizeClick = () => {
    if (((!organizerData || (organizerData.organizerStatus == "Free")) && (!participantData || (participantData.participantStatus == "Free")))) {
      setOrganizeFormVisible(true);
    } else {
      setAlert(true);
    }
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

  const handleOrganizeSubmit = (formData) => {
    console.log('Organize Form Data:', formData);
    setOrganizeFormVisible(false);
  };

  const itemTemplate = (item) => {
    return <img src={item} alt={item} style={{ width: '100%',height:'500px',objectFit:'cover' }} />
}

const thumbnailTemplate = (item) => {
    return <img src={item} alt={item} style={{height:'70px',width:'100%'}}/>
}

  return (
    <div className='front-page' style={{marginTop: '50px'}}>
      <div className='event-page' style={{ minHeight: '100vh' }}>
        <div className='content-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='event-content' style={{ display: 'flex', flexDirection: 'column', width: '200vh', justifyContent: 'center', position: 'relative' }}>
            {event ? (
              <>
              <div style={{width:'100%'}}>
                <Galleria value={event.eventPictureList} responsiveOptions={responsiveOptions} circular numVisible={3} autoPlay transitionInterval={3000} style={{width:'100%',objectFit:'cover'}} item={itemTemplate} thumbnail={thumbnailTemplate}/>
              </div>
               

                <div className='content-details' style={{backgroundColor:'#b1f2f2',color:'black',display:'flex',flexDirection:'row',borderRadius:'10px',justifyContent:'space-between',padding:"30px 180px 30px 180px",alignItems:'center'}}>
                  <div style={{}}>
                    <label><strong>EVENT NAME:</strong> <h1>{event.eventName}</h1></label>
                  <label><strong>EVENT HAPPENING ON: </strong><p>{event.startDate} = {event.endDate}</p></label>
                  <label><strong>EVENT DESCRIPTION:</strong> <p>{event.description}</p></label>
                  <label><strong>EVENT ADDRESS:</strong> <p>{event.location?.street},{event.location?.city},{event.location?.state},{event.location?.country},{event.location?.postalCode}</p></label>
                  <label><strong>PEOPLE COUNT:</strong> {getStatus()}</label>
                  </div>
                  <div className='join-organize-button' style={{height:'50px'}}>
                    <button onClick={handleClickListItem}>Join</button>
                    <button onClick={handleOrganizeClick}>Organize</button>
                  </div>
                  <GroupJoinPage
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    eventName={event.eventName}
                    spotName={null}
                    onClose={handleClose}
                  />
                  {event && (
                    <GroupOrganizeForm
                      id="ringtone-menu"
                      keepMounted
                      event={event}
                      eventName={event.eventName}
                      open={organizeFormVisible}
                      onClose={handleClose}
                      onSubmit={handleOrganizeSubmit}
                    />
                  )}
                </div>
                <div>
                  <NearByEvents eventId={event?.eventId}/>
                  </div>
                <div style={{padding:'5px',marginTop:'20px'}}>
                  <FeedBack eventId={event?.eventId}/>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      {alert && (
        <AlertCom onOpen={true} onClose={handleCloseAlert} title={"Alert"} body={"You are already busy with your group."} />
      )}
    </div>

  );
}

export default Event;
