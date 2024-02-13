/* import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const userImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTIwOC41IDIxIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0yMDguNSAyMSAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PGNpcmNsZSBjeD0iLTE1OC41IiBjeT0iNzEiIGZpbGw9IiNGNUVFRTUiIGlkPSJNYXNrIiByPSI1MCIvPjxnPjxkZWZzPjxjaXJjbGUgY3g9Ii0xNTguNSIgY3k9IjcxIiBpZD0iTWFza18yXyIgcj0iNTAiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzRfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18yXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIiBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyICAgICBjMC0xLjcsMC02LjMsMC02LjNoLTE1aC0xNWMwLDAsMCw0LjYsMCw2LjNjMCw4LjctNC41LDExLjMtNywxMmMtNi44LDEuOS0yOC4xLDcuMy0yOC4xLDYuN3YxNGg1MC4xSC0xMDguNXoiIGZpbGw9IiNFNkMxOUMiIGlkPSJNYXNrXzNfIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI01hc2tfNF8pIj48ZGVmcz48cGF0aCBkPSJNLTEwOC41LDEyMXYtMTRjMCwwLTIxLjItNC45LTI4LTYuN2MtMi41LTAuNy03LTMuMy03LTEyYzAtMS43LDAtNi4zLDAtNi4zaC0xNWgtMTVjMCwwLDAsNC42LDAsNi4zICAgICAgIGMwLDguNy00LjUsMTEuMy03LDEyYy02LjgsMS45LTI4LjEsNy4zLTI4LjEsNi43djE0aDUwLjFILTEwOC41eiIgaWQ9Ik1hc2tfMV8iLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJNYXNrXzVfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjTWFza18xXyIvPjwvY2xpcFBhdGg+PHBhdGggY2xpcC1wYXRoPSJ1cmwoI01hc2tfNV8pIiBkPSJNLTE1OC41LDEwMC4xYzEyLjcsMCwyMy0xOC42LDIzLTM0LjQgICAgICBjMC0xNi4yLTEwLjMtMjQuNy0yMy0yNC43cy0yMyw4LjUtMjMsMjQuN0MtMTgxLjUsODEuNS0xNzEuMiwxMDAuMS0xNTguNSwxMDAuMXoiIGZpbGw9IiNENEIwOEMiIGlkPSJoZWFkLXNoYWRvdyIvPjwvZz48L2c+PHBhdGggZD0iTS0xNTguNSw5NmMxMi43LDAsMjMtMTYuMywyMy0zMWMwLTE1LjEtMTAuMy0yMy0yMy0yM3MtMjMsNy45LTIzLDIzICAgIEMtMTgxLjUsNzkuNy0xNzEuMiw5Ni0xNTguNSw5NnoiIGZpbGw9IiNGMkNFQTUiIGlkPSJoZWFkIi8+PC9nPjwvc3ZnPg=='; // Constante para la imagen del usuario
  const chatbotImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiBkPSJNMzAyLjU0NSw2OS44MThjMC0yNS43MDctMjAuODQtNDYuNTQ1LTQ2LjU0NS00Ni41NDVzLTQ2LjU0NSwyMC44MzgtNDYuNTQ1LDQ2LjU0NQ0KCWMwLDE3LjIyNSw5LjM2NSwzMi4yNTQsMjMuMjczLDQwLjMwNHY4My44MThoNDYuNTQ1di04My44MThDMjkzLjE4MSwxMDIuMDczLDMwMi41NDUsODcuMDQzLDMwMi41NDUsNjkuODE4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzVBOEJCMDsiIGQ9Ik0yNTYsMjMuMjczdjE3MC42NjdoMjMuMjczdi04My44MThjMTMuOTA4LTguMDQ5LDIzLjI3My0yMy4wNzcsMjMuMjczLTQwLjMwNA0KCUMzMDIuNTQ1LDQ0LjExMSwyODEuNzA1LDIzLjI3MywyNTYsMjMuMjczeiIvPg0KPHJlY3QgeT0iMjQwLjQ4NSIgc3R5bGU9ImZpbGw6IzkzQzdFRjsiIHdpZHRoPSIyNDguMjQyIiBoZWlnaHQ9IjEyNC4xMjEiLz4NCjxyZWN0IHg9IjI2My43NTgiIHk9IjI0MC40ODUiIHN0eWxlPSJmaWxsOiM1QThCQjA7IiB3aWR0aD0iMjQ4LjI0MiIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSIxODYuMTgyIiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojOTNDN0VGOyIgd2lkdGg9IjEzOS42MzYiIGhlaWdodD0iMTI0LjEyMSIvPg0KPHJlY3QgeD0iMjU2IiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojNUE4QkIwOyIgd2lkdGg9IjY5LjgxOCIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSI0Ni41NDUiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiNDQ0U5Rjk7IiB3aWR0aD0iNDE4LjkwOSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cmVjdCB4PSIyNTYiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiB3aWR0aD0iMjA5LjQ1NSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0M1RDc2OyIgZD0iTTE5My45MzksMjcxLjUxNWMwLDE3LjEzOC0xMy44OTQsMzEuMDMtMzEuMDMsMzEuMDNsMCwwYy0xNy4xMzYsMC0zMS4wMy0xMy44OTItMzEuMDMtMzEuMDNsMCwwDQoJYzAtMTcuMTM4LDEzLjg5NC0zMS4wMywzMS4wMy0zMS4wM2wwLDBDMTgwLjA0NiwyNDAuNDg1LDE5My45MzksMjU0LjM3NywxOTMuOTM5LDI3MS41MTVMMTkzLjkzOSwyNzEuNTE1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMkUzQjsiIGQ9Ik0zODAuMTIxLDI3MS41MTVjMCwxNy4xMzgtMTMuODk0LDMxLjAzLTMxLjAzLDMxLjAzbDAsMGMtMTcuMTM3LDAtMzEuMDMtMTMuODkyLTMxLjAzLTMxLjAzbDAsMA0KCWMwLTE3LjEzOCwxMy44OTQtMzEuMDMsMzEuMDMtMzEuMDNsMCwwQzM2Ni4yMjcsMjQwLjQ4NSwzODAuMTIxLDI1NC4zNzcsMzgwLjEyMSwyNzEuNTE1TDM4MC4xMjEsMjcxLjUxNXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzVENzY7IiBkPSJNMTg2LjE4MiwzNDkuMDkxYzAsMzguNTU4LDMxLjI1OCw2OS44MTgsNjkuODE4LDY5LjgxOGwwLDBjMzguNTU4LDAsNjkuODE4LTMxLjI2LDY5LjgxOC02OS44MTgNCglIMTg2LjE4MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRTJFM0I7IiBkPSJNMjU2LDM0OS4wOTFjMCwzOC41NTgsMCw0Ni41NDUsMCw2OS44MThsMCwwYzM4LjU1OCwwLDY5LjgxOC0zMS4yNiw2OS44MTgtNjkuODE4SDI1NnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'; // Constante para la imagen del chatbot

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    // Agregar el mensaje del usuario al historial de mensajes con la imagen del usuario
    const userMessage = { text: inputText, user: true, image: userImage };
    
    // Lógica del chatbot para responder a diferentes preguntas
    const responses = {
      hola: '¡Hola! ¿En qué puedo ayudarte?',
      comprar: '¿Quieres realizar una compra? Puedes ir a la página de compras.',
      ayuda: 'Puedo ayudarte con información sobre nuestros productos o servicios.',
    };

    let respuestaChatbot = 'Lo siento, no entiendo. ¿Puedes reformular tu pregunta?';

    // Verificar si alguna palabra clave está presente en el mensaje del usuario
    for (const keyword in responses) {
      if (inputText.toLowerCase().includes(keyword)) {
        respuestaChatbot = responses[keyword];
        break;
      }
    }

    // Agregar la respuesta del chatbot al historial de mensajes con la imagen del chatbot
    const chatbotMessage = { text: respuestaChatbot, user: false, image: chatbotImage };
    
    // Actualizar el estado de los mensajes con los nuevos mensajes
    setMessages([...messages, userMessage, chatbotMessage]);
    
    // Limpiar el campo de entrada después de enviar el mensaje
    setInputText('');
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white w-72 rounded-lg shadow-lg overflow-hidden">
        <div className="h-80 overflow-y-auto px-4 py-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.user ? 'justify-end' : 'justify-start'
              } mb-2`}
            >
              <img
                src={message.user ? userImage : chatbotImage}
                alt={message.user ? 'User' : 'Chatbot'}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div
                className={`${
                  message.user
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } p-2 rounded-lg max-w-2/3`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-300">
          <div className="flex">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              value={inputText}
              onChange={handleInputChange}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
 */

// [import React, { useState } from 'react';

// const Chatbot = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//       setIsModalOpen(true);
//     };
  
//     const closeModal = () => {
//       setIsModalOpen(false);
//     };
  
//     const modalClasses = isModalOpen
//       ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 transition-opacity opacity-100'
//       : 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 transition-opacity opacity-0 pointer-events-none';
  
//     const modalContentClasses = isModalOpen
//       ? 'transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-96 transition-transform duration-300 ease-in-out'
//       : 'transform -translate-y-full bg-white rounded-lg shadow-lg p-8 w-96 transition-transform duration-300 ease-in-out';
  
//     return (
//       <div>
//         <button
//           onClick={openModal}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Abrir Modal
//         </button>
//         <div className={modalClasses}>
//           <div className={modalContentClasses}>
//             <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
//             {/* Aquí coloca el contenido del formulario de inicio de sesión */}
//             <button
//               onClick={closeModal}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default Chatbot;]

import { FaStar } from 'react-icons/fa';
import { useState } from 'react'

/* import {
    Ripple,
    initTE,
} from "tw-elements"; */

/* initTE({ Ripple }); */

const colors = {
    orange: "#e0a836",
    grey: "#a9a9a9"
}


export const Chatbot = () => {
    //Estado para el textarea
    const [descriptionReview, setDescriptionReview] = useState('')
    //Estado para la validación
    const [error, setError] = useState(null)

    const stars = Array(5).fill(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    //Funciones para el rating
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleDescription = (e) => {
        setDescriptionReview(e.target.value)

        if (descriptionReview.length < 3 || descriptionReview.length > 200) {
            setError('La descripcion debe tener entre 3 y 200 caracteres')
        } else {
            setError(null)
        }
    }

    const handleSubmit = (descriptionReview, currentValue) => {

        // if (error === null && (descriptionReview.length < 3)) {
        //     console.log('no se envio');

        // } else {
        //     console.log('se envio', descriptionReview);

        // }

        if (error === null) {
          console.log('no se envio');
        } else {
          console.log('se envio', descriptionReview);
        }
    }
    console.log(descriptionReview.length)

    return (
        <div className='flex flex-col justify-center items-center'>
            <p>Reseña del producto <hr />  </p>

            <div className='flex items-center'>
                {
                    stars.map((_, index) => {
                        return (
                            <FaStar
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                key={index}
                                size={24}
                                className='h-5 mr-5 cursor-pointer'
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                onClick={() => { handleClick(index + 1) }}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                            />

                        )
                    })
                }
            </div>
            <textarea
                onChange={handleDescription}
                placeholder='Reseña'
                className="h-32 px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" />
            {error ? <div className='text-red-500'> {error} </div> : null}

            <button
                onClick={handleSubmit}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Enviar</button>
        </div>
    )
}

export default Chatbot;
