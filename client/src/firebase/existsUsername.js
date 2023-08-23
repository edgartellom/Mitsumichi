import getAllUsers from "./getAllUsers";
/* Controlador para saber si un username ya existe utilizando firebase */
const existsUsername = async (username) => {
  const users = await getAllUsers();
  return users.some((user) => user.data?.username === username);
};

export default existsUsername;
