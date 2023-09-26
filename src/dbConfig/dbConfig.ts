
require('dotenv').config();
import mongoose from 'mongoose';
export async function connect() {


    
    try{
        
        await mongoose.connect(process.env.MONGOOS_URL!);
        const connection= await mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongoose is succefully connected");
        })
        connection.on('error',(err)=>{
            console.log('Mongoose is not connected ,please check the connection '+err)
        })
    }
    catch(error){
        console.log("Somthing went wrong");
        console.log(error);
    }
}
