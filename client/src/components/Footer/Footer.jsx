import logo from '../../assets/footer_img/Logo_Mitsumichi_Cat.png';
import face from '../../assets/footer_img/face.gif';
import insta from '../../assets/footer_img/insta.gif';
import mail from '../../assets/footer_img/mail.gif';

const Footer = () => {
  return (
    <footer>
      <div className="widgets_wrapper bg-gradient-to-bl from-gray-100 via-gray-50 to-yellow-200">  {/* Div ppal */}
        <div className="container mx-auto py-4 grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {/* Columna 1 */}
          <div className="column one-fourth">
            <aside className="widget_text widget widget_custom_html">
              <div className="flex justify-center items-center py-10 ">
                <img
                  src={logo}
                  width="100%"
                  alt="Nuestro logo"
                  
                />
              </div>
            </aside>
          </div>

          {/* Columna 2 */}
          <div className="column one-fourth py-10">
            <aside className="widget_text widget widget_custom_html flex justify-center items-center h-full ">
              <div className="textwidget custom-html-widget">
                <h5>Enlaces de interés</h5>
                <br />
                <ul>
                  <li>
                  <a href="/about" target="_blank">
                    Empresa
                  </a>
                  </li>
                  <li>
                    <a>Preguntas frecuentes </a>
                  </li>
                  <li>
                  <a href="mailto:busquedas@elixircars.com" target="_blank" rel="noreferrer">
                    ¿Quieres trabajar con nosotros?
                  </a>
                  </li>
                  <li>
                    <a >
                      Formularios
                    </a>
                  </li>
                  <li>
                    <a>
                      Facturas                    
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
          
          {/* Columna 3 */}
          <div className="column one-fourth py-10">
            <aside className="widget_text widget widget_custom_html flex justify-center items-center h-full ">
              <div className="textwidget custom-html-widget">
                <h5>Enlaces de interés</h5>
                <br />
                <ul>
                  <li>
                    <a>Términos y Condiciones</a>
                  </li>
                  <li>
                    <a>Política de privacidad </a>
                  </li>
                  <li>
                    <a>Cookies</a>
                  </li>
                  <li>
                    <a href="https://outlook.office.com/mail/" target="_blank" rel="noreferrer">
                      Acceso empleados
                    </a>
                  </li>
                  <li>
                    <a>Atención a publicaciones fraudulentas</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Columna 4 */}
          <div className="widget_text widget widget_custom_html flex justify-center">
            <aside className="widget_text widget widget_custom_html">
              <div className="textwidget custom-html-widget py-10">
                <a
                  href="http://qr.afip.gob.ar/?qr=TXIfi4ZgHPHLJcmO2azGzA,,"
                  target="_F9GOAFIPINfo"
                  rel="noopener"
                >
                  <img
                    src="https://www.carone.com.ar/wp-content/uploads/2023/05/DATAWEB.jpeg"
                    width={115}
                    height={115}
                    alt="Nuestro logo"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="Redes_sociales">
        <div className="widget_text widget widget_custom_html flex justify-center  from-gray-100 via-gray-50 to-yellow-200">
          <div className="column one">
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="https://es-la.facebook.com/" target="_blank" rel="noreferrer">
                  <img
                    src={face}
                    className="w-8 h-8 rounded-lg"
                    alt="facebook_icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  <img
                    src={insta}
                    className="w-8 h-8 rounded-lg"
                    alt="insta_icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://gmail.com" target="_blank" rel="noreferrer">
                  <img
                    src={mail}
                    className="w-8 h-8 rounded-lg"
                    alt="mail_icon"
                  />
                </a>
              </li>
            </ul>
            <br />
          </div>
        </div>
        <div className="text-center bg-gradient-to-bl  from-gray-100 via-gray-50 to-yellow-200">
          © 2023 MITSUMISHI MOTOS S.A. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;