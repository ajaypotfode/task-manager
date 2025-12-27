import mongoose from "mongoose"

const connectDatabase = async () => {
    const CONNECTION_STR = process.env.DB_CONNECTION_STR || ''
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Database Already Connected");
        }

        await mongoose.connect(CONNECTION_STR)
        console.log('database Connected SuccessFully !!');

    } catch (error) {
        console.log('Failed To Connect Database !!');
        throw error
    }
}

export default connectDatabase