import { useContext, useState, useEffect } from "react";
import increase from "../../firebase/increase";
import decrease from "../../firebase/decrease";
import { userAuth } from "../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/credenciales";

const CartItem = ({ name, price, imagen, id }) => {
  const { currentUser } = useContext(userAuth);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Referencia al documento del carrito en Firestore
    const carritoDocRef = doc(db, "carritos", currentUser.uid);

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
  }, [currentUser.uid, id]);

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
      <div className=" self-center">
        <button
          onClick={() => decrease(currentUser.uid, id)}
          className=" hover:bg-[#8a2b06] hover:text-white font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
        >
          −
        </button>
        <button
          onClick={() => increase(currentUser.uid, id)}
          className=" hover:bg-[#8a2b06] hover:text-white  font-inherit font-bold text-1.25rem text-orange-600 border border-solid border-orange-600 w-12 text-center rounded-md bg-transparent cursor-pointer ml-4 my-1"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
