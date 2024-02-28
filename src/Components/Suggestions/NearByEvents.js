import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Carousel } from 'primereact/carousel';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { eventSuggestion } from '../Files/Suggesting';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
function NearByEvents({eventId}) {
    const [nbv,setNBV]=useState([]);
    console.log(eventId);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await eventSuggestion(eventId);
                console.log(response);
                setNBV(response);
            }catch(error){
                console.log(error);
            }
        }
        fetch();
    },[eventId])
  return (
    <div>
        <div style={{padding:'10px'}}>
                  <h1>NearByEvents </h1>
                  {console.log(nbv.eventSuggestion)}
                  {nbv?.eventSuggestion?.length >0 ? nbv?.eventSuggestion?.map(event=>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={()=>{navigate(`/Events/${event?.eventName}`)}}>
                            <CardMedia
                            component="img"
                            height="140"
                            image={event.pictureList[0]}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {event.eventName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            
                            <span className="name"><HiOutlineLocationMarker/> {event?.location?.state}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                  ):(
                    <Card sx={{ maxWidth: 345 ,height: 350}}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            No Events happening nearBy this Event.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                  )}
                  
                </div>
                <div style={{padding:'10px'}}>
                <h1>NearByTouristSpots</h1>
                {nbv?.spotSuggestion?.length>0 ? nbv?.spotSuggestion?.map(spot=> <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={spot?.pictureList[0]}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {spot?.spotName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <span className="name"><HiOutlineLocationMarker/> {spot?.location?.state}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {spot?.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>):(
                         <Card sx={{ maxWidth: 345 ,height: 350}}>
                         <CardActionArea>
                             <CardContent>
                             <Typography gutterBottom variant="h5" component="div">
                                 No Tourist Spots nearBy where this event is happening.
                             </Typography>
                             </CardContent>
                         </CardActionArea>
                     </Card>
                    )}
                
                </div>
    </div>
    
    
  )
}

export default NearByEvents