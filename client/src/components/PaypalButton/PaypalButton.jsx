import React, { useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { userAuth } from "../../context/Auth-context";
import clearCart from "../../firebase/clearCart";
import createBill from "../../firebase/createBill";
import SignIn from "../../pages/SignIn/SignIn";
import Swal from 'sweetalert2';


function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error inesperado',
        text: 'Por favor, inténtelo de nuevo más tarde.',
      });
    }
  }, [error]);

  if (error) {
    return null; 
  }

  return children;
}


/* function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    // Muestro mensaje de error.
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p className="text-4xl font-bold">¡Ocurrió un error inesperado!</p>
        <p className="text-lg">Por favor, inténtelo de nuevo más tarde.</p>
      </div>
    );
  }

  return children;
} */


export function PayPalButton() {
  const clientId =
    "AYzyXv7DvxmViou_tGpOeAhwnjs-MOxkOH0j7USow4U0ibl0Uj4PzHi4n7YoVTU1mywyWa3CNIt_G5Lz";
  const { currentUser, products, user } = useContext(userAuth);
  const [purchaseId, setPurchaseId] = useState(null);
  const [orderId, setOrderId] = useState(null); // Estado para el ID de la compra
  const { precio, nombre, modelo } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId !== null) {
      Swal.fire({
        icon: 'error',
        title: 'Compra cancelada',
        text: `ID de compra: ${orderId}`,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsCompleted(false); // Continua con el proceso de pago de PayPal
          navigate("/home"); // Redirijo a "/home"
        }
      });
    }
  }, [navigate ,orderId]);
  
  

  const handlePaymentSuccess = (details) => {
    console.log("Pago realizado con éxito:", details);
    setPurchaseId(details.purchase_units[0].payments.captures[0].id);
    setIsCompleted(true);
  };


  //agrego código línea 57 ya que me arroja error código líena 58-59
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moto = [];
  moto.push(JSON.parse(window.localStorage.getItem("moto")));

  useEffect(() => {
    const date = new Date();
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${day}/${month}/${fullYear}`;

    if (isCompleted) {
      try {
        if (window.localStorage.getItem("moto") !== null) {
          createBill(currentUser?.uid, {
            ...moto,
            user,
            today,
            status: "success",
          });
          window.localStorage.removeItem("moto");
        } else {
          createBill(currentUser?.uid, {
            ...products,
            user,
            today,
            status: "success",
          });
          clearCart(currentUser?.uid);
        }
      } catch (error) {
        console.error("Error al crear la factura:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la factura',
          text: 'Hubo un error al crear la factura. Por favor, inténtelo de nuevo más tarde.',
        });
      }
    }
  }, [currentUser?.uid, isCompleted, moto, products, user]);

  const handleCancel = () => {
    const id = generateOrderId(); // Genera un ID único para la cancelación
    setOrderId(id);
  };

  const generateOrderId = () => {
    return Math.random().toString(36).substring(7); // Genera un ID único
  };

  if (!currentUser) {
    return <SignIn />;
  }

  return (
    <div className="flex justify-center items-center h-screen z-0">
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div className="w-full md:w-1/2">
          {isCompleted ? (
            <div className="text-center bg-green-200 border border-green-600 rounded p-4">
              <h2 className="text-2xl text-green-700 font-bold">
                ¡Compra exitosa!
              </h2>
              <p className="text-gray-700">
                La compra de su moto {nombre} {modelo} ha sido exitosa.
              </p>
              <p className="text-gray-700">ID de compra: {purchaseId}</p>
              <p className="text-gray-700">Gracias por elegirnos.</p>
              <div className="flex justify-center mt-4">
                <Button
                  text="¿Seguir comprando?"
                  className=" bg-orange-700 shadow-none text-gray-300 self-center"
                  onClick={() => navigate("/home")}
                />
              </div>
            </div>
          ) : (
            <div>
              <PayPalButtons
                createOrder={(_data, actions) => {
                  try {
                    return actions.order.create({
                      application_context: {},
                      purchase_units: [
                        {
                          reference_id: "Compra de prueba",
                          description: `Compra de ${nombre} ${modelo}`,
                          amount: {
                            value: precio,
                            item_total: {
                              value: precio,
                            },
                          },
                        },
                      ],
                    });
                  } catch (error) {
                    console.error("Error al crear la orden de PayPal:", error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al crear la orden de pago',
                      text: 'Hubo un error al crear la orden de pago. Por favor, inténtelo de nuevo más tarde.',
                    });
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order.capture();
                    handlePaymentSuccess(details, data);
                  } catch (error) {
                    console.error("Error al aprobar el pago de PayPal:", error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al procesar el pago',
                      text: 'Hubo un error al procesar el pago. Por favor, inténtelo de nuevo más tarde.',
                    });
                  }
                }}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;