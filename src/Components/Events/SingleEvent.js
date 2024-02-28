import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoMdRadioButtonOn } from 'react-icons/io'
import { Link } from 'react-router-dom'

function SingleEvent({eventId, eventName, eventPictureList, description, location}) {

  return (
    <div key={eventId} className="singleDestination" style={{padding:'5px'}}>
                            <div className="imageDiv">
                                {(eventPictureList && eventPictureList.length > 0) && (
                                    <>
                                    {eventPictureList.map(eventPicture=>(<img src={eventPicture} alt={eventName} />))}
                                    </>
                                )
                                }
                            </div>
                            <div className="cardInfo">
                                <h4 className="eventName">{eventName}</h4>
                                <span className="continent flex">
                                <HiOutlineLocationMarker className='icon' />
                                <span className="name">{location?.state}</span>
                                </span>
                                <div className="desc">
                                    <p>{description}</p>
                                </div>
                                <Link to={`/Events/${eventName}`}><button className="btn flex">
                                    VIEW MORE
                                    <IoMdRadioButtonOn className='icon'/>
                                </button></Link>
                            </div>
                        </div>
  )
}

export default SingleEvent