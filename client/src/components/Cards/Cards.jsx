import React from "react";
import { Card } from "..";

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))]  py-10  place-items-center">
      {data.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Cards;
