import mongoose from "mongoose";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

import { User } from "../../models/User";
import { compareSync } from "bcrypt-ts";

import { MongoDBAdapter } from '@auth/mongodb-adapter'; 
import clientPromise  from '../../../lib/mongoConnect'; 

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    CredentialsProvider({ 
      name: 'Credentials', 
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {   
        try {  
            mongoose.connect(process.env.MONGO_URI as string )
            const {email, password} = credentials as any;  
            let user = await User.findOne({email});  
            const userAndPasswordOK = user && compareSync(password, user.password)
            if (userAndPasswordOK){
                return user
            }else{
              return false;
            }
     
        } catch (error) {  
            console.log(error);
        }
      }
    }), 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }