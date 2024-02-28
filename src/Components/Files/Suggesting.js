import axios from "axios"
import { BaseUrl } from "../config/BaseUrl"
export const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
export const eventSuggestion=async(eventId)=>{
    const events=await axios.get(`${BaseUrl}/nearByEventsForEvents/${eventId}`);
    const eventsWithPicture=await Promise.all(
        events.data.map(async(event)=>{
            const picList=await axios.get(`${BaseUrl}/event/pictureList/${event.eventId}`);
            const picListWithUrl=picList.data?.map(pic=>{
                return pictureUrl(pic);
            });
            return {
                ...event,
                pictureList:picListWithUrl,
            };
        })
    )
    const spots=await axios.get(`${BaseUrl}/nearBySpotsForEvents/${eventId}`);
    const spotsWithPicture=await Promise.all(
        spots.data.map(async(spot)=>{
            const picList=await axios.get(`${BaseUrl}/spot/pictureList/${spot.spotId}`);
            const picListWithUrl=picList.data.map(pic=>{
                return pictureUrl(pic);
            });
            return {
                ...spot,
                pictureList:picListWithUrl,
            };
        })
    )
    return{
        eventSuggestion:eventsWithPicture,
        spotSuggestion:spotsWithPicture
    }
}
export const spotSuggestion=async(spotId)=>{
    const events=await axios.get(`${BaseUrl}/nearByEventsForSpots/${spotId}`);
    const eventsWithPicture=await Promise.all(
        events.data.map(async(event)=>{
            const picList=await axios.get(`${BaseUrl}/event/pictureList/${event.eventId}`);
            const picListWithUrl=picList.data.map(pic=>{
                return pictureUrl(pic);
            });
            return {
                ...event,
                pictureList:picListWithUrl,
            };
        })
    )
    const spots=await axios.get(`${BaseUrl}/nearBySpotsForSpots/${spotId}`);
    const spotsWithPicture=await Promise.all(
        spots.data.map(async(spot)=>{
            const picList=await axios.get(`${BaseUrl}/spot/pictureList/${spot.spotId}`);
            const picListWithUrl=picList.data.map(pic=>{
                return pictureUrl(pic);
            });
            return {
                ...spot,
                pictureList:picListWithUrl,
            };
        })
    )
    return{
        eventSuggestion:eventsWithPicture,
        spotSuggestion:spotsWithPicture
    }
}