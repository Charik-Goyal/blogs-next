import React, { ChangeEvent, useState } from 'react';
import Formpost from '../../components/formpost';
import Navbar from '../../components/navbar';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

type FormData = {
  title: string;
  content: string;
  image: string;
  paragraph: string;
  tags: string;
};

type MyFormProps = {
  value: {
    user: {
      id: string;
    };
  };
};

export default function MyForm({value}: MyFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    paragraph: '',
    tags: '',
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(e, name, value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, content, image, paragraph, tags } = formData;
    // ... Submit form data or handle it as needed
    //authorId: value.user.id
    const response = await axios.post('http://localhost:3000/api/posts', {
      title,
      content,
      image,
      paragraph,
      tags: tags.split(','),
      authorId: parseInt(value.user.id),
    })
    if(response.status===201){
      setFormData({
        title: '',
        content: '',
        image: '',
        paragraph: '',
        tags: '',
      })
    }
  };

  return (
    <div>
    <Navbar/>
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <Formpost inputType="input" title="title" placeholder="Enter title" onChange={handleChange}/>
      <Formpost inputType="textarea" title="content" placeholder="Enter Content" onChange={handleChange}/>
      <Formpost inputType="input" title="image" placeholder="Enter Image URL" onChange={handleChange}/>
      <Formpost inputType="textarea" title="paragraph" placeholder="Enter Full description" onChange={handleChange}/>
      <Formpost inputType="input" title="tags" placeholder="Enter Relevant tags" onChange={handleChange}/>
      <div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
    if (!session || !session.user) {
      return {
        redirect: {
          destination: '/api/auth/signin', // Redirect to your login page
          permanent: false,
        },
      };
    }
    return {props: {
      value: session
    }}

  }