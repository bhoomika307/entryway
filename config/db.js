import mongoose from 'mongoose'
import colors from 'colors';
const connectDB=async()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/EntrywayNew")
console.log('MongoDb connected'.bgMagenta.white);
    }catch(err){
        console.log(err);
        process.exit(1);

    }
}

 export default connectDB;