import NextAuth from "next-auth";
import Providers from "next-auth/providers"
import GitHubProvider from 'next-auth/providers/github';

const { GITHUB_ID = '', GITHUB_SECRET = ''} = process.env;

export default NextAuth({
    providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
});