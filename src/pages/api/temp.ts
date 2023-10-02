import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret })
    console.log("JSON Web Token", token)
    return;
    const session = await getSession({ req });

    if(!session?.user){
        res.status(401).json({ error: 'You must be logged in to create a post.' });
        return;
    }
    const initialPosts = {
        "title": "first",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "tags": ["photograph", "mountains"]
      }
    const newPost = await prisma.post.create({
        data: {
          title: initialPosts.title,
          content: initialPosts.content,
          published: true,
          tags: initialPosts.tags,
          authorId: session.user.id,
        },
      });
}