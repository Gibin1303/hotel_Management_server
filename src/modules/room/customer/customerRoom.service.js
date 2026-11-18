import {
    findCustomerRoomsRepo,
    findCustomerRoomRepo
}
from "./customerRoom.repo.js";



// export const getCustomerRoomsService =
// async(hotelId)=>{


//     return await findCustomerRoomsRepo(
//         hotelId
//     );


// };




// export const getCustomerRoomService =
// async(roomId)=>{


//     return await findCustomerRoomRepo(
//         roomId
//     );


// };


export const getCustomerRoomsService = async (
  hotelId,
  page,
  limit
) => {

  return await findCustomerRoomsRepo(
    hotelId,
    page,
    limit
  );

};


export const getCustomerRoomService = async (
//   hotelId,
  roomId
) => {

  return await findCustomerRoomRepo(
    // hotelId,
    roomId
  );

};