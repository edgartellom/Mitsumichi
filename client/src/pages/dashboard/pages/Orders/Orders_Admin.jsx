import React, { useEffect, useState } from "react";
import axios from "axios";

const Products_Admin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const selectedOrdersID = selectedOrders.map(
    (selectedOrder) => selectedOrder?.id
  );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {}, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedOrders(selectAll ? [] : [...orders]);
  };

  const toggleSelectMoto = (order) => {
    const orderId = order?.id;
    const isSelected = selectedOrders.some(
      (selectedOrder) => selectedOrder.id === orderId
    );

    if (isSelected) {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((selectedOrder) => selectedOrder?.id !== orderId)
      );
    } else {
      setSelectedOrders((prevSelected) => [...prevSelected, order]);
    }
  };

  console.log(screenWidth);
  return (
    <div className="min-h-full bg-slate-100 p-4">
      <h1>Administrador de Productos</h1>
      <table className={`w-full border-2 shadow-sm duration-300`}>
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr className="">
            <th className="w-1/8 text-center pt-2">
              <input
                type="checkbox"
                className="w-5 h-5 ml-1 mx-auto"
                onChange={toggleSelectAll}
                checked={selectAll}
              />
            </th>
            <th className="text-center w-1/8 font-bold ml-1">ID</th>
            <th className="text-center w-1/8 font-bold">NO COMPROVANTE</th>
            <th className="text-center w-1/8 font-bold">CLIENTE</th>
            <th className="text-center w-1/8 font-bold">PAYMENT</th>
            <th className="text-center w-1/8 font-bold">ESTADO</th>
            <th className="text-center w-1/8 font-bold">FECHA</th>
            <th className="text-center w-1/8 font-bold mr-1">TOTAL</th>
          </tr>
        </thead>
        <tbody
          className={`bg-white duration-300 ${
            screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
          }`}
        >
          {orders.map((order) => (
            <tr className="hover:text-blue-400 h-[75px]" key={order?.id}>
              <td className="text-center w-1/8">
                <input
                  type="checkbox"
                  className="w-4 h-4 ml-1"
                  onChange={() => toggleSelectMoto(order)}
                  checked={setSelectedOrders.includes(order)}
                />
              </td>

              <td className="text-center w-1/8 font-bold ml-1">{order?.id}</td>

              <td className="text-center w-1/8">
                <img
                  src={order?.comprobante}
                  alt="Moto"
                  width="100"
                  className="mx-auto"
                />
              </td>

              <td className="text-center w-1/8 font-bold uppercase hover:text-[#C63D05] cursor-pointer">
                {order?.client?.name}
              </td>

              <td className="text-center w-1/8 font-bold uppercase">
                {order?.payment?.companyname}
              </td>

              <td
                className={`text-center w-1/8 font-bold uppercase ${
                  order?.status === "sussess"
                    ? "text-green-600"
                    : order?.status === "failed"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {order?.status === "sussess"
                  ? "Pago Realizado"
                  : order?.status === "failed"
                  ? "Pago Fallido"
                  : "Procesando..."}
              </td>

              <td className="text-center w-1/8 font-bold">
                {order?.data?.date}
              </td>

              <td className="text-center w-1/8 font-bold text-blue-600 mr-1">
                {parseFloat(order?.montototal).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products_Admin;
