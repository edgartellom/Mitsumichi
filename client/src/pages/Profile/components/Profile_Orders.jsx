import React, { useState, useEffect, useContext } from "react";
import { userAuth } from "../../../context/Auth-context";

import getInvoicesByUser from "../../../firebase/getInvoicesByUser";
import { Invoice } from "../../../components";

const Profile_Orders = () => {
  const { user } = useContext(userAuth);

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Para almacenar los datos de la factura seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar la visibilidad del modal

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    (async () => {
      const invoices = await getInvoicesByUser(user?.id);
      setInvoices(invoices);
    })();
  }, [user]);

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-50 min-h-full pl-4 pr-1 py-4 border-t-2 border-[#c63d05] justify-center overflow-y-scroll scrollbar-gutter relative">
      <table
        className={`w-full rounded-md shadow-sm shadow-[#252525] overflow-hidden`}
      >
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr className="uppercase">
            <th className="text-center w-[20%] font-bold ml-1 text-with-text-shadow">
              id de compra
            </th>
            <th className="text-center w-[60%] font-bold text-with-text-shadow">
              articulos por orden
            </th>
            <th className="text-center w-[20%] font-bold text-with-text-shadow">
              total por orden
            </th>
          </tr>
        </thead>
        {invoices.length > 0 ? (
          <tbody
            className={`bg-white duration-300 ${
              screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
            }`}
          >
            {invoices.map((invoice) => {
              let arregloDeObjetos = Object.values(invoice);
              let PrecioTotal = arregloDeObjetos
                .map((item) =>
                  item?.precio && item?.cantidad
                    ? item.precio * item.cantidad
                    : 0
                )
                .reduce((a, b) => a + b, 0);

              const cantidadArticulos = arregloDeObjetos
                .map((item) => item?.cantidad)
                .filter((item) => !isNaN(item))
                .reduce((a, b) => a + b, 0);

              return (
                <tr className={`hover:text-blue-400 h-[75px]`} key={invoice.id}>
                  <td
                    className="text-center w-[20%] font-bold uppercase hover:text-[#C63D05] cursor-pointer"
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    {invoice.id}
                  </td>
                  <td className="text-center w-[60%] font-bold ">
                    Esta Orden Incluye{" _"}
                    <span className="text-[#C63D05]">{cantidadArticulos}</span>
                    {"_ "}
                    {cantidadArticulos > 1 ? "Motos" : "Moto"}
                  </td>
                  <td className="text-center w-[20%] font-bold text-blue-600 mr-1">
                    {parseFloat(PrecioTotal).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <div className="relative h-10 font-bold items-center m-2 text-orange-600 text-2xl pb-5">
            <p className="absolute top-1 -right-[85%]">No hay compras aun</p>
          </div>
        )}
      </table>
      {isModalOpen && (
        <Invoice facturaData={selectedInvoice} onClose={closeModal} />
      )}
    </div>
  );
};

export default Profile_Orders;
