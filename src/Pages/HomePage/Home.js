import React, { useState, useEffect, createRef, useDebugValue } from 'react'
import vid from './production_id_4063585 (1080p).mp4'
import './Home.css'
import EventComponent from '../../Components/Events/EventComponent'
import TouristSpotComponent from '../../Components/TouristSpots/TouristSpotComponent'
import { fetch_Event_Details, fetch_popularEvents } from '../../Components/Files/Event_Details'
import { fetch_popularSpots, fetch_spot_data } from '../../Components/Files/TouristSpotDetails'
import logo from '../../Assests/MicrosoftTeams-image (9).png';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
function Home() {
  const [eventDetails, setEventDetails] = useState([{}])
  const [spotDetails, setSpotDetails] = useState([{}])
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [spot, setSpot] = useState({});
  const [currentEvent, setCurrentEvent] = useState(0);
  const [currentSpot, setCurrentSpot] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (fetch_popularEvents());
        const response1 = await (fetch_popularSpots());
        console.log(response, response1);
        setSpotDetails(response1);
        setEventDetails(response);

      } catch (error) {
        console.log("Error while fetching event data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("event", eventDetails);
  }, [eventDetails]);
  useEffect(() => {
    console.log("spot", spotDetails);
  }, [spotDetails]);

  useEffect(() => {
    console.log("event", eventDetails);
    if (eventDetails.length > 0) {
      setEvent(eventDetails[currentEvent]);
    }
  }, [eventDetails, currentEvent]);

  useEffect(() => {
    console.log("spot", spotDetails);
    if (spotDetails.length > 0) {
      setSpot(spotDetails[currentSpot]);
    }
  }, [spotDetails, currentSpot]);
  useEffect(() => {
    if (event && Object.keys(event).length > 0 && spot && Object.keys(spot).length > 0) {
      setLoading(false);
    }
  }, [event, spot])
  const nextEvent = () => {
    setCurrentEvent(currentEvent + 1);
  };
  const nextSpot = () => {
    setCurrentSpot(currentSpot + 1);
  }
  const prevEvent = () => {
    setCurrentEvent(currentEvent - 1);
  };
  const prevSpot = () => {
    setCurrentSpot(currentSpot - 1)
  }
  return (
    <div className='home' style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video src={vid} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3%',
            // background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0.5,0.5,1))',
          }}
        />
      </div>
      <div className='header-text'>
        <div className='header-content' style={{ textShadow: '3px 0 3px black' }}>welcome to trip partner</div>
      </div>



      <div>
        <div className='events-container' style={{ padding: '50px' }}>
          <div className='container'>
            <h3>Events</h3>
            <div className="slider-container" style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {event ? (<>{currentEvent !== 0 && <Button variant='contained' onClick={prevEvent} style={{ color: 'white', padding: '5px' }}>Prev</Button>}
                <div className="slider">
                  <EventComponent key={event?.event_id} post={event} />
                </div>
                {(currentEvent < eventDetails.length - 1) && <Button variant='contained' onClick={nextEvent} style={{ color: 'white', padding: '5px' }}>Next</Button>}</>)
                : (<>No Active Events</>)
              }

              <Link to='/EventsHomePage' style={{ textDecoration: 'none' }}>
                <Button variant='outlined' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textTransform: 'uppercase', color: 'black', fontWeight: "bold" }}><div style={{ marginRight: '5px' }}>v</div>
                  <div style={{ marginRight: '5px' }}>i</div>
                  <div style={{ marginRight: '5px' }}>e</div>
                  <div style={{ marginRight: '5px' }}>w</div>
                  <br />
                  <div>m</div>
                  <div>o</div>
                  <div>r</div>
                  <div>e</div></Button>
              </Link>
            </div>


            <p>Unlock the magic of travel! Immerse yourself in vibrant events at breathtaking tourist spots. From cultural festivals to culinary delights, join us for unforgettable experiences that go beyond sightseeing. Embrace the journey, forge global connections, and make every moment extraordinary. Explore. Connect. Celebrate.</p>
          </div>



        </div>
      </div>


      <div class="slider-last">
        <div class='slider-heading-last'><h1>Incredible India</h1></div>
        <div class="slide-track-last">
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/OIP.gsvAr_qj-p56y2-IsjFt8AHaEK?rs=1&pid=ImgDetMain" height="200" width="250" alt="" />
            <p>DARJEELING, KOLKATA</p>
          </div>
          <div class="slide-last">
            <img src="https://cdn.wallpapersafari.com/33/82/ySg3On.jpg" height="200" width="250" alt="" />
            <p>AMER FORT, JAIPUR</p>
          </div>
          <div class="slide-last">
            <img src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/07/tajmahal-1.jpg" height="200" width="250" alt="" />
            <p>TAJ MAHAL, AGRA</p>
          </div>
          <div class="slide-last">
            <img src="https://wallpapercave.com/wp/wp3481207.jpg" height="200" width="250" alt="" />
            <p>GOLDEN TEMPLE, AMRITSAR</p>
          </div>
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/OIP.dHIIx1M4Q4RTztQIqgE2GQHaEK?rs=1&pid=ImgDetMain" height="200" width="250" alt="" />
            <p>NANITAL LAKE</p>
          </div>
          <div class="slide-last">
            <img src="https://wallpapercave.com/wp/wp6733712.jpg" height="200" width="250" alt="" />
            <p>MUNNAR, KERELA</p>
          </div>
          <div class="slide-last">
            <img src="https://wallpaperaccess.com/full/4455652.jpg" height="200" width="250" alt="" />
            <p>INDIA GATE, NEW DELHI</p>
          </div>
          <div class="slide-last">
            <img src="https://wallpapercave.com/wp/wp7029244.jpg" height="200" width="250" alt="" />
            <p>LADAKH</p>
          </div>
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/OIP.cd_l9_nlAT0inRizPmPtfgHaEK?rs=1&pid=ImgDetMain" height="200" width="250" alt="" />
            <p>GANGA GHAT, VARANASI</p>
          </div>
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/R.0bba0d2bd0b0e1451ebe2ca308dc214a?rik=egpEVPPUu1pWEw&riu=http%3a%2f%2fkagw.com%2fwp-content%2fuploads%2f2018%2f10%2fkerala_backwaters_1920x1080.jpg&ehk=WHDpkY%2bhZLYcCY9hDnpfusn8yekXntrSiEOqt53XqrU%3d&risl=1&pid=ImgRaw&r=0" height="200" width="250" alt="" />
            <p>BACKWATERS, KERELA</p>
          </div>
          <div class="slide-last">
            <img src="https://wallpaperaccess.com/full/4851549.jpg" height="200" width="250" alt="" />
            <p>GATEWAY OF INDIA, MUMBAI</p>
          </div>
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/OIP.PL9L1GFo8btmFGkx2Dkv6wHaEK?rs=1&pid=ImgDetMain" height="200" width="250" alt="" />
            <p>COORG, KARNATAKA</p>
          </div>
          <div class="slide-last">
            <img src="https://th.bing.com/th/id/OIP.Hlh5vQMOTCylamnz_l6YiAHaEK?rs=1&pid=ImgDetMain" height="200" width="250" alt="" />
            <p>YUMTHANG VALLEY, SIKKIM</p>
          </div>
          <div class="slide-last">
            <img src="https://getwallpapers.com/wallpaper/full/e/1/1/842534-kashmir-wallpaper-1920x1080-pc.jpg" height="200" width="250" alt="" />
            <p>JAMMU & KASHMIR</p>
          </div>
        </div>
      </div>


      <div className='spot-container' style={{ padding: '60px', display: 'flex', flexDirection: 'column' }}>


        <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <h3>Popular Spots</h3>

          <div className='popular-hotspot-container' style={{ width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Link to='/TouristHomePage' style={{ textDecoration: 'none' }}>
                <Button variant='outlined' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textTransform: 'uppercase', color: 'black', fontWeight: "bold" }}><div style={{ marginRight: '5px' }}>v</div>
                  <div style={{ marginRight: '5px' }}>i</div>
                  <div style={{ marginRight: '5px' }}>e</div>
                  <div style={{ marginRight: '5px' }}>w</div>
                  <br />
                  <div>m</div>
                  <div>o</div>
                  <div>r</div>
                  <div>e</div>
                </Button>
              </Link>
              <div className="slider-container">
                {spot ? (<>
                  {currentSpot !== 0 && <Button variant='contained' onClick={prevSpot} style={{ color: 'white' }}>Prev</Button>}
                  <div className="slider">
                    <TouristSpotComponent key={spot?.spot_id} post={spot} />
                  </div>
                  {(currentSpot < spotDetails.length - 1) && <Button variant='contained' onClick={nextSpot} style={{ color: 'white' }}>Next</Button>}
                </>) : (<>spots to be added</>)}

              </div>
            </div>


          </div>




          <p>Discover the allure of tourist spots like never before! Join us in celebrating the unique charm of each destination through captivating events. From cultural festivals to scenic adventures, these experiences redefine your travel. Embrace the extraordinary – explore, indulge, and make memories that last a lifetime. Your journey begins here.</p>
        </div>
      </div>

      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          {/* <img className='Trip-Logo' style={{}} src={logo}/> */}
          <p className="text-blk heading">
            About Us
          </p>
          <h1 className="text-blk subHeading" style={{ fontSize: "2rem", letterSpacing: "1.5px", lineHeight: "1.1" }}>
            Travelling and connecting with places and people is so important to us, it’s the cornerstone of why TRIP PARTNER exists.
          </h1>
          <p className="text-blk subHeading">
            We believe that travelling broadens the mind and changes the way you think. The people you meet and the experiences you have give you an improved ability to empathise with different situations and people.

            Travel is the best way to learn about the world and how it works. Our experiences both travelling and working in travel have led us to where we are today, and to TRIP PARTNER’s Mission Statement, Vision Statement and Values.
          </p>
          {/* <div className="social-icons-container">
              <a className="social-icon">
                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png" alt="Social Icon 1" />
              </a>
              <a className="social-icon">
                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png" alt="Social Icon 2" />
              </a>
              <a className="social-icon">
                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png" alt="Social Icon 3" />
              </a>
              <a className="social-icon">
                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png" alt="Social Icon 4" />
              </a>
            </div> */}
        </div>
      </div>
    </div>
  )

}
export default Home