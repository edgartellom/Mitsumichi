import React from "react";
import Wrapper from "../../../../helper/Wrapper";

const EditUser = ({ userData, onClose }) => {
  console.log(userData);
  return (
    <Wrapper>
      {/* Mostrar los datos del usuario */}
      <div>Nombre de usuario: {userData?.data?.name}</div>
      <div>Email: {userData?.email}</div>
      {/* Resto de los datos del usuario */}
    </Wrapper>
  );
};

export default EditUser;
