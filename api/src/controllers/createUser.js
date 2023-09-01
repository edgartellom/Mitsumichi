const { User } = require("../db");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    //Validar que sea un email válido.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(email && password && name) || !emailRegex.test(email)) {
      throw res.status(400).send("Por favor, ingresa un email válido y llena todos los campos.");
    }


    const encriptedPassword = await bcrypt.hash(password, 10);

    //creamos el usuario en la base de datos

    const newUser = await User.create({
      name,
      email,
      password: encriptedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}

module.exports = createUser;