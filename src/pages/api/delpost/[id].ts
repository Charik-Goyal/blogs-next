import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next/types';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(id) }
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  }
  else {
    // Handle other HTTP methods if necessary
    res.status(405).end(); // Method Not Allowed
  }
}
