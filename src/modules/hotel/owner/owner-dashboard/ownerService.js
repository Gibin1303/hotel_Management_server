import {
  getBookingStats,
  getRevenue,
  getRecentBookings,
  countOwnerRooms,
  findOwnerHotels,
} from "../owner-dashboard/ownerRepo.js";

export const getOwnerDashboard = async (ownerId) => {
  const hotels = await findOwnerHotels(ownerId);

  const hotelIds = hotels.map((hotel) => hotel._id);



  const [rooms, bookings, revenue, recentBookings] = await Promise.all([
    countOwnerRooms(hotelIds),

    getBookingStats(hotelIds),

    getRevenue(hotelIds),

    getRecentBookings(hotelIds),
  ]);

  return {
    overview: {
      totalHotels: hotels.length,
      totalRooms: rooms,
      totalBookings: bookings.totalBookings,
      cancelledBookings: bookings.cancelledBookings,
      revenue,
    },

    recentBookings,
  };
};
