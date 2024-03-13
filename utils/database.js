import mongoose from "mongoose"; // Importing mongoose package for connecting to MongoDB

let isConnected = false; // Variable to track the connection state

// Function to connect to the MongoDB database
export const connectToDB = async () => {
 // Setting the strictQuery option to true to enforce data validation rules
 mongoose.set("strictQuery", true);

 // If the database is already connected, print a message and return
 if (isConnected) {
   console.log("MongoDB is already connected");
   return;
 }

 try {
   // Connecting to MongoDB using the MONGODB_URI environment variable and setting the database name to 'share_prompt'
   await mongoose.connect(process.env.MONGODB_URI, {
     dbName: "share_prompt",
     // Optional configuration for using new URL parser and unified topology
     // useNewUrlparser: true,
     // useUnifiedTopology: true,
   });

   // Setting the isConnected variable to true after successful connection
   isConnected = true;

   // Logging a success message on connecting to MongoDB
   console.log("Successfully connected to MongoDB");
 } catch (err) {
   // Logging an error message and exiting the process in case of connection failure
   console.error(`Failed to connect to MongoDB`, err);
   process.exit();
 }
};