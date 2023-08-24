import React from "react";
import Card from "../Card/Card";

const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-3 p-4">
      {data.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Cards;
