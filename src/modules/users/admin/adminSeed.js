// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import User from "../../auth/auth.model.js";
// import Admin from "./adminModel.js";

// import {
//     hashPassword
// } from "../../../utils/bcrypt.js";


// dotenv.config();



// const seedAdmin = async()=>{

//     try{

// await mongoose.connect(process.env.MONGO_URI);

// console.log(
//     "Database:",
//     mongoose.connection.name
// );
//         await mongoose.connect(
//             process.env.MONGO_URI
//         );


//         console.log(
//             "MongoDB Connected"
//         );



//         const adminEmail =
//             process.env.ADMIN_EMAIL;



//         const existingUser =
//             await User.findOne({
//                 email:adminEmail
//             });


 

//         if(existingUser){

//             console.log(
//                 "Admin already exists"
//             );

//             process.exit();

//         }



//         const password =
//             await hashPassword(
//                 process.env.ADMIN_PASSWORD
//             );



//         // Create user

//         const user =
//             await User.create({

//                 name:"Super Admin",

//                 email:adminEmail,

//                 password,

//                 role:"ADMIN",

//                 isVerified:true

//             });





//         // Create admin profile

//         const admin =
//             await Admin.create({

//                 userId:user._id,

//                 permissions:[

//                     "MANAGE_USERS",

//                     "MANAGE_OWNERS",

//                     "MANAGE_HOTELS",

//                     "MANAGE_BOOKINGS",

//                     "MANAGE_PAYMENTS",

//                     "VIEW_REPORTS"

//                 ]

//             });



//         console.log(
//             "Admin seeded successfully"
//         );


//         console.log(admin);

           



//         const allUsers = await User.find();

// const allAdmins = await Admin.find();



//         process.exit();



//     }catch(error){


//         console.log(error);


//         process.exit(1);

//     }

// };



// seedAdmin();


import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../../auth/auth.model.js";
import Admin from "./adminModel.js";
import { hashPassword } from "../../../utils/bcrypt.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database:", mongoose.connection.name);
        console.log("MongoDB Connected");

        const adminEmail = process.env.ADMIN_EMAIL;

        // Check if user already exists
        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log("User already exists. Checking Admin profile...");
        } else {
            // Create user if they don't exist
            const password = await hashPassword(process.env.ADMIN_PASSWORD);
            user = await User.create({
                name: "Super Admin",
                email: adminEmail,
                password,
                role: "ADMIN",
                isVerified: true
            });
            console.log("Super Admin user created.");
        }

        // Check if admin profile already exists before creating
        const existingAdmin = await Admin.findOne({ userId: user._id });
        if (!existingAdmin) {
            const admin = await Admin.create({
                userId: user._id,
                permissions: [
                    "MANAGE_USERS",
                    "MANAGE_OWNERS",
                    "MANAGE_HOTELS",
                    "MANAGE_BOOKINGS",
                    "MANAGE_PAYMENTS",
                    "VIEW_REPORTS"
                ]
            });
            console.log("Admin profile seeded successfully:", admin);
        } else {
            console.log("Admin profile already exists!");
        }

        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();