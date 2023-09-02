import React from "react";
import { Card } from "..";

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-20 pt-5 pb-5  place-items-center">
      {data.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Cards;
