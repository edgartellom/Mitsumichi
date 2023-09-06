import React, { useState } from "react";
import { Moto_Create } from "../../pages/dashboard";
// Asegúrate de importar correctamente tu componente CreateMoto

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4  ">
      <button
        className="flex cursor-pointer border-2 border-rigged items-center justify-center bg-black text-white px-3 pt-1 pb-2 font-bold text-3xl rounded-full hover:bg-[#FFD700] hover:text-gray-900 hover:border-[#FFD700] transition duration-300"
        onClick={openModal}
      >
        <h1>+</h1>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg w-4/5 max-w-lg max-h-[90%] overflow-y-auto scroll-m-1 scr ">
            <button
              className="absolute text-center border-2 border-rigged items-center top-4 right-6 font-bold text-3xl bg-slate-100 text-red-600 px-0.5 py-1 rounded-full hover:bg-[#202020] transition  duration-300 hover:scale-0.7"
              onClick={closeModal}
            >
              ❌
            </button>
            <Moto_Create />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
