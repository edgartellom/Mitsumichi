import logo from '../../assets/footer_img/Logo_Mitsumichi.png';
import face from '../../assets/footer_img/face.gif';
import insta from '../../assets/footer_img/insta.gif';
import mail from '../../assets/footer_img/mail.gif';

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          backgroundColor: '#1a202c',
          borderTop: '3px solid #f6e05e',
          color: 'white',
        }}
        className="widgets_wrapper"
      >
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Columna 1 */}
          <div className="column one-fourth">
            <aside className="widget_text widget widget_custom_html">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <img
                  src={logo}
                  width="350px"
                  height="350px"
                  alt="Nuestro logo"
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </aside>
          </div>

          {/* Columna 2 */}
          <div className="column one-fourth">
            <aside className="widget widget_block">
              <h5>Enlaces de interés</h5>
              <br />
              <ul>
                <li>
                  <a href="/about" target="_blank">
                    Empresa
                  </a>
                </li>
                <li>
                  <a>Preguntas frecuentes</a>
                </li>
                <li>
                  <a href="mailto:busquedas@elixircars.com" target="_blank" rel="noreferrer">
                    ¿Quieres trabajar con nosotros?
                  </a>
                </li>
                <li>
                  <a>Formulario</a>
                </li>
              </ul>
            </aside>
          </div>

          {/* Columna 3 */}
          <div className="column one-fourth">
            <aside className="widget_text widget widget_custom_html">
              <div className="textwidget custom-html-widget">
                <h5>Enlaces de interés</h5>
                <br />
                <ul>
                  <li>
                    <a>Términos y Condiciones</a>
                  </li>
                  <li>
                    <a>Política de privacidad</a>
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
              <div className="textwidget custom-html-widget">
                <a
                  href="http://qr.afip.gob.ar/?qr=TXIfi4ZgHPHLJcmO2azGzA,,"
                  target="_F9GOAFIPINfo"
                  rel="noopener"
                >
                  <img
                    src="https://www.carone.com.ar/wp-content/uploads/2023/05/DATAWEB.jpeg"
                    width={100}
                    height={100}
                    alt="Nuestro logo"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div
        className="Redes_sociales"
        style={{
          backgroundColor: '#1a202c',
          borderTop: '1px solid #f6e05e',
          borderBottom: '1px solid #f6e05e',
        }}
      >
        <div
          className="widget_text widget widget_custom_html flex justify-center"
          style={{
            backgroundColor: '#2d3748',
            color: 'white',
            borderTop: '1px solid #f6e05e',
            borderBottom: '1px solid #f6e05e',
            padding: '10px',
          }}
        >
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
        <div
          className="text-center"
          style={{
            backgroundColor: '#1a202c',
            color: 'white',
            padding: '10px',
          }}
        >
          © 2023 MITSUMISHI MOTOS S.A. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
