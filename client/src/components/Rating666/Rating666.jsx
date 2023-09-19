import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const colors = {
    orange: "#FA6600",
    grey: "#A9A9A9"
}

const Rating666 = () => {
    const stars = Array(5).fill(0);
    const [ currentValue, setCurrentValue ] = useState(0);
    const [ hoverValue, setHoverValue ] = useState(undefined);
    
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    console.log(currentValue)


    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
          <div className="text-2xl font-semibold mb-4">Rating666</div>
          <div className="flex justify-center p-4 gap-2 ">
            {stars.map((_, index) => (
              <FaStar
              key={index}
              size={24}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => {handleMouseOver(index + 1)}}
              onMouseLeave={handleMouseLeave}
                />
            ))}
          </div>
          <textarea
            className="w-full h-24 p-2 border border-black rounded-md mb-4"
            placeholder="What's your feedback"
          />
          <button className=" w-1/4 hover:bg-[#FA6600] bg-black text-white hover:text-black font-bold py-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      );
    };
    
    export default Rating666;