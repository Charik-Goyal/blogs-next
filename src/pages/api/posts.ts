import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
      try {
        // const id = 1111;
        const posts = await prisma.post.findMany();
        // console.log(posts)
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
      }
    } 
    
    else if (req.method === 'POST') {
      try {
        const { title, content, image, paragraph, tags, authorId} = req.body;
        console.log(req.body)
        const newPost = await prisma.post.create({
          data: {
            title,
            content,
            image,
            paragraph,
            tags,
            authorId,
          },
        });
        res.status(201).json(newPost);
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: 'Failed to create post' });
      }
    }
    
    else if(req.method === 'PUT') {
      try {
        const { id, title, content, image, paragraph, tags} = req.body;
        const updatedPost = await prisma.post.update({
          where: { id },
          data: {
            title,
            content,
            image,
            paragraph,
            tags
          },
        });
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: 'Failed to create post' });
      }
    }
    else {
      // Handle any other HTTP methods
      res.status(405).json({ error: 'Method not allowed' });
    }
};
