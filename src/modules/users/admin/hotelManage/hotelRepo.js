import Hotel from "../../../../modules/hotel/hotel.model.js";


// Get all hotels (Admin)

export const findAllHotels = async ({
    filter = {},
    skip = 0,
    limit = 10
}) => {

    return await Hotel.find({
        isDeleted:false,
        ...filter
    })
    .populate(
        "ownerId",
        "name email"
    )
    .skip(skip)
    .limit(limit)
    .sort({
        createdAt:-1
    });

};



// Count hotels (for pagination)

export const countHotels = async(filter={})=>{

    return await Hotel.countDocuments({

        isDeleted:false,

        ...filter

    });

};



// Get single hotel

export const findHotelById = async(hotelId)=>{

    return await Hotel.findOne({

        _id:hotelId,

        isDeleted:false

    })
    .populate(
        "ownerId",
        "name email"
    );

};



// Approve hotel

export const approveHotel = async(
    hotelId,
    data
)=>{

    return await Hotel.findByIdAndUpdate(

        hotelId,

        {
            status:"APPROVED",

            approval:data
        },

        {
            new:true
        }

    );

};



// Reject hotel

export const rejectHotel = async(
    hotelId,
    data
)=>{

    return await Hotel.findByIdAndUpdate(

        hotelId,

        {
            status:"REJECTED",

            approval:data
        },

        {
            new:true
        }

    );

};



// Block hotel

export const blockHotel = async(
    hotelId,
    reason
)=>{

    return await Hotel.findByIdAndUpdate(

        hotelId,

        {
            status:"BLOCKED",

            blockReason:reason
        },

        {
            new:true
        }

    );

};



// Unblock hotel

export const unblockHotel = async(
    hotelId
)=>{

    return await Hotel.findByIdAndUpdate(

        hotelId,

        {
            status:"APPROVED",

            blockReason:null
        },

        {
            new:true
        }

    );

};



// Soft delete hotel

export const deleteHotel = async(
    hotelId
)=>{

    return await Hotel.findByIdAndUpdate(

        hotelId,

        {
            isDeleted:true
        },

        {
            new:true
        }

    );

};