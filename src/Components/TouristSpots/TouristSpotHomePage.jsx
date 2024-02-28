import React, { useEffect, useState } from 'react'
import './TouristSpotHomePage.css'

import { fetch_popularSpots, fetch_spot_data } from '../Files/TouristSpotDetails'
import Loading from '../LoadingComponents/Loading'
import Spot from './Spot'
import { Carousel, Empty } from 'antd'


const TouristSpotHomePage = () => {
  const [Spot_Details,setSpotDetails]=useState([{}]);
  const [PopularSpotDetails,setPopularSpotDetails]=useState([{}]);
  useEffect(()=>{
    try{
        const fetchSpots=async()=>{
            const response=await fetch_spot_data();
            console.log(response)
            setSpotDetails(response);
        }
        fetchSpots();
        const fetchPopularSpots=async()=>{
            const response=await fetch_popularSpots();
            setPopularSpotDetails(response);

        }
        fetchPopularSpots();
    }catch(error){
        console.log(error);
    }
  },[])
  const contentStyle = {
    height: '500px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <section className="main container section" >
        <div className='top-slideshow-div'>
                {/* <h2 className="w3-center"></h2> */}
<Carousel autoplay>
<div>
                <img className="mySlides" src="https://th.bing.com/th/id/R.17165b6e9cad01442913960b0ed18343?rik=wouQPnVfb8LrWA&riu=http%3a%2f%2fwww.japjitravel.com%2fblog%2fwp-content%2fuploads%2f2017%2f04%2fTaj-Mahal.jpg&ehk=isNV1lcW5FH7SxoGKQGfnSg03874LdT%2fIga%2fiCV%2bBtY%3d&risl=&pid=ImgRaw&r=0" style={contentStyle} />
                </div>
<div>
    <img className="mySlides" src="https://loveincorporated.blob.core.windows.net/contentimages/gallery/818d8b01-8844-4ac2-8ecb-72a40fa7ec0b-Temple-Amritsar-Elena-Odareeva.jpg" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://www.nortonrosefulbright.com/-/media/images/nrf/nrfweb/knowledge/publications/global-fdi/india.jpeg?la=en-hk&revision=&hash=CAF3A0694161AA8979D726C8BBB908E3AD5F6A1C" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://tripnxt.com/blog/wp-content/uploads/2020/02/TripNxt-Varanasi-1536x1021.jpg" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://wallpapercave.com/wp/AtzSnEY.jpg" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://wallpaperbat.com/img/332681-wallpaper-river-home-india-image-for-desktop-section-gorod.jpg" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://th.bing.com/th/id/R.40f45706c1b0176ca0ee696aa4034942?rik=l5%2fk9d4ilZZLzw&riu=http%3a%2f%2fd27k8xmh3cuzik.cloudfront.net%2fwp-content%2fuploads%2f2015%2f07%2fNubra-Valley-in-Ladakh.jpg&ehk=UjPdINnuDigww%2fz6qr%2fWP2qdQKDkYilxv9CRJT0anMs%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" style={contentStyle} />
</div>
<div>
    <img className="mySlides" src="https://images.yourstory.com/cs/wordpress/2016/03/yourstory-delhigovt-incubation.jpg?w=1152&fm=auto&ar=2:1&mode=crop&crop=faces" style={contentStyle} />
</div>
</Carousel>
                

            </div>
        <div className="secTitle">
            <h1 data-aos='fade-right' className="title">
                Most Visited Destinations...
            </h1>
        </div>
 
        <div className="secContent grid">
            {PopularSpotDetails.length > 0  ? (<>{
                PopularSpotDetails.map(({spotId, spotPictureList, spotName, location, description})=>{
                    return(
                        <Spot spotId={spotId} spotName={spotName} spotPictureList={spotPictureList} location={location} description={description}/>
                    )
                        
                    
                })
            }</>
                ):(<Empty/>)}
            
        </div>
 
        <br />
        <br />
 
        <div className="secTitle">
            <h1 data-aos='fade-right' className="title">
                All places .....
            </h1>
        </div>
        <div className="secContent grid">
            {Spot_Details.length > 0 ? (<>{
                Spot_Details.map(({spotId, spotPictureList, spotName, location,  description})=>{
                    return(
                        <Spot spotId={spotId} spotName={spotName} spotPictureList={spotPictureList} location={location} description={description}/>
                    )
                })
            }<p>More places to be added soon</p></>):(<Empty/>)}
            
 
            
        </div>
    </section>
  )
}
 
export default TouristSpotHomePage