import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from '../../../database/db'
import User from '../../../models/user.model'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { userService  } from "../../../service/UserServiceImpl"
import SignToken from "../../../service/SignToken";

enum Role {
  user = "user",
  admin = "admin",
}

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
        const { email, password } = credentials;
        return userService.signInCredentials(email, password);      
      },
   
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'credentials') {
        return true; 
      }
      const userEmail = profile?.email
      const userByEmail = await User.findOne({email: userEmail})
      console.log("USER IS:" + userByEmail)
      if(!userByEmail) {
        console.log("USER DOESNT EXIST")
        return false; 
      }
      await User.findByIdAndUpdate(userByEmail._id, { role: Role.user });

      return true; 
    },
    async jwt({ token, user}) {
      if (user) { 
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("USER TOKEN: "+token.role)
      if (token && session.user) {
        session.user.role = token.role;
      }
      
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});