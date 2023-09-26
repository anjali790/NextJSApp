import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {email,password}= reqBody;
        console.log(reqBody);

        //check if user exist 

        const user =await User.findOne({email})
        console.log(user)
        if(!user){
            return NextResponse.json({error:"User does not Exits"},{status:400});
        };

        //check for the password 

       const validatePassword= await bcryptjs.compare(password,user.password);
       if(!validatePassword){
        return NextResponse.json({error:"Password not Valid"},{status:400});
        
       }

   // create token Data

   const tokenData={
    id:user._id,
    username: user.username,
    email:user.email

   }

   // create token
   const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1hr"})
        const response= NextResponse.json({
            message:"Succefully Created a user",
            success:true,
              })
              response.cookies.set("token",token,{httpOnly:true})
              return response;

          
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})

    }
}