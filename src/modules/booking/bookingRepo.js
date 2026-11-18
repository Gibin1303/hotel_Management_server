import Booking from "./booking.model.js";


export const createBookingRepo =
async(data)=>{

    return await Booking.create(data);

};



export const getBookings =async(bookingid)=>{
   return  await Booking.findById(bookingid)
}