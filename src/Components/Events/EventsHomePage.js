import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './EventsHome.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {IoMdRadioButtonOn} from 'react-icons/io'
import {fetch_Event_Details, fetch_popularEvents} from '../Files/Event_Details'
import Loading from '../LoadingComponents/Loading'
import SingleEvent from './SingleEvent'
import { Carousel, Empty } from 'antd'


const EventsHomePage = () => {
    const [eventDetails,setEventDetails]=useState([{}]);
    const [popularEvents,setPopularEvents]=useState([{}]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchData=async()=>{
        try{
            const response=await fetch_Event_Details();
            const response1=await fetch_popularEvents();
            setEventDetails(response);
            setPopularEvents(response1);
        }catch(error){
            console.log("error while fetching event details",error);
        }
    }
    fetchData();
    },[])
    useEffect(()=>{
        console.log(eventDetails);
        setLoading(false);
    },[eventDetails])
    const contentStyle = {
      height: '500px',
      width: '100%',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };
  return !loading ? (
    <section className="main container section">
        <div style={{minHeight:'100vh'}}>
        <div className='top-slideshow-div' >
                    <Carousel autoplay>
                      <div>
                        <img className="mySlides" src="https://wallpaperaccess.com/full/6133725.jpg" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://liveeventproductions.co.uk/wp-content/uploads/2018/01/event-production-services-live-event-productions-banner-image-4.jpg" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://wallpaperaccess.com/full/2489735.jpg" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://th.bing.com/th/id/R.57ea724bd5e16a37ccd1e54966169406?rik=gqlJFPll8guZCg&riu=http%3a%2f%2fwww.stagingdimensions.com.au%2fcontent%2fimages%2fthumbs%2f0001272_cotton-club-gatsby.jpeg&ehk=XFAQOwnAYOqxO45G704BTIak9sD6SIQQT7Uq9ZP9pFU%3d&risl=&pid=ImgRaw&r=0" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://wallpapercave.com/wp/wp7488400.jpg" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://s3-media1.fl.yelpcdn.com/bphoto/oPVG4wXUdpyYXfJ4jg5-Mw/o.jpg" style={contentStyle} />
                      </div>
                      <div>
                        <img className="mySlides" src="https://www.jettext.net/wp-content/uploads/2021/11/Creamfields-10-Worlds-Wildest-Parties-Jet-Text-Blog.jpg" style={contentStyle} />
                      </div>
                    </Carousel>
            </div>
        <div className="secTitle" >
            <h1 data-aos='fade-right' className="title">
                Popular events ....
            </h1>
        </div>
 
        <div className="secContent grid">
        {popularEvents && popularEvents.length > 0 ? (
  popularEvents.map(({ eventId, eventPictureList, eventName, location, description }) => {
    return (
      <SingleEvent eventId={eventId} eventPictureList={eventPictureList} eventName={eventName} location={location} description={description} />
    );
  })
) : (
  <Empty/>
)}

        </div>
 
        <br />
        <br />
 
        <div className="secTitle">
            <h1 data-aos='fade-right' className="title">
                All events .....
            </h1>
        </div>
        <div className="secContent grid">
        {eventDetails && eventDetails.length > 0 ? (
  eventDetails.map(( { eventId, eventPictureList, eventName, location, description }) => {
    return (
      <SingleEvent eventId={eventId} eventPictureList={eventPictureList} eventName={eventName} location={location} description={description} />
    );
  })
) : (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
)}
     </div></div>
    </section>
  ):(
    <>loading....</>
  )
}
 
export default EventsHomePage