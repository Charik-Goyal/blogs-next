import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Card from '../../components/card';
import { GetServerSideProps } from 'next/types';
import { getSession } from 'next-auth/react';
import axios from 'axios';

type PostType = {
  title: string;
  content: string;
  id: number;
  image: string;
  tags: string[];
};

export default function Home({ initialPosts }: { initialPosts: PostType[] }) {
  const [posts] = useState<PostType[]>(initialPosts);

  return (
    <div>
      <Navbar/>
      <div className='flex flex-wrap justify-center gap-4 my-4'>
        {posts.map(post => (
          <Card image={post.image} key={post.id} id={post.id} title={post.title} content={post.content} tags={post.tags} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("SSR",session)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/api/auth/signin', // Redirect to your login page
        permanent: false,
      },
    };
  }

  const {data} = await axios.get('http://localhost:3000/api/posts')
  const initialPosts = data  

  return { props: { initialPosts } };
}


