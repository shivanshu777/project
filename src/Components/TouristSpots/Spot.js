import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoMdRadioButtonOn } from 'react-icons/io'
import { Link } from 'react-router-dom'

function Spot({spotId,spotName,spotPictureList,location,description}) {
  return (
    <div key={spotId} className="singleDestination" style={{padding:'5px'}}>
                            <div className="imageDiv">
                                {(spotPictureList && spotPictureList.length > 0) && (<>
                                <img src={spotPictureList[0]} alt={spotName} />
                                </>) }
                            </div>
 
                            <div className="cardInfo" style={{display:'flex', flexDirection:'column',gap:'5px', justifyContent:'center'}}>
                                <h4 className="spotName">{spotName}</h4>
                                <span className="continent flex">
                                <HiOutlineLocationMarker className='icon' />
                                <span className="name">{location?.state}</span>
                                </span>
 
                                <div className="desc">
                                    <p>{description}</p>
                                </div>
                                <Link to={`/Spot/${spotName}`}><button className="btn flex">
                                    VIEW MORE
                                    <IoMdRadioButtonOn className='icon'/>
                                </button></Link>
                            </div>
                        </div>
  )
}

export default Spot