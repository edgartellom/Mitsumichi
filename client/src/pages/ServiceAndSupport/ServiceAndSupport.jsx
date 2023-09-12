import React from "react";
import "./ServiceAndSupport.css";

function ServicioYSoporte() {
  return (
    <div className="servicio-y-soporte">
      <h1 className="titulo">Servicio y Soporte</h1>
      <p className="descripcion">
        Bienvenido a nuestra página de servicio y soporte. En Mitsumichi
        Motorcycles, estamos comprometidos a brindarte la mejor experiencia
        posible en la compra y mantenimiento de tu moto. Nuestro equipo de
        profesionales altamente capacitados está listo para ayudarte con
        cualquier pregunta, inquietud o problema que puedas tener. Estamos aquí
        para asegurarnos de que disfrutes de tu moto al máximo.
      </p>

      <h2 className="subtitulo">Nuestros Servicios</h2>
      <ul className="lista-servicios">
        <li>
          <h3>Atención al Cliente</h3>
          <p>
            Nuestro equipo de atención al cliente está disponible para responder
            a todas tus preguntas relacionadas con la compra de motos, opciones
            de financiamiento, accesorios y más. Puedes comunicarte con nosotros
            a través de teléfono, correo electrónico o chat en vivo durante
            nuestro horario de atención.
          </p>
        </li>
        <li>
          <h3>Mantenimiento y Reparaciones</h3>
          <p>
            Sabemos lo importante que es mantener tu moto en óptimas
            condiciones. Ofrecemos servicios de mantenimiento y reparaciones
            realizados por técnicos altamente capacitados. Ya sea que necesites
            un cambio de aceite, una reparación de motor o una inspección
            general, estamos aquí para ayudarte a mantener tu moto en perfecto
            estado.
          </p>
        </li>
        <li>
          <h3>Piezas y Accesorios</h3>
          <p>
            ¿Necesitas piezas de repuesto o accesorios para personalizar tu
            moto? Contamos con un amplio inventario de piezas originales y
            accesorios de alta calidad para que puedas personalizar y mejorar tu
            moto según tus preferencias.
          </p>
        </li>
        <li>
          <h3>Preguntas Frecuentes (FAQ)</h3>
          <p>
            Consulta nuestra sección de Preguntas Frecuentes para obtener
            respuestas rápidas a las preguntas más comunes. Si no encuentras lo
            que buscas, no dudes en ponerte en contacto con nuestro equipo de
            soporte.
          </p>
        </li>
      </ul>

      <h2 className="subtitulo">Contacto</h2>
      <p className="descripcion">
        Si necesitas ayuda o tienes alguna pregunta, no dudes en ponerte en
        contacto con nosotros. Estamos aquí para ayudarte en cada paso del
        camino.
      </p>
      <div className="formulario-contacto">
        <form>
          <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="campo">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required />
          </div>
          <div className="campo ancho-completo">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input type="email" id="correo" name="correo" required />
          </div>
          <div className="campo ancho-completo">
            <label htmlFor="asunto">Asunto:</label>
            <input type="text" id="asunto" name="asunto" required />
          </div>
          <div className="campo">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
          </div>
          <div className="centrar">
            <button type="submit" className="boton-enviar">
              Enviar
            </button>
          </div>
        </form>
      </div>

      <h2 className="subtitulo">Horario de Atención</h2>
      <p className="descripcion">
        Nuestro equipo de servicio y soporte está disponible durante los
        siguientes horarios:
      </p>
      <ul className="lista-horario">
        <li>Lunes a Viernes: 08:00 - 17:00</li>
        <li>Sábado: 08:00 - 14:00</li>
      </ul>

      <h2 className="subtitulo">Ubicación</h2>
      <p className="descripcion">
        Puedes visitarnos en nuestra ubicación física:
      </p>
      <p className="direccion">[Dirección de la Empresa]</p>
      <p className="ciudad">[Ciudad, País]</p>

      <h2 className="subtitulo">Comentarios y Sugerencias</h2>
      <p className="descripcion">
        Valoramos tus comentarios y sugerencias. Si tienes alguna sugerencia
        para mejorar nuestros servicios o alguna experiencia que te gustaría
        compartir con nosotros, no dudes en hacérnoslo saber. Tu opinión es
        importante para nosotros.
      </p>

      <p className="descripcion">
        En Mitsumichi Motorcycles, nos enorgullece ofrecer un servicio
        excepcional a nuestros clientes. ¡Esperamos verte pronto y ser parte de
        tu experiencia en el mundo de las motos!
      </p>
    </div>
  );
}

export default ServicioYSoporte;
