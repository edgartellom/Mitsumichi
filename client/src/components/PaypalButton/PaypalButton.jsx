import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from 'react-router-dom';
import Button from "../../components/UI/Button";


export function PayPalButton() {
  const clientId = "AYzyXv7DvxmViou_tGpOeAhwnjs-MOxkOH0j7USow4U0ibl0Uj4PzHi4n7YoVTU1mywyWa3CNIt_G5Lz";

  const [purchaseId, setPurchaseId] = useState(null);
  const { precio, nombre } = useParams();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSuccess = (details) => {
    console.log("Pago realizado con éxito:", details);
    setPurchaseId(details.purchase_units[0].payments.captures[0].id);
    setIsCompleted(true);
  };

  const handleCancel = () => {
    setIsCancelled(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <PayPalScriptProvider options={{ "client-id": clientId }}>
      <div className="w-full md:w-1/2">
          {isCancelled ? (
            <div className="text-center">
              <h2  className="text-2xl font-bold" >Compra cancelada.</h2>
              <p>Has cancelado la compra de {nombre}.</p>
              <button 
          onClick={() => navigate("/home")}
          className="bg-[#161616] font-bold p-3 text-white hover:bg-[#161616] hover:bg-orange-700 hover:text-black" 
          >
          Home
        </button>
            </div>
          ) : isCompleted ? (
            <div className="text-center bg-green-200 border border-green-600 rounded p-4">
              <h2 className="text-2xl text-green-700 font-bold">¡Seña completada!</h2>
                <p className="text-gray-700">Tu seña de {nombre} ha sido exitosa.</p>
                <p className="text-gray-700">ID de seña: {purchaseId}</p>
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
                  return actions.order.create({
                    application_context: {},
                    purchase_units: [
                      {
                        reference_id: "Compra de prueba",
                        description: `Compra de ${nombre}`,
                        amount: {
                          value: precio,
                          item_total: {
                            value: precio,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  handlePaymentSuccess(details, data);
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