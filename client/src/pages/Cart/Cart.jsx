import Wrapper from "../../helper/Wrapper";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect, useState } from "react";
import { userAuth } from "../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/credenciales";

const Cart = ({ setShowCart }) => {
  const { currentUser } = useContext(userAuth);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para rastrear si el carrito está abierto

  const gettingProducts = async () => {
    if (!currentUser) return;
    const data = await getCartProducts(currentUser.uid);
    return data;
  };

  useEffect(() => {
    gettingProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    // Configura el oyente de Firebase Firestore cuando el carrito se abre
    if (!currentUser) return;
    const cartDocRef = doc(db, "carritos", currentUser.uid);
    const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedData = docSnapshot.data();
        const updatedProducts = updatedData.productos || [];

        // Filtra los productos visibles eliminando aquellos con cantidad cero
        const updatedVisibleProducts = updatedProducts.filter(
          (product) => product.cantidad > 0
        );

        setProducts(updatedVisibleProducts);
      }
    });

    // Limpia el oyente cuando el componente se desmonta o cuando se cierra el carrito
    return () => {
      unsubscribe();
    };
  }, [isCartOpen]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItems = (
    <ul className="list-none m-0 p-0 max-h-80 overflow-auto">
      {products &&
        products.map((product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              name={product.brand?.name}
              price={product.precio}
              imagen={product.imageUrl}
              amount={product.cantidad}
            />
          );
        })}
    </ul>
  );

  const totalAmount = products?.reduce((curNumber, item) => {
    return curNumber + Number(item.precio) * item.cantidad;
  }, 0);

  return (
    <Wrapper>
      {products && products.length > 0 ? (
        <div className="bg-white p-4 rounded-lg animate-slide-down">
          {cartItems}
          <div className="flex justify-between items-center font-bold text-1.5rem my-4">
            <span className="font-bold text-2xl">Total Amount</span>
            <span className="font-bold text-2xl">{totalAmount} $</span>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setShowCart(false);
                toggleCart();
              }}
              className="hover:bg-red-800 hover:border-red-800 hover:text-white font-inherit cursor-pointer bg-transparent border border-orange-600 px-5 py-2 rounded-2xl"
            >
              Close
            </button>
            {products.length > 0 && (
              <button className="bg-red-800 text-white hover:bg-transparent hover:border-red-800 hover:text-black font-inherit cursor-pointer bg-transparent border border-orange-600 px-5 py-2 rounded-2xl">
                Order
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg animate-slide-down">
          <div className="flex justify-between items-center font-bold text-1.5rem my-4">
            <span className="font-bold text-2xl">Carrito vacio</span>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setShowCart(false);
              }}
              className="hover:bg-red-800 hover:border-red-800 hover:text-white font-inherit cursor-pointer bg-transparent border border-orange-600 px-5 py-2 rounded-2xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
