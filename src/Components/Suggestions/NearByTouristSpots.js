import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Carousel } from 'primereact/carousel';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { spotSuggestion } from '../Files/Suggesting';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from 'react-icons/hi';
function NearByTouristSpots(spotId) {
    const [nbts,setNBTS]=useState([]);
    const navigate=useNavigate();
    useEffect(async()=>{
        const response=await spotSuggestion(spotId);
        setNBTS(response);
    })
  return (
    <div>
        <div style={{padding:'10px'}}>
                  <h1>NearByEvents </h1>
                  <div style={{display:'flex',flexDirection:'row'}}>
                    {nbts?.eventSuggestion?.length>0 ? nbts?.eventSuggestion?.map(event=>
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
                                No Events happening nearBy this tourist spot.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                  )}
                  </div>
                  
                  
                </div>
                <div style={{padding:'10px'}}>
                <h1>NearByTouristSpots</h1>
                <div style={{display:'flex',flexDirection:'row'}}>
                {nbts?.spotSuggestion?.length>0  ? nbts?.spotSuggestion.map(spot=> <Card sx={{ maxWidth: 345 }}>
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
                                 No Tourist spot nearBy this tourist spot.
                             </Typography>
                             </CardContent>
                         </CardActionArea>
                     </Card>
                    )}
                </div>
                
                
                </div>
    </div>
  )
}

export default NearByTouristSpots