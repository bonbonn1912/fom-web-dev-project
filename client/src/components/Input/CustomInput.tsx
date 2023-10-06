import { useState } from 'react';
const CustomInput = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(inputValue === '');
    };
  
    const handleChange = (event: any) => {
      setInputValue(event.target.value);
    };
  
    return (
      <div className={`relative ${isFocused ? 'mt-4' : 'mt-8'}`}>
        <input
          type="text"
          placeholder=" "
          className={`w-full p-3 border-b-2 ${isFocused ? 'border-blue-500' : 'border-gray-300'}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
        />
        <label
          className={`absolute top-0 left-0 transition-all ${isFocused || inputValue ? 'text-blue-500' : 'text-gray-500'} ${
            inputValue ? 'text-sm' : 'text-base'
          }`}
        >
          Placeholder
        </label>
      </div>
    );
  };
  
  export default CustomInput;