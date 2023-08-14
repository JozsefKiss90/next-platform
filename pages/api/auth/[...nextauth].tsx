import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from '../../../database/db'
import User from '../../../models/user.model'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { userService  } from "../../../service/UserServiceImpl"

enum Role {
  user = "user",
  admin = "admin",
}

const providers = [];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }));
}

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }));
}

if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
  providers.push(FacebookProvider({
    clientId: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
  }));
}
providers.push(CredentialsProvider({ 
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
}));

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt", 
    maxAge: 3000,
  },
    providers: providers,
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider === 'credentials') {
        return true; 
      }
      user.role = Role.user 
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
