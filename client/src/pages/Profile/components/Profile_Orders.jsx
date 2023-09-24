import React, { useState, useEffect, useContext } from "react";
import { userAuth } from "../../../context/Auth-context";

import getInvoicesByUser from "../../../firebase/getInvoicesByUser";

const Profile_Orders = () => {
  const { user } = useContext(userAuth);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
      const invoices = await getInvoicesByUser(user?.id);
      setInvoices(invoices);
    })();
  }, [user]);

  return (
    <div>
      <section className="py-10">
        <h1 className="font-bold text-center text-3xl pb-5">Compras</h1>
        {invoices.length > 0 ? (
          <table className="w-full  border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Id</th>
                <th className="py-2 px-4">Cantidad</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
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
                  <tr
                    key={invoice.id}
                    className="bg-white hover:bg-gray-200 text-center"
                  >
                    <td className="py-2 px-4">{invoice.id}</td>
                    <td className="py-2 px-4">{cantidadArticulos}</td>
                    <td className="py-2 px-4">{PrecioTotal} $</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="font-bold text-center text-orange-600 text-3xl pb-5">
            No hay compras aun
          </h1>
        )}
      </section>
    </div>
  );
};

export default Profile_Orders;
