import { useContext, useEffect, useState } from "react";
import login from "../../assets/login.png";
import { userAuth } from "../../context/Auth-context";
import getInvoicesByUser from "../../firebase/getInvoicesByUser";
const Profile = () => {
  const { currentUser } = useContext(userAuth);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
      const invoices = await getInvoicesByUser(currentUser.uid);
      setInvoices(invoices);
    })();
  }, [currentUser]);

  return (
    <section>
      <div className=" text-center font-extrabold text-4xl pb-5">
        <h1>Profile</h1>
      </div>
      <section className=" grid grid-cols-1 ">
        <section className="flex flex-col items-center ">
          <picture>
            <img
              className=" bg-red-600 rounded-full"
              src={currentUser?.photoURL || login}
              width={200}
              alt=""
            />
          </picture>
          <section className=" text-center">
            <h3 className=" font-semibold text-2xl">
              {currentUser?.displayName}
            </h3>
            {/* <h3 className=" font-semibold text-2xl">Email: ssdsd</h3> */}
          </section>
        </section>
        <section className="p-10">
          <h1 className="font-bold text-center text-3xl pb-5">Compras</h1>
          <table className="w-full border-collapse">
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
                  .map((item) => item.precio)
                  .map(Number)
                  .filter((item) => !isNaN(item))
                  .reduce((a, b) => a + b, 0);

                return (
                  <tr
                    key={invoice.id}
                    className="bg-white hover:bg-gray-200 text-center"
                  >
                    <td className="py-2 px-4">{invoice.id}</td>
                    <td className="py-2 px-4">{arregloDeObjetos.length - 2}</td>
                    <td className="py-2 px-4">{PrecioTotal} $</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
};

export default Profile;
