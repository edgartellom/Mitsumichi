import { useContext, useEffect, useRef, useState } from "react";
import login from "../../assets/login.png";
import { userAuth } from "../../context/Auth-context";
import getInvoicesByUser from "../../firebase/getInvoicesByUser";
import camera from "../../assets/camera.png";
import setUserProfilePhoto from "../../firebase/setUserProfilePhoto";
import registerNewUser from "../../firebase/registerNewUser";
import getProfilePhoto from "../../firebase/getProfilePhoto";
import { Profile_Info, Profile_Orders, Profile_Reviews } from "./components";

const Profile = () => {
  const { user } = useContext(userAuth);
  // const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState("BasicInfo");

  // const fileRef = useRef(null);

  // useEffect(() => {
  //   (async () => {
  //     const invoices = await getInvoicesByUser(user?.id);
  //     setInvoices(invoices);
  //   })();
  // }, [user]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // const handleOpenFilePicker = () => {
  //   if (fileRef.current) {
  //     fileRef.current.click();
  //   }
  // };

  // const handleOnChangeFile = (e) => {
  //   const files = e.target.files;
  //   const fileReader = new FileReader();
  //   if (fileReader && files && files.length > 0) {
  //     fileReader.readAsArrayBuffer(files[0]);
  //     fileReader.onload = async () => {
  //       const imageData = fileReader.result;
  //       const res = await setUserProfilePhoto(user.id, imageData);
  //       if (res) {
  //         console.log(res, "res");
  //         const tempUser = { ...user };
  //         tempUser.photoURL = res.metadata.fullPath;
  //         await registerNewUser(tempUser);
  //         const photo = await getProfilePhoto(user?.photoURL);
  //         setPhotoURL(photo);
  //       }
  //     };
  //   }
  // };

  // const photo = photoURL.length > 0 ? photoURL : login;

  return (
    <div className="h-screen">
      <div className="flex flex-col">
        <div
          className={`w-[full] min-h-full max-h-full border-b border-gray-200 rounded-md -mb-2 z-0 overflow-hidden`}
        >
          <nav className="-mb-px flex gap-0">
            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "BasicInfo"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("BasicInfo")}
            >
              Información Básica
            </a>

            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "Orders"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("Orders")}
            >
              Ordenes
            </a>

            <a
              href="#"
              className={`duration-200 linear shrink-0 border rounded-t-lg border-b-transparent p-2 text-sm font-medium ${
                activeTab === "Reviews"
                  ? "text-[#C63D05] border-[#C63D05] bg-[#f8baa150]"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabChange("Reviews")}
            >
              Valoraciones
            </a>
          </nav>
        </div>

        <form className="gap-2 min-w-full h-full bg-white z-10 ">
          {activeTab === "BasicInfo" && <Profile_Info />}
          {activeTab === "Orders" && <Profile_Orders />}
          {activeTab === "Reviews" && <Profile_Reviews />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
