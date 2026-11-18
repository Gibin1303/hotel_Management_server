// import dotenv from "dotenv";

// import mongoose from "mongoose";
// import Hotel from "../modules/hotel/hotel.model.js";

// import connectDB from "../config/database.js";

// dotenv.config();

// await connectDB();

// await Hotel.updateMany(
//   {},
//   {
//     $set: {
//       location: {
//         address: "",
//         city: "",
//         state: "",
//         country: "India",
//       },
//     },
//   },
// );

// console.log("Hotels updated");

// process.exit();



import dotenv from "dotenv";
import mongoose from "mongoose";

import Hotel from "../modules/hotel/hotel.model.js";
import connectDB from "../config/database.js";


dotenv.config({
  path:"../../.env"
});


await connectDB();


await Hotel.updateMany(
  {},
  {
    $set:{
      location:{
        address:"",
        city:"",
        state:"",
        country:"India"
      }
    }
  }
);


console.log("Hotels updated");


await mongoose.connection.close();

process.exit(0);
