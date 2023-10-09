// pages/posts/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import Navbar from '../../../components/navbar';
import { useRouter } from 'next/router';
import { RiChatDeleteFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';

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

  const router = useRouter();
  const { id } = router.query;

  const handleEdit = () => {
    localStorage.setItem('formData', JSON.stringify(post));
    router.push(`/article/edit/${id}`);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delpost/${id}`);
      // Handle the response or redirect as needed
      if(response.status===200){
        router.push('/')
      }
      
    } catch (error) {
      // Handle the error
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='fixed top-16 right-2'>
        <span>
          <button className='px-4 py-1 mr-2 text-sm text-gray-600 font-semibold rounded-full border border-gray-200 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2' onClick={handleEdit}><AiFillEdit size={20}/></button>
          <button className="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-200 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2" onClick={handleDelete}><RiChatDeleteFill size={20}/></button>
        </span>
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  
  const response = await fetch('http://localhost:3000/api/posts'); // Adjusted for local endpoint
  const posts: PostType[] = await response.json();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const session = getServerSession(context)
  // console.log(session)
  const response = await fetch(`http://localhost:3000/api/posts/${params?.id}`); // Adjusted for local endpoint
  const post: PostType = await response.json();

  return { props: { post } };
};

export default Post;
