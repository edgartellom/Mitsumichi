import { useContext, useEffect, useRef, useState } from "react";
import login from "../../assets/login.png";
import { userAuth } from "../../context/Auth-context";
import { PiCameraPlusFill } from "react-icons/pi";

import getInvoicesByUser from "../../firebase/getInvoicesByUser";
import setUserProfilePhoto from "../../firebase/setUserProfilePhoto";
import registerNewUser from "../../firebase/registerNewUser";
import getProfilePhoto from "../../firebase/getProfilePhoto";
import { Profile_Info, Profile_Orders, Profile_Reviews } from "./components";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("BasicInfo");
  const { user, photoURL, setPhotoURL } = useContext(userAuth);

  const fileRef = useRef(null);

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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="bg-slate-50 pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter">
      <div className="flex flex-col mx-[3%]">
        <div className="flex flex-row items-end mb-5">
          <section className="flex flex-col items-center relative">
            <button
              className="absolute bottom-0 right-8 text-[#404040] transition-all hover:scale-110"
              onClick={handleOpenFilePicker}
            >
              <PiCameraPlusFill size={40} />
              {/* <img src={""} width={35} alt="" /> */}
            </button>

            <input
              className=" hidden"
              ref={fileRef}
              type="file"
              onChange={handleOnChangeFile}
            />

            <picture className=" flex flex-col p-1.5 rounded-full bg-[#C63D05]">
              {
                <img
                  className=" bg-red-600 rounded-full"
                  src={photo}
                  width={250}
                  alt=""
                />
              }
            </picture>
          </section>

          <section className=" text-justify">
            <h3 className=" font-semibold text-4xl">{user?.data?.username}</h3>
            <h3 className=" font-semibold text-2xl text-[#C63D05]">
              {user?.role === "admin" ? "Administrador" : "Usuario"}
            </h3>
          </section>
        </div>

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
