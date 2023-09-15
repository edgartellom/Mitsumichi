import { useContext, useEffect, useRef, useState } from "react";
import login from "../../assets/login.png";
import { userAuth } from "../../context/Auth-context";
import getInvoicesByUser from "../../firebase/getInvoicesByUser";
import camera from "../../assets/camera.png";
import setUserProfilePhoto from "../../firebase/setUserProfilePhoto";
import registerNewUser from "../../firebase/registerNewUser";
import getProfilePhoto from "../../firebase/getProfilePhoto";

const Profile = () => {
  const { user, photoURL, setPhotoURL } = useContext(userAuth);
  const [invoices, setInvoices] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    (async () => {
      const invoices = await getInvoicesByUser(user?.id);
      setInvoices(invoices);
    })();
  }, [user]);

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleOnChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(user.id, imageData);
        if (res) {
          console.log(res, "res");
          const tempUser = { ...user };
          tempUser.photoURL = res.metadata.fullPath;
          await registerNewUser(tempUser);
          const photo = await getProfilePhoto(user?.photoURL);
          setPhotoURL(photo);
        }
      };
    }
  };

  const photo = photoURL.length > 0 ? photoURL : login;

  return (
    <section>
      <div className=" text-center font-extrabold text-4xl pb-5">
        <h1>Profile</h1>
      </div>
      <section className=" grid grid-cols-1 ">
        <section className="flex flex-col items-center ">
          <button
            className="relative top-5 right-20"
            onClick={handleOpenFilePicker}
          >
            <img src={camera} width={30} alt="" />
          </button>
          <input
            className=" hidden"
            ref={fileRef}
            type="file"
            onChange={handleOnChangeFile}
          />

          <picture className=" flex flex-col p-2 rounded-full bg-red-50">
            {
              <img
                className=" bg-red-600 rounded-full"
                src={photo}
                width={200}
                alt=""
              />
            }
          </picture>
          <section className=" text-center">
            <h3 className=" font-semibold text-2xl">{user?.data?.username}</h3>
            <h3 className=" font-semibold text-2xl">{user?.role}</h3>
          </section>
        </section>
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
                    .map((item) => item?.precio)
                    .map(Number)
                    .filter((item) => !isNaN(item))
                    .reduce((a, b) => a + b, 0);

                  return (
                    <tr
                      key={invoice.id}
                      className="bg-white hover:bg-gray-200 text-center"
                    >
                      <td className="py-2 px-4">{invoice.id}</td>
                      <td className="py-2 px-4">
                        {arregloDeObjetos.length - 2}
                      </td>
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
      </section>
    </section>
  );
};

export default Profile;
