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
  }, []);

  console.log(invoices);

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
              {currentUser.displayName}
            </h3>
            {/* <h3 className=" font-semibold text-2xl">Email: ssdsd</h3> */}
          </section>
        </section>
        <section className="p-10">
          <h1 className="font-bold text-center text-3xl pb-5">Compras</h1>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-blue-500 text-white">
                <th class="py-2 px-4">Id</th>
                <th class="py-2 px-4">Cantidad</th>
                <th class="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-gray-100 text-center">
                <td class="py-2 px-4">1</td>
                <td class="py-2 px-4">2</td>
                <td class="py-2 px-4">3</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
};

export default Profile;
