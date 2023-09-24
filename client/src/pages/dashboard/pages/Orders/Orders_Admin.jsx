import React, { useContext, useEffect, useState } from "react";

import { userAuth } from "../../../../context/Auth-context";

import axios from "axios";

import {
  MdOutlineDeleteForever,
  MdOutlineRestoreFromTrash,
} from "react-icons/md";

import "../styles.css";

const Products_Admin = () => {
  const { allInvoices } = useContext(userAuth);
  const invoicesToArr = Object.values(allInvoices);

  const [showItems, setShowItems] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
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
    setSelectedOrders(selectAll ? [] : [...allInvoices]);
  };

  const toggleSelectOrder = (order) => {
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

  useEffect(() => {
    if (allInvoices.length > 0) {
      const animationDelay = 30;
      allInvoices.forEach((_, index) => {
        setTimeout(() => {
          setShowItems((prevShowItems) => [...prevShowItems, index]);
        }, animationDelay * index);
      });
    }
  }, [allInvoices]);

  return (
    <div className="min-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter relative">
      <button
        className="absolute duration-200 top-4 right-2 bg-[#303030] font-bold rounded-lg shadow-sm hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#252525] cursor-pointer"
        onClick={""}
      >
        <div className="flex flex-row py-2 pr-2 items-center justify-between h-8 text-white hover:text-red-600 ">
          <MdOutlineRestoreFromTrash size={30} />
          <span className="">REMOVE</span>
        </div>
      </button>
      <h1 className="pb-2 -pt-2 text-2xl font-bold text-[#c63d05] uppercase">
        Lista de Ordenes
      </h1>
      <table
        className={`w-full rounded-md shadow-sm shadow-[#252525] overflow-hidden`}
      >
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr className="">
            <th className="w-1/8 text-center pt-1">
              <label className="flex container items-center justify-center">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selectAll}
                />
                <div className="checkmark"></div>
              </label>
              {/* <input
                type="checkbox"
                className="w-5 h-5 ml-1 mx-auto"
                onChange={toggleSelectAll}
                checked={selectAll}
              /> */}
            </th>
            <th className="text-center w-1/8 font-bold ml-1 text-with-text-shadow">
              ID
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow">
              NO COMPROVANTE
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow">
              CLIENTE
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow">
              PAYMENT
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow">
              ESTADO
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow">
              FECHA
            </th>
            <th className="text-center w-1/8 font-bold text-with-text-shadow mr-1">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody
          className={`bg-white duration-300 ${
            screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
          }`}
        >
          {invoicesToArr.map((order, index) => {
            let precioTOTAL = Object.values(invoicesToArr[index])
              .map((item) =>
                item?.precio && item?.cantidad ? item.precio * item.cantidad : 0
              )
              .reduce((a, b) => a + b, 0);

            return (
              <tr
                className={`hover:text-blue-400 h-[75px] ${
                  showItems.includes(index)
                    ? "duration-200 opacity-100 translate-y-0"
                    : "duration-200 opacity-0 translate-y-10"
                }`}
                key={order?.id}
              >
                <td className="text-center w-1/8">
                  <label className="flex container items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectOrder(order)}
                      checked={selectedOrdersID.includes(order?.id)}
                    />
                    <div className="checkmarklist"></div>
                  </label>
                  {/* <input
                    type="checkbox"
                    className="w-4 h-4 ml-1"
                    onChange={() => toggleSelectOrder(order)}
                    checked={selectedOrdersID.includes(order?.id)}
                  /> */}
                </td>

                <td className="text-center w-1/8 font-bold ml-1">
                  {index + 1}
                </td>

                <td className="text-center w-1/8 font-bold uppercase hover:text-[#C63D05] cursor-pointer">
                  {order?.id}
                </td>

                <td className="text-center w-1/8 font-bold uppercase hover:text-[#C63D05] cursor-pointer">
                  {order?.user?.data?.username}
                </td>

                <td className="text-center w-1/8 font-bold uppercase">
                  PAYPAL
                </td>

                <td
                  className={`text-center w-1/8 font-bold uppercase ${
                    order?.status === "success"
                      ? "text-green-600"
                      : order?.status === "failed"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {order?.status === "success"
                    ? "Pago Realizado"
                    : order?.status === "failed"
                    ? "Pago Fallido"
                    : "Procesando..."}
                </td>

                <td className="text-center w-1/8 font-bold">{order?.today}</td>

                <td className="text-center w-1/8 font-bold text-blue-600 mr-1">
                  {parseFloat(precioTOTAL).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products_Admin;
