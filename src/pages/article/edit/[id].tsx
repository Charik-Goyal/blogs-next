import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Formpost from '../../../../components/formpost';
import Navbar from '../../../../components/navbar';
import axios from 'axios';

const EditPost = () => {
    const router = useRouter();
    const { id } = router.query;
    // State to hold the formData
    const [data, setData] = useState({
        title: '',
        content: '',
        image: '',
        paragraph: '',
        tags: '',
    });

    useEffect(() => {
        // Fetch initial data for the form from your API or other data source
        if (id) {
            axios.get(`http://localhost:3000/api/posts/${id}`)
                .then((response) => {
                    const postData = response.data; // Assuming your API returns data in the expected format
                    console.log(postData)
                    setData(postData);
                })
                .catch((error) => {
                    console.error("Error fetching post data:", error);
                });
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const sendObject = {
                id: id,
                ...data,
            }
            const response = await axios.put('http://localhost:3000/api/posts', sendObject, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                router.push(`/article/${id}`);
            }
            // Handle the response here, maybe set some state or navigate
        } catch (error) {
            // Handle any errors, maybe set an error state or display a notification
            console.error("Error updating post:", error);
        }
    }

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <Formpost inputType="input" title="title" placeholder="Enter title" onChange={handleChange} value={data.title} />
                <Formpost inputType="textarea" title="content" placeholder="Enter Content" onChange={handleChange} value={data.content} />
                <Formpost inputType="input" title="image" placeholder="Enter Image URL" onChange={handleChange} value={data.image} />
                <Formpost inputType="textarea" title="paragraph" placeholder="Enter Full description" onChange={handleChange} value={data.paragraph} />
                <Formpost inputType="input" title="tags" placeholder="Enter Relevant tags" onChange={handleChange} value={data.tags} />
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;
