import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import prismadb from "../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Session } from 'next-auth';
import { User } from '@prisma/client'; // Assuming you're using Prisma
import { compare, hash } from 'bcrypt';

import { json } from "node:stream/consumers";

type ExtendedUser = {
  id?: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type ExtendedSession = Session & {
  accessToken?: string;
  user?: ExtendedUser;
};

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET  || "",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {
                label: "Email",
                type: "text",
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        async authorize(credentials: { email?: string; password?: string }) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
          }
        
          // Find user by email
          let user = await prismadb.user.findUnique({
            where: {
              email: credentials.email
            }
          });
        
          // If user doesn't exist, create a new user
          if (!user) {
            const hashedPassword = await hash(credentials.password, 10); // Hash the password

            user = await prismadb.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword
                // add other fields as necessary
              },
            });
          } else {
            // Compare provided password with stored hashed password
            const isCorrectPassword = await compare(credentials.password, user.password);
          
            if (!isCorrectPassword) {
              throw new Error("Incorrect Password");
            }
          }
          // Return the full user object or a subset of it
          return {
            id: user.id,
            email: user.email,
            name: user.name // if you have a 'name' field or any other fields you'd like
          };
        }
      })
      // ...add more providers here
    ],
    callbacks: {
      async session({ session, token, user }) {
        // your logic
        if (session.user && token) {
          session.user.id = token.sub
        }
        return session;
      }
    },
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prismadb),
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
  }

  export default NextAuth(authOptions);