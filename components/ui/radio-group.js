import { useState } from 'react';

export default function RadioGroup({options, name, extraClasses}) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={`${extraClasses} grid! grid-cols-1 sm:grid-cols-3 gap-4`}>
            {options.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id={item.value}
                        name={name}
                        value={item.value}
                        checked={selectedOption === item.value}
                        onChange={() => setSelectedOption(item.value)}
                        className="hidden peer"
                    />
                    <span className="w-4 h-4 mr-2 border-2 border-gray-500 rounded-full peer-checked:bg-white flex items-center justify-center ">
                        <span className="w-2 h-2 bg-white rounded-full hidden peer-checked:block"></span>
                    </span>
                    <label htmlFor={item.value} className="cursor-pointer text-sm">
                        {item.name}
                    </label>
                </div>
            ))}

        </div>
    )
}