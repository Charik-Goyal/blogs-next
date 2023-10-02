import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next/types';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        title: true,
        content: true,
        id: true,
        tags: true,  // include the tags field
        // add other fields as needed
      },
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).end(); // Method Not Allowed
  }
}
