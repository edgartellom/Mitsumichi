import React, { useState, useEffect, useContext } from "react";
import { userAuth } from "../../../../context/Auth-context";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { format, parse } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Wrapper from "../../../../helper/Wrapper";

import { FaWindowClose, FaFileDownload } from "react-icons/fa";
import logoCerradoWhite from "../../../../assets/Logo_Mitsumichi_White.png";
import logoCerradoBlack from "../../../../assets/Logo_Mitsumichi.png";

function convertirFechaLarga(fechaStr) {
  // Parsea la cadena de fecha en un objeto de fecha
  const fecha = parse(fechaStr, "d/M/yyyy", new Date());

  // Formatea la fecha
  const fechaLarga = format(fecha, "EEEE, dd MMMM yyyy");

  return fechaLarga;
}

const Invoice_Dashboard = ({ facturaData, onClose }) => {
  const fechaStr = facturaData?.today;

  const fechaLarga = convertirFechaLarga(fechaStr);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const elementosComprados = Object.values(facturaData).filter(
    (item) => item.brand && item.cantidad && item.precio && item.motoModel
  );

  const phoneNumber = parsePhoneNumberFromString(
    facturaData?.user?.data?.telefono || ""
  ); // facturaData?.user?.data?.telefono

  // Función para formatear el ID
  const formatID = (id) => {
    // Obtener la longitud actual del ID
    const idLength = id.toString().length;

    // Calcular la cantidad de ceros necesarios
    const zerosToAdd = Math.max(0, 5 - idLength); // Siempre habrá al menos 5 caracteres

    // Se crea una cadena de ceros
    const zeroString = "0".repeat(zerosToAdd);

    // Y le damos formato al ID finalmente
    const formattedID = `MIT${zeroString}${id}`;

    return formattedID;
  };

  const subtotal = elementosComprados.reduce(
    (total, producto) =>
      total + parseFloat(producto.precio) * producto.cantidad,
    0
  );
  const captureComponentAsPDF = () => {
    const scaleWidth = 1; // Escala para la captura
    const screenHeight = 2;

    // Calcula el ancho y alto del contenedor multiplicado por la escala
    const width =
      document.getElementById("invoice-container").clientWidth * scaleWidth;
    const height =
      document.getElementById("invoice-container").clientHeight * screenHeight;

    html2canvas(document.getElementById("invoice-container"), {
      // Se configura el ancho y alto de la captura
      width: width,
      height: height,
      scale: (scaleWidth, screenHeight),
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Configura el documento PDF
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Tamaño A4: 210x297 mm

      // Guarda o descarga el PDF
      pdf.save("Mitsumichi-Factura.pdf");
    });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Wrapper>
      <div className="relative flex flex-col min-w-[80%] min-h-[90%] max-h-[90%] mt-16 items-center justify-center p-4">
        <div
          className={`relative flex w-[1150px] min-h-[85%] max-h-[85%] pb-8 pt-4 px-10 bg-white rounded-md justify-between overflow-hidden overflow-y-scroll scrollbar-gutter`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-[#C63D05] transition duration-300 hover:text-[#252525] hover:scale-110 z-10"
          >
            <FaWindowClose size={30} />
          </button>
          <div id="invoice-container" className="relative">
            <p className="absolute left-4 ">
              <span className="font-semibold">Fecha de realización: </span>
              {fechaLarga}
            </p>
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

              <div className="flex flex-row w-[500px] h-[250px] mx-5 rounded-md px-6 border-2 border-[#252525]">
                <div className="flex flex-col justify-between py-4 text-xl ">
                  <section>
                    <p>
                      <span className="text-2xl font-semibold">
                        No. Factura:{" "}
                      </span>
                      {"MIT"}
                      {facturaData?.id}
                    </p>
                  </section>

                  <section>
                    <p>
                      <span className="text-2xl font-semibold">Cliente: </span>
                      {facturaData?.user?.data?.name}{" "}
                      {facturaData?.user?.data?.apellido}
                    </p>
                    <p>
                      <span className="text-2xl font-semibold">
                        Dirección:{" "}
                      </span>
                      {facturaData?.user?.data?.direccion}
                    </p>
                    <p>
                      <span className="text-2xl font-semibold">Tel: </span>
                      {phoneNumber.formatInternational()}
                    </p>
                    <p>
                      <span className="text-2xl font-semibold">Email: </span>
                      {facturaData?.user?.email}
                    </p>
                  </section>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-12 mx-5">
              <table className="w-full">
                <thead className="bg-[#C63D05] h-fit">
                  <tr className="py-5">
                    <th className="text-white w-[10%] pb-2 uppercase">
                      Id Producto
                    </th>
                    <th className="text-white w-[35%] pb-2 uppercase">
                      Descripción del Producto
                    </th>
                    <th className="text-white w-[10%] pb-2 uppercase">
                      Categoria
                    </th>
                    <th className="text-white w-[10%] pb-2 uppercase">
                      Cantidad
                    </th>
                    <th className="text-white w-[10%] pb-2 uppercase">
                      Precio Und
                    </th>
                    <th className="text-white w-[10%] pb-2 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {elementosComprados.length > 0 ? (
                    elementosComprados.map((producto, index) => (
                      <tr key={index} className="border-b border-gray-300 h-10">
                        <td className="text-center w-[10%]">
                          {formatID(producto?.id)}
                        </td>
                        <td className="text-center w-[35%] uppercase">
                          {producto?.brand} {" - "} {producto?.motoModel}
                        </td>
                        <td className="text-center w-[10%] uppercase">
                          {producto?.tipo}
                        </td>
                        <td className="text-center w-[10%]">
                          {producto?.cantidad}{" "}
                          {producto?.cantidad > 1 ? "UNDS" : "UND"}
                        </td>
                        <td className="text-center w-[10%]">
                          <div className="flex flex-row w-full justify-between px-5 ">
                            <p>$</p>
                            <p>
                              {parseFloat(producto?.precio).toLocaleString(
                                "en-US",
                                {
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="text-center w-[10%]">
                          <div className="flex flex-row w-full justify-between px-5 ">
                            <p>$</p>
                            <p>
                              {parseFloat(
                                producto?.precio * producto?.cantidad
                              ).toLocaleString("en-US", {
                                currency: "USD",
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No hay datos de factura disponibles.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ul className="mt-10 font-bold text-[#252525]">
                <li className="flex flex-row justify-between border-b border-gray-300 h-10">
                  <div className="flex flex-row w-full justify-between ">
                    <section className="w-[100%] pl-6">
                      <p className="uppercase">Sub Total:</p>
                    </section>
                    <section className="flex flex-row w-48 justify-between pl-12 pr-5">
                      <p>$</p>
                      <p>
                        {parseFloat(subtotal).toLocaleString("en-US", {
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </section>
                  </div>
                </li>

                <li className="flex flex-row justify-between border-b border-gray-300 h-10">
                  <div className="flex flex-row w-full justify-between">
                    <section className="w-[100%] pl-6">
                      <p className="uppercase">Descuento:</p>
                    </section>
                    <section className="flex flex-row w-48 justify-between pl-12 pr-5">
                      <p>$</p>
                      <p>
                        {parseFloat(0).toLocaleString("en-US", {
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </section>
                  </div>
                </li>

                <li className="flex flex-row justify-between text-3xl mt-4">
                  <div className="flex flex-row w-full justify-between">
                    <section className="w-[100%] pl-6">
                      <p className="uppercase">Total:</p>
                    </section>
                    <section className="flex flex-row w-72 justify-between pl-12 pr-5">
                      <p>$</p>
                      <p>
                        {parseFloat(subtotal).toLocaleString("en-US", {
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </section>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-row w-[100%] items-center mt-5 rounded-md p-4">
              <section className="flex w-[200px] items-center">
                <img src={logoCerradoBlack} alt="" width={150} />
              </section>
              <section className="flex flex-col text-lg w-[100%]">
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
        </div>

        <button
          type="button"
          onClick={captureComponentAsPDF}
          className="absolute bottom-4 -right-6 flex items-center justify-center p-2 bg-white text-[#C63D05] font-bold  rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600] hover:scale-105"
        >
          <span className="mr-2">Descargar</span> <FaFileDownload size={20} />
        </button>
      </div>
    </Wrapper>
  );
};

export default Invoice_Dashboard;
