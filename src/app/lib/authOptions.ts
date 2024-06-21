import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; 
import { compareSync } from "bcrypt-ts";
import { MongoDBAdapter } from '@auth/mongodb-adapter';  
import clientPromise from "./mongoConnect";
import { User } from "../api/models/User";
export const authOptions = {
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
          await mongoose.connect(process.env.MONGO_URI as string);
          const { email, password } = credentials as any;
          let user = await User.findOne({ email });
          const userAndPasswordOK = user && compareSync(password, user.password);
          if (userAndPasswordOK) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
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
};
