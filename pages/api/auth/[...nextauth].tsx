import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from '../../../database/db'
import User from '../../../models/user.model'
import {compare} from 'bcryptjs'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const { GITHUB_ID = '', GITHUB_SECRET = ''} = process.env;

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 3000,
 },
    providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials:any, req) {
        await connectToDb()
          .catch(error => { error: 'connection failed'; });

        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          throw new Error('no user found');
        }
        const checkPassword = await compare(credentials.password, result.password);
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error('incorrect password');
        }
        
        return result;
      },
      credentials: {}
    })
  ],
  debug: process.env.NODE_ENV === "development",
});