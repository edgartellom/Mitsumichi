import React, { useContext } from "react";
import { userAuth } from "../../../../context/Auth-context";
const Users_Admin = () => {
  const { users, invoices } = useContext(userAuth);

  const invoicesToArr = Object.values(invoices);

  console.log(invoicesToArr, "invoicesToArr");

  return (
    <div className=" bg-slate-100 pt-10">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 border-black  border-2 text-left">
              <input type="checkbox" className="w-6 h-6 " />
            </th>
            <th className="py-2 px-4 border-2 border-black  text-left">ID</th>
            <th className="py-2 px-4 border-2 border-black  text-left">
              USUARIO
            </th>
            <th className="py-2 px-4 border-2 border-black  text-left">ROLE</th>
            <th className="py-2 px-4 border-2 border-black  text-left">
              Cant. ORDENES
            </th>
            <th className="py-2 px-4 border-2 border-black  text-left">
              STATUS
            </th>
            <th className="py-2 px-4 border-2 border-black text-left">
              TOTAL PAYMENT
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const id = index + 1;
            const precioTOTAL = invoicesToArr[index]
              ?.map((item) => item[0]?.precio)
              .map(Number)
              .filter((item) => !isNaN(item))
              .reduce((a, b) => a + b, 0);
            console.log(precioTOTAL, "precioTOTAL");
            return (
              <tr key={id} className=" bg-white border-2 font-bold ">
                <td className=" px-4 bg-slate-100  border-2 ">
                  <input type="checkbox" className="w-6 h-6 " />
                </td>
                <td className="py-2 px-4">{id}</td>
                <td className="py-2 px-4">{user.data?.name}</td>
                <td className="py-2 px-4 text-center">{user.role}</td>
                <td className="py-2 px-4 text-center">
                  {invoicesToArr[index]?.length}
                </td>
                <td className="py-2 px-4 text-center">ACTIVE</td>
                <td className="py-2 px-4 text-center text-orange-600">
                  {precioTOTAL} $
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users_Admin;
