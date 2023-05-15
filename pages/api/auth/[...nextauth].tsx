import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from '../../../database/db'
import User from '../../../models/user.model'
import {compare} from 'bcryptjs'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { UserServiceImpl } from "../../../service/UserServiceImpl";

const { GITHUB_ID = '', GITHUB_SECRET = ''} = process.env;
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  
  //needs
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
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any, req) {
        await connectToDb()
          .catch(error => { error: 'connection failed'; });
        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          throw new Error('no user found');
        }
        result.role = 'user'
        const checkPassword = await compare(credentials.password, result.password);
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error('incorrect password');
        }
        

        return result;      
      },
      credentials: {}
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});