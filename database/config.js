import { connect } from "mongoose"

const dbConnect = async () => {
 try {
    //Connect to database
    await connect(process.env.MONGO_CNN)
    console.log('Connect to server database')
 }catch (error) {
    console.log(error)
 }
}

export default dbConnect