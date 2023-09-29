import React from "react";
import Wrapper from "../../../../helper/Wrapper";
import { FaWindowClose } from "react-icons/fa";

const EditUser = ({ userData, onClose }) => {
  console.log(userData);
  return (
    <Wrapper>
      <div className="overflow-y-scroll scrollbar-gutter">
        <div className="relative flex w-[450px] h-[600px] bg-white p-10 rounded-md">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl text-[#C63D05] transition duration-300 hover:text-[#252525] hover:scale-110 z-10"
          >
            <FaWindowClose size={30} />
          </button>
          <div className="w-full h-full p-4">{/* Aqui trabaja Angel*/}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditUser;
