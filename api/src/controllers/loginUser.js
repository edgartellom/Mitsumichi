const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log(email, password, "1");
    if (!(email && password)) {
      res.status(400).send("Todos los campos son requeridos");
    }

    const user = await User.findOne({ where: { email } });
    console.log(email, password, "despues del findOne");

    if (!user) {
     return res.status(404).send("Usuario no encontrado");
    }

    if (await bcrypt.compare(password, user.password)) {
      console.log(email, password, "despues del bcrypt compare password");
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Save user token
      user.token = token;
      await user.save();

      // user
      return res.status(200).json(user);
    } else {
      console.log(email, password, "despues del else");
      res.status(400).send("Credenciales incorrectas");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = loginUser;