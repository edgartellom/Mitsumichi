import React from "react";
import Slider from "react-slider";

const NewSlider = ({ name, min, max, onChange, value }) => {
  return (
    <section>
      <h3 className="mt-6 ml-2 text-lg font-bold">{name}</h3>
      <div className="">
        {value[0]} - {value[1]}
      </div>
      <small>Current Range: {value[1] - value[0]}</small>
      <Slider
        className="slider"
        onChange={onChange}
        value={value}
        min={min}
        max={max}
      />
    </section>
  );
};

export default NewSlider;
