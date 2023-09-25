const express = require('express');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Configura CORS
app.use(cors());


// Configura la clave API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware para permitir solicitudes JSON
app.use(express.json());

// Ruta para enviar correos electrónicos
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to:"mitsumichipf@gmail.com",
    from: 'al3jandrocan0n@gmail.com',
    subject:"Prueba de envio de correo",
    text: "Prueba de envio de correo",
  };

  try {
    console.log(msg, 'antes de send');
    await sgMail.send(msg);

    res.status(200).json({ message: 'Correo electrónico enviado con éxito.' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});


/* const sgMail = require("@sendgrid/mail");
require('dotenv').config();

// Configura la clave API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
   
  const msg = {
    to:"7jimenez.w@gmail.com",
    from: "al3jandrocan0n@gmail.com",
    subject,
    text,
  };
  
  try {
    console.log(msg, "antes de send");
    await sgMail.send(msg);
    
    res.status(200).json({ message: "Correo electrónico enviado con éxito." });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = sendEmail; */