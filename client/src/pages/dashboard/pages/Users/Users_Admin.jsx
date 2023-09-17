import { useContext, useState, useEffect } from "react";
import { userAuth } from "../../../../context/Auth-context";
const Users_Admin = () => {
  const { users, invoices } = useContext(userAuth);
  const [showItems, setShowItems] = useState([]);

  const invoicesToArr = Object.values(invoices);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    setSelectedRows(selectAll ? [] : users.map((_, index) => index));
  };

  const handleSelectRow = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
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

  return (
    <div className="min-h-full bg-white pl-4 pr-1 py-4 justify-center overflow-y-scroll scrollbar-gutter">
      <table
        className={`w-full rounded-md shadow-sm shadow-[#252525] overflow-hidden`}
      >
        <thead
          className={`h-[40px] bg-[#C63D05] text-white ${
            screenWidth >= 1220 ? "text-2xl" : "text-lg"
          }`}
        >
          <tr>
            <th className="w-1/7 text-center pt-1">
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
          {users.map((user, index) => {
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
                <td className="text-center w-1/7">
                  <label className="flex container items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                    <div className="checkmarklist"></div>
                  </label>
                  {/* <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
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
                <td className="text-center w-1/7 text-green-600 font-bold uppercase">
                  ACTIVE
                </td>

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
      </table>
    </div>
  );
};

export default Users_Admin;
