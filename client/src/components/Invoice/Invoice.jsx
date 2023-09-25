import React from "react";
import { FaWindowClose, FaFileDownload } from "react-icons/fa";
import Wrapper from "../../helper/Wrapper";
import logoCerradoWhite from "../../assets/Logo_Mitsumichi_White.png";
import logoCerradoBlack from "../../assets/Logo_Mitsumichi.png";
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

        <div className="relative flex min-w-[50%] max-w-[80%] min-h-[80%] pb-16 py-4 px-10 bg-white rounded-md justify-between overflow-hidden">
          <p className="absolute font-semibold ">
            Fecha de realización: 24/04/2022
          </p>
          <div>
            <div className="flex flex-row mt-12 justify-between items-center w-[100%]">
              <div className="flex flex-row w-[500px] h-[250px] bg-[#C63D05] mx-5 rounded-md p-4">
                <section className="flex w-[200px] items-center">
                  <img src={logoCerradoWhite} alt="" width={200} />
                </section>
                <div className="border-r-2 mx-2 border-[#252525]"></div>
                <section className="flex w-[calc(100%_-_200px)] flex-col items-center justify-between">
                  <h1 className="text-center text-3xl font-bold">MITSUMICHI</h1>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold">© 2023 MITSUMISHI S.A.</p>
                    <p className=" ">Todos los derechos reservados</p>
                  </div>
                </section>
              </div>

              <div className="flex flex-row w-[500px] h-[250px] mx-5 rounded-md p-4 border-2 border-[#252525]">
                <section className="flex flex-col justify-center">
                  <ul className="text-xl">
                    <li>
                      <span className="text-2xl font-semibold">
                        No. Factura:{" "}
                      </span>
                      EP2555515851
                    </li>
                    <br />
                    <li>
                      <span className="text-2xl font-semibold">Cliente: </span>
                      Hengers Emmanuel Rosario Morales
                    </li>
                    <li>
                      <span className="text-2xl font-semibold">
                        Dirección:{" "}
                      </span>
                      Concepción La Vega, República Dominicana
                    </li>
                    <li>
                      <span className="text-2xl font-semibold">Tel: </span>
                      +1(809)-252-5452
                    </li>
                    <li>
                      <span className="text-2xl font-semibold">Email: </span>
                      hengersrosario@example.com
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            <div className="flex flex-col mt-12 mx-5">
              <table className="w-full">
                <thead className="bg-[#C63D05]">
                  <tr>
                    <th className="text-white w-1/5">Id Producto</th>
                    <th className="text-white w-1/5">
                      Descripción del Producto
                    </th>
                    <th className="text-white w-1/5">Cantidad</th>
                    <th className="text-white w-1/5">Precio Und</th>
                    <th className="text-white w-1/5">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="text-center w-1/5">1</td>
                    <td className="text-center w-1/5">YAMAHA R6 250cc</td>
                    <td className="text-center w-1/5">2</td>
                    <td className="text-center w-1/5">$3,500.00</td>
                    <td className="text-center w-1/5">$7,000.00</td>
                  </tr>
                  <tr>
                    <td className="text-center w-1/5">2</td>
                    <td className="text-center w-1/5">HONDA CBR 250cc</td>
                    <td className="text-center w-1/5">1</td>
                    <td className="text-center w-1/5">$8,500.00</td>
                    <td className="text-center w-1/5">$8,500.00</td>
                  </tr>
                </tbody>
              </table>
              <ul className="mt-10 text-xl font-bold text-[#252525]">
                <li className="border-b border-gray-300">Sub Total:</li>
                <li className="border-b border-gray-300">Descuento:</li>
                <li className="text-3xl mt-4">Total:</li>
              </ul>
            </div>

            <div className="flex flex-row w-[100%] mt-5 rounded-md p-4">
              <section className="flex w-[200px] items-center">
                <img src={logoCerradoBlack} alt="" width={150} />
              </section>
              <section className="flex flex-col w-[100%]">
                <p className="text-justify pb-5">
                  Eres parte esencial de lo que hacemos en{" "}
                  <span className="font-semibold">MITSUMICHI</span>; por eso,
                  nos mantenemos pendientes de lo que necesitas y actuamos para
                  brindarte soluciones relevantes.
                </p>
                <p className="text-justify uppercase">
                  GRACIAS POR HACER NEGOCIOS CON NOSOSTROS!!!
                </p>
              </section>
            </div>
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
