import React, { useState, useContext } from "react";
import { userAuth } from "../../../context/Auth-context";

const Profile_Info = () => {
  const { user } = useContext(userAuth);
  return (
    <div className="border-t-2 border-[#c63d05] p-5">
      <div>
        <section className="flex flex-col">
          <input
            type="text"
            value={user?.data?.username}
            className={`border rounded px-3 py-2 my-2 w-[40%]`}
          />

          <input
            type="text"
            value={user?.email}
            className={`border rounded px-3 py-2 my-2 w-[40%]`}
          />
        </section>
      </div>
    </div>
  );
};

export default Profile_Info;
