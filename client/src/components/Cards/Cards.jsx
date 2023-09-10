import React from "react";
import { Card } from "..";

const Cards = ({ data }) => {
  return (
    <li className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))]  py-24 gap-16   place-items-center">
      {data.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </li>
  );
};

export default Cards;
