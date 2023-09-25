const sgMail = require("@sendgrid/mail");
require('dotenv').config();

// Configura la clave API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
   
  const msg = {
    to,
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

module.exports = sendEmail;