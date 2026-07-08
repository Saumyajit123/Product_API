const mongoose = require('mongoose');

const DBconnect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL_LOCAL);

        if(connection) {
            console.log("MongoDB connected successfully");
        } else {
            console.log("MongoDB connection is failed");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = DBconnect;