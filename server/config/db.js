const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("mongodb connected successfully!");

    } catch (err) {
        console.error("oops! mongodb connecion failed", err);
    }
}

module.exports = connectdb;