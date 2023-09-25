import React from "react";
import { FaWindowClose, FaFileDownload } from "react-icons/fa";
import Wrapper from "../../helper/Wrapper";
import logoCerrado from "../../assets/Logo_Mitsumichi_White.png";

const Invoice = ({ selectedInvoice, onClose }) => {
  return (
    <Wrapper>
      <div className="relative flex flex-col min-w-[80%] min-h-[85%] max-h-[85%] items-center justify-center p-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-red-700 transition-all hover:scale-110"
        >
          <FaWindowClose size={30} />
        </button>

        <div className="relative min-w-[50%] max-w-[80%] min-h-[80%] m-10 py-4 px-10 bg-white rounded-md">
          <p>Fecha: </p>

          <div className="flex flex-row w-[80%]">
            <div className="flex flex-row w-[40%] bg-[#C63D05] rounded-md p-4">
              <section>
                <img src={logoCerrado} alt="" width={750} />
              </section>
              <br />
              <section className="flex flex-col">MITSUMICHI</section>
            </div>

            <div className="flex flex-col"></div>
          </div>

          <button className="absolute bottom-4 right-4 flex items-center justify-center bg-[#C63D05] p-2 rounded-lg duration-300 text-lg font-semibold text-white shadow-sm hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600]">
            <span className="mr-2">Descargar</span> <FaFileDownload size={20} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Invoice;
