import React, { useState, useContext, useRef } from "react";
import { userAuth } from "../../../context/Auth-context";

import setUserProfilePhoto from "../../../firebase/setUserProfilePhoto";
import registerNewUser from "../../../firebase/registerNewUser";
import getProfilePhoto from "../../../firebase/getProfilePhoto";

import login from "../../../assets/login.png";
import camera from "../../../assets/camera.png";

const Profile_Info = () => {
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

  return (
    <div>
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
    </div>
  );
};

export default Profile_Info;
