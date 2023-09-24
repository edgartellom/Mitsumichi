import { useContext, useState, useEffect } from "react";
import updateUser from "../../../../firebase/updateUser";
import Pagination from '../../components/Pagination/Pagination'

import {
  MdOutlineDeleteForever,
  MdOutlineRestoreFromTrash,
} from "react-icons/md";

import { userAuth } from "../../../../context/Auth-context";
const Users_Admin = () => {
  const { users, invoices } = useContext(userAuth);
  const [showItems, setShowItems] = useState([]);

  const invoicesToArr = Object.values(invoices);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    selectAll ? setSelectedUsers([]) : setSelectedUsers([...users]);
  };

  const handleSelectUser = (index) => {
    const newSelectedUser = [...selectedUsers];

    if (newSelectedUser.some((user) => user.id === users[index].id)) {
      // Si el usuario ya está seleccionado, lo eliminamos de la lista
      newSelectedUser.splice(
        newSelectedUser.findIndex((user) => user.id === users[index].id),
        1
      );
    } else {
      // Si el usuario no está seleccionado, lo agregamos a la lista
      newSelectedUser.push(users[index]);
    }

    setSelectedUsers(newSelectedUser);
  };

  useEffect(() => {
    // Retardar la aparición de elementos para crear la animación de cascada
    if (users.length > 0) {
      const animationDelay = 30; // Ajusta la velocidad de la animación
      users.forEach((_, index) => {
        setTimeout(() => {
          setShowItems((prevShowItems) => [...prevShowItems, index]);
        }, animationDelay * index);
      });
    }
  }, [users]);

  console.log(selectedUsers, "users");

  const changeUserStatus = async () => {
    try {
      // Crear un array de promesas para las actualizaciones de usuarios
      const updatePromises = selectedUsers.map(async (user) => {
        const updatedUser = {
          ...user,
          status: user.status === "active" ? "banned" : "active",
        };
        await updateUser(updatedUser);
      });

      // Esperar a que todas las actualizaciones se completen
      await Promise.all(updatePromises);

      // Una vez que todas las actualizaciones se han completado con éxito, recargar la página
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar usuarios:", error);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calcular el índice de inicio y final para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="min-h-full pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter relative">
      {selectedUsers.length > 0 && (
        <button
          className="absolute duration-200 top-4 right-2 bg-[#303030] font-bold rounded-lg shadow-sm hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#252525] cursor-pointer"
          onClick={changeUserStatus}
        >
          <div
            className={`flex flex-row py-2 pr-2 items-center justify-between h-8 text-white ${
              selectedUsers.some((user) => user.status === "banned")
                ? "hover:text-green-500"
                : "hover:text-red-600"
            } `}
          >
            {selectedUsers.some((user) => user.status === "banned") ? (
              <>
                <MdOutlineRestoreFromTrash size={30} />
                <span className="">RESTORE</span>
              </>
            ) : (
              <>
                <MdOutlineDeleteForever size={30} />
                <span className="">REMOVE</span>
              </>
            )}
          </div>
        </button>
      )}
      <h1 className="pb-2 -pt-2 text-2xl font-bold text-[#c63d05] uppercase">
        Lista de Ordenes
      </h1>
      <table
        className={`w-full rounded-md shadow-sm shadow-[#252525] overflow-hidden`}
      >
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr>
            <th
              className={`w-1/8 text-center pt-1 ${
                screenWidth <= 768 ? "pl-2" : "pl-1"
              }`}
            >
              <label className="flex container items-center justify-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectAll}
                />
                <div className="checkmark"></div>
              </label>
              {/* <input
                type="checkbox"
                onChange={handleSelectAll}
                className="w-6 h-6 "
              /> */}
            </th>
            <th className="text-center w-1/7 font-bold ml-1 text-with-text-shadow">
              ID
            </th>
            <th className="text-center w-1/7 font-bold text-with-text-shadow">
              USUARIO
            </th>
            <th className="text-center w-1/7 font-bold text-with-text-shadow">
              ROL
            </th>
            <th className="text-center w-1/7 font-bold text-with-text-shadow">
              ORDENES
            </th>
            <th className="text-center w-1/7 font-bold text-with-text-shadow">
              ESTATUS
            </th>
            <th className="text-center w-1/7 font-bold text-with-text-shadow">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody
          className={`bg-white duration-300 ${
            screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
          }`}
        >
          {currentUsers.map((user, index) => {
            const id = index + 1;

            const precioTOTAL = invoicesToArr[index]
              ?.map((item) => item[0]?.precio)
              .map(Number)
              .filter((item) => !isNaN(item))
              .reduce((a, b) => a + b, 0);

            console.log(precioTOTAL, "precioTOTAL");

            return (
              <tr
                className={`hover:text-blue-400 h-[75px] ${
                  showItems.includes(index)
                    ? "duration-200 opacity-100 translate-y-0"
                    : "duration-200 opacity-0 translate-y-10"
                }`}
                key={id}
              >
                <td
                  className={`text-center w-1/7 ${
                    screenWidth <= 768 ? "pl-2" : "pl-1"
                  }`}
                >
                  <label className="flex container items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(users[index])}
                      onChange={() => handleSelectUser(index)}
                    />
                    <div className="checkmarklist"></div>
                  </label>
                  {/* <input
                    type="checkbox"
                    checked={selectedUser.includes(index)}
                    onChange={() => handleSelectRow(index)}
                    className="w-6 h-6 "
                  /> */}
                </td>
                <td className="text-center w-1/7 font-bold ml-1">{id}</td>
                <td className="text-center w-1/7 font-bold uppercase hover:text-[#C63D05] cursor-pointer">
                  {user?.data?.name}
                </td>
                {user?.role === "admin" ? (
                  <td className="text-center w-1/7 font-bold uppercase">
                    Administrador
                  </td>
                ) : (
                  <td className="text-center w-1/7 font-bold uppercase">
                    Usuario
                  </td>
                )}

                <td className="text-center w-1/7 font-bold">
                  {invoicesToArr[index]?.length}
                </td>
                {user?.status === "active" ? (
                  <td className="text-center w-1/7 text-green-600 font-bold uppercase">
                    activo
                  </td>
                ) : (
                  <td className="text-center w-1/7 text-red-600 font-bold uppercase">
                    baneado
                  </td>
                )}

                <td className="text-center w-1/7 font-bold text-blue-600 mr-1">
                  {parseFloat(precioTOTAL).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
        <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      </table>
    </div>
  );
};

export default Users_Admin;
