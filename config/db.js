import mongoose from 'mongoose';

export const connectDB = async () => {
    return mongoose.connect(process.env.MONGO_URL)
            .then((response) => {
                //console.log(`Connected to mongodb server : ${response.connection.host +":"+ response.connection.port}`);
            })
            .catch(error => {
                console.error(`Could not connect to Mongodb server : ${error}`);
            })
}
