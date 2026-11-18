import mongoose from "mongoose";


const connectDB = async () => {

    try {

        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {
                maxPoolSize: 50, // Maximum database connections
                minPoolSize: 10, // Keep minimum connections
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            }
        );


        console.log(
            `MongoDB Connected: ${conn.connection.host}`
        );


        mongoose.connection.on(
            "error",
            (error) => {

                console.error(
                    "MongoDB Error:",
                    error
                );

            }
        );


    } catch(error) {

        console.error(
            "MongoDB Connection Failed:",
            error.message
        );


        process.exit(1);

    }

};



export default connectDB;