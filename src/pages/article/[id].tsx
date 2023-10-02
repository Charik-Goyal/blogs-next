// pages/posts/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import Navbar from '../../../components/navbar';

type PostType = {
  title: string;
  content: string;
  id: number; // or whatever other fields you might have
  tags: string[];
};

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <Navbar/>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/api/posts'); // Adjusted for local endpoint
  const posts: PostType[] = await response.json();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
  const response = await fetch(`http://localhost:3000/api/posts/${params?.id}`); // Adjusted for local endpoint
  const post: PostType = await response.json();

  return { props: { post } };
};

export default Post;
