import React, { useState, useEffect, useContext } from "react";
import Rating666 from "../../../components/Rating666/Rating666";
import getInvoicesByUser from "../../../firebase/getInvoicesByUser";
import { userAuth } from "../../../context/Auth-context";

const Profile_Reviews = () => {
  const { user } = useContext(userAuth);
  const [showReview, setShowReview] = useState(false);
  const [shopping, setShopping] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoicesByUser = await getInvoicesByUser(user?.id);
        if (invoicesByUser) {
          const invoicesToArray = invoicesByUser.map((e) => Object.values(e))
          const invoicesFiltered = invoicesToArray.map((e) => e.filter(item => item.hasOwnProperty('brand')))
          .flat()
          const uniqueObjetos = {};
          const invoicesSinDuplicados = invoicesFiltered.filter((obj) => {
            // Genera una clave única para cada objeto basada en sus propiedades
            const clave = obj.brand + obj.motoModel + obj.tipo;
            
            // Si la clave no existe en el objeto auxiliar, marca el objeto como único
            if (!uniqueObjetos[clave]) {
                uniqueObjetos[clave] = true;
                return true;
            }
            
            return false; // Si la clave ya existe, el objeto es duplicado
        });
          setShopping(invoicesSinDuplicados);
        } else {
          setShopping([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleOpenReviewModal = (brand, motoModel) => {
    setSelectedItem({ brand, motoModel });
    setShowReview(true);
  };

  const handleCloseReviewModal = () => {
    setShowReview(false);
  };

  return (
    <div className="flex flex-col">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold p-4">Reviews de Tus Compras</h2>
          <table className="w-full table-auto rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-gray-300 to-gray-500">
              <tr>
                <th className="py-2 px-4">Marca</th>
                <th className="py-2 px-4">Modelo</th>
                <th className="py-2 px-4">Precio</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {shopping.map((e, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 font-bold">{e.brand}</td>
                  <td className="py-2">{e.motoModel}</td>
                  <td className="py-2 px-4">${e.precio}</td>
                  <td className="py-2">
                    <button
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold border-black border-2 p-1 rounded-md"
                      type="button"
                      onClick={() => handleOpenReviewModal(e.brand, e.motoModel)}
                    >
                      Agregar Reseña
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showReview && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <Rating666
                  setShowReview={handleCloseReviewModal}
                  selectedItem={selectedItem}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile_Reviews;
