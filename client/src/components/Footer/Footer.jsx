import React, { useState } from "react";
import logo from "../../assets/Logo_Mitsumichi_Cat_White.png";
import face from "../../assets/footer_img/face.gif";
import insta from "../../assets/footer_img/insta.gif";
import mail from "../../assets/footer_img/mail.gif";

const Footer = () => {
  const [showConstructionMessage, setShowConstructionMessage] = useState(false); //  le paso (false) así al principio no se mostrará ningún mensaje de construcción.

  const handleEnlaceClick = () => {
    setShowConstructionMessage(true)
  }

  return (
    <footer className="bg-black text-white  flex flex-col">
      <section>
        <div className=" flex flex-wrap justify-around items-center">
          <aside>
            <picture className="flex justify-center mb-5 items-center pt-10">
              <img src={logo} width={170} alt="logo" />
            </picture>
          </aside>
          <table className="  flex flex-col gap- justify-center max-sm:pl-10">
            <thead className=" text-orange-700">
              <th className=" text-xl">Enlaces de interés</th>
            </thead>
            <tbody className=" flex  gap-20 max-sm:gap-2">
              <td>
                <tr>
                  <a href="/about" target="_blank">
                    Empresa
                  </a>
                </tr>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("PreguntasFrecuentes")}>
                    Preguntas frecuentes
                  </a>
                </tr>

                <tr>
                  <a
                    href="mailto:mitsumichipf@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ¿Quieres trabajar con nosotros?
                  </a>
                </tr>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("Formularios")} >
                    Formularios
                  </a>
                </tr>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("Facturas")} >
                    Facturas
                  </a>
                </tr>
              </td>
              <td>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("Política de privacidad")}>
                    Política de privacidad
                  </a>
                </tr>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("Cookies")}>
                    Cookies
                  </a>
                </tr>
                <tr>
                  <a
                    href="https://outlook.office.com/mail/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Acceso empleados
                  </a>
                </tr>
                <tr>
                  <a href="#" onClick={() => handleEnlaceClick("Atención a publicaciones fraudulentas")}> 
                    Atención a publicaciones fraudulentas
                  </a>
                </tr>
              </td>
            </tbody>
          </table>
          <section className=" flex justify-center max-sm:hidden max-lg:hidden max-md:hidden">
            <aside>
              <a
                href="http://qr.afip.gob.ar/?qr=TXIfi4ZgHPHLJcmO2azGzA,,"
                target="_F9GOAFIPINfo"
                rel="noopener"
              >
                <img
                  className=" rounded-xl filter grayscale"
                  src="https://www.carone.com.ar/wp-content/uploads/2023/05/DATAWEB.jpeg"
                  width={115}
                  height={115}
                  alt="Nuestro logo"
                />
              </a>
            </aside>
          </section>
        </div>
      </section>
      <section>
        <article className=" flex justify-center max-sm:hidden ">
          <div>
            <ul className="mt-4 flex space-x-4 mb-4">
              <li>
                <a
                  href="https://es-la.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={face}
                    className="w-8 h-8 rounded-lg"
                    alt="facebook_icon"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={insta}
                    className="w-8 h-8 rounded-lg"
                    alt="insta_icon"
                  />
                </a>
              </li>
              <li>
                <a href="mailto:mitsumichipf@gmail.com" target="_blank" rel="noreferrer">
                  <img
                    src={mail}
                    className="w-8 h-8 rounded-lg"
                    alt="mail_icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        </article>
        <summary className="text-center pb-5 max-sm:mt-5">
          <p>© 2023 MITSUMISHI S.A.</p>
          <p className="  text-orange-700">Todos los derechos reservados.</p>
        </summary>
      </section>
      {showConstructionMessage && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-black p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Enlace en construcción</h1>
            <p>Estamos trabajando en ello ¡Vuelve pronto!</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowConstructionMessage(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

