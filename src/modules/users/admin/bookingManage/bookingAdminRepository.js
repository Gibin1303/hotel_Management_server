import Booking from "../../../../modules/booking/booking.model.js";


// Get all bookings

export const findAllBookings = async ({
    filter={},
    skip=0,
    limit=10
})=>{


    return await Booking.find(filter)

    .populate(
        "customerId",
        "name email phone"
    )


    .populate({

        path:"hotelId",

        select:"name location ownerId",

        populate:{
            path:"ownerId",
            select:"name email"
        }

    })


    .populate(
        "roomId",
        "roomNumber type"
    )


    .skip(skip)

    .limit(limit)

    .sort({
        createdAt:-1
    });


};



// Count

export const countBookings = async(filter)=>{

    return await Booking.countDocuments(filter);

};



// Find one booking

export const findBookingById = async(id)=>{


    return await Booking.findById(id)

    .populate(
        "customerId",
        "name email phone"
    )

    .populate({

        path:"hotelId",

        select:"name ownerId",

        populate:{
            path:"ownerId",
            select:"name email"
        }

    });

};



// Update status

export const updateBookingStatus = async(
    id,
    status
)=>{


    return await Booking.findByIdAndUpdate(

        id,

        {
            status
        },

        {
            new:true
        }

    );

};