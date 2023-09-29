import { useContext, useState, useEffect } from "react";
import updateUser from "../../../../firebase/updateUser";
import Pagination from "../../components/Pagination/Pagination";

import {
  MdOutlineDeleteForever,
  MdOutlineRestoreFromTrash,
} from "react-icons/md";

import { userAuth } from "../../../../context/Auth-context";
import { SearchBar_Dashboard } from "../../components";
import EditUser from "./EditUser";

const Users_Admin = () => {
  const { users, invoices } = useContext(userAuth);
  const [showItems, setShowItems] = useState([]);
  const invoicesToArr = Object.values(invoices);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredusers, setFilteredUsers] = useState([{}]);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState(null); // Para almacenar los datos de la factura seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar la visibilidad del modal

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  const totalPages = Math.ceil(filteredusers.length / itemsPerPage);

  // Calcular el índice de inicio y final para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredusers.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSearch = (searchQuery) => {
    const searchText = searchQuery.toLowerCase();
    const filteredusers = users.filter((user) => {
      const userId = user.id ? user.id.toString().toLowerCase() : "";
      return (
        userId.includes(searchText) ||
        (user?.data?.username &&
          user?.data?.name.toLowerCase().includes(searchText)) ||
        (user?.role && user?.role.toLowerCase().includes(searchText))
      );
    });

    // Establece filteredusers en todas las users si la búsqueda está vacía
    setFilteredUsers(searchQuery === "" ? users : filteredusers);
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedUserToEdit(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserToEdit(null);
    setIsModalOpen(false);
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
          {currentUsers.length === 0 ? null : (
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
          )}
        </thead>
        {currentUsers.length === 0 ? (
          <h1 className="p-4 uppercase text-center text-red-600 font-semibold">
            No hay Usuarios con esta Descripción
          </h1>
        ) : (
          <tbody
            className={`bg-white duration-300 ${
              screenWidth >= 1220 ? "" : "duration-300 text-[14px]"
            }`}
          >
            {currentUsers.map((user, index) => {
              const displayedIndex =
                (currentPage - 1) * itemsPerPage + index + 1;

              const userId = users[index]?.id; // ID del usuario actual
              const userInvoices = invoices[userId]; // Facturas del usuario actual

              let precioTOTAL = 0;

              if (userInvoices && userInvoices.length > 0) {
                precioTOTAL = userInvoices
                  .map((item) =>
                    item?.precio && item?.cantidad
                      ? item?.precio * item?.cantidad
                      : 0
                  )
                  .reduce((a, b) => a + b, 0);
              }

              return (
                <tr
                  className={`hover:text-blue-400 h-[75px] ${
                    showItems.includes(index)
                      ? "duration-200 opacity-100 translate-y-0"
                      : "duration-200 opacity-0 translate-y-10"
                  }`}
                  key={displayedIndex}
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
                  </td>
                  <td className="text-center w-1/7 font-bold ml-1">
                    {displayedIndex}
                  </td>
                  <td
                    onClick={() => handleInvoiceClick(user)}
                    className="text-center w-1/7 font-bold uppercase hover:text-[#C63D05] cursor-pointer"
                  >
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
        )}
      </table>
      <div className="flex flex-row justify-between">
        <section className="flex w-[30%]">
          <SearchBar_Dashboard handleSearch={handleSearch} />
        </section>
        <section className=" w-[70%]">
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </section>
      </div>
      {isModalOpen && (
        <EditUser userData={selectedUserToEdit} onClose={closeModal} />
      )}
    </div>
  );
};

export default Users_Admin;
