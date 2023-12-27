import mongoose from "mongoose";
let isConnected = false; // track the connection state

export const connnectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlparser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}