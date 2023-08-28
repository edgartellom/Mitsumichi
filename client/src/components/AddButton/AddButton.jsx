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
    <div className="fixed bottom-4 right-4 ">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={openModal}
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg w-4/5 max-w-lg max-h-[90%] overflow-y-auto scroll-m-1 scr ">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={closeModal}
            >
              X
            </button>
            <Moto_Create />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
