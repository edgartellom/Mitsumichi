import React, { useEffect, useState } from "react";
import getAllUsers from "../../../../firebase/getAllUsers";
import getInvoicesByUser from "../../../../firebase/getInvoicesByUser";
const Users_Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllUsers();
      setUsers(response);
    })();
  }, []);

  console.log(users, "users");

  return (
    <div className=" bg-slate-100 p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 border-black  border-2 text-left">
              <input type="checkbox" />
            </th>
            <th className="py-2 px-4 border-2 border-black  text-left">ID</th>
            <th className="py-2 px-4 border-2 border-black  text-left">
              USUARIO
            </th>
            <th className="py-2 px-4 border-2 border-black  text-left">ROLE</th>
            <th className="py-2 px-4 border-2 border-black  text-left">
              NO. ORDEN
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

            return (
              <tr key={id} className=" bg-white border-2 ">
                <td className=" px-4 bg-slate-100  border-2">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4">{id}</td>
                <td className="py-2 px-4">{user.data?.name}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">NO. ORDEN</td>
                <td className="py-2 px-4">STATUS</td>
                <td className="py-2 px-4">TOTAL PAYMENT</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users_Admin;
