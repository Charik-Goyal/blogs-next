import Image from "next/image";
import Link from "next/link";
import React from 'react';

type Props = {
    id:number;
    title: string;
    content: string;
    tags: Array<string>;
  };

const Card: React.FC<Props> = (props) => {
    return (
        <Link href={`/article/${props.id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-auto" src={props.image} alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.title}</div>
            <p className="text-gray-700 text-base">
                {props.content}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            {props.tags.map((tag:string, ind: number) => (
                <span key={ind} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
            ))}
        </div>
        </div>
        </Link>
    )
}

export default Card