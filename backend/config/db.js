import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify : false,

            // we don't need to this configure  anymore
            //  it's configured by default from version 6.
            // link of mongoose documentations:
            // https://mongoosejs.com/docs/search.html?q=useCreateIndex
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB;
