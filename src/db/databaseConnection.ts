import mongoose from "mongoose"

const connectDatabase = async () => {

    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Database Already Connected");
        }

        await mongoose.connect('')
        console.log('database Connected SuccessFully !!');

    } catch (error) {
        console.log('Failed To Connect Database !!');
        throw error
    }
}

export default connectDatabase