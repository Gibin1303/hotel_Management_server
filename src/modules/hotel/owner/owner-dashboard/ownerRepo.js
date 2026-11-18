import Hotel from "../../hotel.model.js";
import Room from "../../rooms.model.js";
import Booking from "../../../booking/booking.model.js";
import User from "../../../auth/auth.model.js";
// import Review from "../../";

// Get owner's hotels

export const findOwnerHotels = async (ownerId) => {
  return await Hotel.find({
    ownerId,
    isDeleted: false,
  }).select("_id name rating totalReviews");
};

// Total rooms

export const countOwnerRooms = async (hotelIds) => {
  return await Room.countDocuments({
    hotelId: {
      $in: hotelIds,
    },
  });
};

// Booking statistics

export const getBookingStats = async (hotelIds) => {
  const result = await Booking.aggregate([
    {
      $match: {
        hotelId: {
          $in: hotelIds,
        },
      },
    },

    {
      $group: {
        _id: null,

        totalBookings: {
          $sum: 1,
        },

        confirmedBookings: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "CONFIRMED"],
              },
              1,
              0,
            ],
          },
        },

        cancelledBookings: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "CANCELLED"],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  return (
    result[0] || {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
    }
  );
};

// Revenue

export const getRevenue = async (hotelIds) => {
  const result = await Booking.aggregate([
    {
      $match: {
        hotelId: {
          $in: hotelIds,
        },
        status: "CONFIRMED",
      },
    },

    {
      $group: {
        _id: null,

        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

// Recent bookings

export const getRecentBookings = async (hotelIds) => {
  return await Booking.find({
    hotelId: {
      $in: hotelIds,
    },
  })
    .populate("customerId", "name email avatar")
    .populate("hotelId", "name")
    .sort({
      createdAt: -1,
    })
    .limit(10);
};

// Monthly revenue chart

export const getMonthlyRevenue = async (hotelIds) => {
  return await Booking.aggregate([
    {
      $match: {
        hotelId: {
          $in: hotelIds,
        },
        status: "CONFIRMED",
      },
    },

    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
          year: {
            $year: "$createdAt",
          },
        },

        revenue: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

// Reviews

export const getReviewStats = async (hotelIds) => {
  return await Review.aggregate([
    {
      $match: {
        hotelId: {
          $in: hotelIds,
        },
      },
    },

    {
      $group: {
        _id: null,

        averageRating: {
          $avg: "$rating",
        },

        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);
};

export const isUser = async () => {
  const hotels = await Hotel.countDocuments();

  const users = await User.countDocuments();

  return { hotels, users };
};
