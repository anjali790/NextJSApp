import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect();

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {username,email,password}= reqBody;
        console.log(reqBody);

        //check if user exist 

        const user =await User.findOne({email})
        console.log(user)
        if(user){
            return NextResponse.json({error:"User Already Exits"},{status:400});
        };

        // hash password 

        const salt =await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        //create a user 

        const newUser=await new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser=await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message:"Succefully Created a user",
            success:true,
            savedUser

        })

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})

    }
}