import React, { ChangeEvent } from 'react';

type Props = {
    title: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  void;
    inputType?: 'input' | 'textarea';
}

const Formpost: React.FC<Props> = (props)  => {
    return (
    <div>
        <label htmlFor={props.title} className="block text-sm font-medium text-gray-700">
            {props.title}
        </label>
        {props.inputType === 'textarea' ? (
            <textarea
            id={props.title}
            name={props.title}
            onChange={props.onChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder={props.placeholder}
            required
          />
        ):(
            <input
            type="text"
            id={props.title}
            name={props.title}
            onChange={props.onChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder={props.placeholder}
            required
        />
        )}
      </div>
    )
}

export default Formpost