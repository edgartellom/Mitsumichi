import React, { useState } from "react";
import { Moto_Create } from "../../pages/dashboard";
import Button from "../UI/Button";
import Wrapper from "../../helper/Wrapper";
// Asegúrate de importar correctamente tu componente CreateMoto

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="fixed bottom-4 right-4  ">
      <Button
        className="border-2 border-rigged  text-white pt-1  font-bold text-3xl rounded-full hover:bg-orange-700 hover:text-black transition duration-300"
        onClick={() => setIsModalOpen((prev) => !prev)}
        text="+"
      />

      {isModalOpen && (
        <Wrapper>
          <div className="bg-white p-4 rounded-lg w-4/5 max-w-lg max-h-[90%] overflow-y-auto scroll-m-1 scr ">
            <Button
              className="absolute top-4 right-6 pt-1 text-white rounded-full hover:bg-orange-700 transition  duration-200"
              onClick={() => setIsModalOpen((prev) => !prev)}
              text="x"
            />
            <Moto_Create />
          </div>
        </Wrapper>
      )}
    </section>
  );
};

export default FloatingButton;
