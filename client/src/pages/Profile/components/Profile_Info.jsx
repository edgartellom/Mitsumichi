import React, { useState, useContext } from "react";
import { userAuth } from "../../../context/Auth-context";

const Profile_Info = () => {
  const { user } = useContext(userAuth);
  return <div className="border-t-2 border-[#c63d05]"></div>;
};

export default Profile_Info;
