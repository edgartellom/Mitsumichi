import { useContext, useState, useEffect } from "react";
import increase from "../../firebase/increase";
import decrease from "../../firebase/decrease";
import { userAuth } from "../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/credenciales";
import axios from "axios";

const CartItem = ({ name, price, imagen, id }) => {
  const { currentUser, setProductsLocalStorage } = useContext(userAuth);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Referencia al documento del carrito en Firestore
    if (!currentUser) {
      const productsFromCart =
        JSON.parse(window.localStorage.getItem("products")) || [];
      const productInCart = productsFromCart.find(
        (product) => product.id === id
      );
      productInCart ? setAmount(productInCart.cantidad || 0) : setAmount(0);
      return;
    }
    const carritoDocRef = doc(db, "carritos", currentUser?.uid);

    // Escucha cambios en el documento del carrito
    const unsubscribe = onSnapshot(carritoDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const productos = data.productos || [];
        // Encuentra el producto en el carrito por su id
        const productInCart = productos.find((product) => product.id === id);
        productInCart ? setAmount(productInCart.cantidad || 0) : setAmount(0);
      } else {
        // El carrito no existe para este usuario
        setAmount(0);
      }
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, [currentUser?.uid, id]);

  const increaseAmountInLocalStorage = async (productId) => {
    // Obtiene la lista actual de productos del localStorage
    const response = await axios.get(`motos/${id}`);
    const stock = response.data.stock;
    if (amount >= stock) return;
    const productsFromCart =
      JSON.parse(window.localStorage.getItem("products")) || [];

    // Busca el producto con el productId en la lista
    const productToUpdate = productsFromCart.find(
      (product) => product.id === productId
    );

    if (productToUpdate) {
      // Si se encuentra el producto, aumenta la cantidad
      productToUpdate.cantidad = (productToUpdate.cantidad || 0) + 1;
      setAmount(productToUpdate.cantidad);
    }
    // Guarda la lista actualizada en el localStorage
    window.localStorage.setItem("products", JSON.stringify(productsFromCart));
    setProductsLocalStorage(productsFromCart);
  };

  const decreaseAmountInLocalStorage = (productId) => {
    // Obtiene la lista actual de productos del localStorage
    const productsFromCart =
      JSON.parse(window.localStorage.getItem("products")) || [];

    // Busca el producto con el productId en la lista
    const productToUpdateIndex = productsFromCart.findIndex(
      (product) => product.id === productId
    );

    if (productToUpdateIndex !== -1) {
      // Si se encuentra el producto, disminuye la cantidad
      productsFromCart[productToUpdateIndex].cantidad =
        (productsFromCart[productToUpdateIndex].cantidad || 0) - 1;

      // Si la cantidad llega a cero o es negativa, elimina el producto de la lista
      if (productsFromCart[productToUpdateIndex].cantidad <= 0) {
        productsFromCart.splice(productToUpdateIndex, 1);
      }

      // Guarda la lista actualizada en el localStorage
      window.localStorage.setItem("products", JSON.stringify(productsFromCart));

      // Actualiza el estado local (amount) o cualquier otra lógica necesaria
      setAmount(productsFromCart[productToUpdateIndex]?.cantidad || 0);
      setProductsLocalStorage(productsFromCart);
    }
  };

  const increaseProductAmount = async () => {
    const response = await axios.get(`motos/${id}`);
    const stock = response.data.stock;
    if (amount >= stock) return;
    increase(currentUser?.uid, id);
  };

  return (
    <li className=" flex max-md:flex-col border-b-2 max-md:gap-0  gap-10 items-center border-orange-600 p-4 ">
      <figure>
        <img src={imagen} alt="foto de una moto" width={150} />
      </figure>
      <article className=" flex flex-col max-md:text-center ">
        <h2 className=" mb-2 text-black font-semibold text-xl">{name}</h2>
        <section className=" w-40 flex gap-2  items-center max-md:flex-col">
          <span className=" font-bold text-[#8a2b06]">{price}</span>
          <span className=" font-bold border border-solid border-gray-300 py-1 px-3 rounded-lg text-[#363636]">
            x {amount}
          </span>
        </section>
      </article>
      <section className=" self-center">
        {currentUser ? (
          <button
            onClick={() => decrease(currentUser?.uid, id)}
            className=" hover:bg-[#8a2b06] hover:text-white font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
          >
            −
          </button>
        ) : (
          <button
            onClick={() => decreaseAmountInLocalStorage(id)}
            className=" hover:bg-[#8a2b06] hover:text-white font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
          >
            −
          </button>
        )}
        {currentUser ? (
          <button
            onClick={increaseProductAmount}
            className=" hover:bg-[#8a2b06] hover:text-white  font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
          >
            +
          </button>
        ) : (
          <button
            onClick={() => increaseAmountInLocalStorage(id)}
            className=" hover:bg-[#8a2b06] hover:text-white  font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
          >
            +
          </button>
        )}
      </section>
    </li>
  );
};

export default CartItem;
