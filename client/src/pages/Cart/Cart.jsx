import Wrapper from "../../helper/Wrapper";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect } from "react";
import { userAuth } from "../../context/Auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/credenciales";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
const Cart = ({ setShowCart }) => {
  const { currentUser, setProducts, products, productsLocalStorage } =
    useContext(userAuth);
  const navigate = useNavigate();
  const gettingProducts = async () =>
    !currentUser ? [] : await getCartProducts(currentUser.uid);

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

    return () => {
      unsubscribe();
    };
  }, []);

  let cartItems = null;

  let totalAmount = null;

  if (currentUser) {
    cartItems = (
      <ul className="  max-h-80 overflow-auto">
        {products?.map((product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              name={product.brand}
              price={product.precio}
              imagen={product.imageUrl}
              amount={product.cantidad}
            />
          );
        })}
      </ul>
    );
    totalAmount = products?.reduce((curNumber, item) => {
      return curNumber + Number(item.precio) * item.cantidad;
    }, 0);
  } else {
    cartItems = (
      <ul className="  max-h-80 overflow-auto">
        {productsLocalStorage?.map((product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              name={product.brand}
              price={product.precio}
              imagen={product.imageUrl}
              amount={product.cantidad}
            />
          );
        })}
      </ul>
    );
    totalAmount = productsLocalStorage?.reduce((curNumber, item) => {
      return curNumber + Number(item.precio) * item.cantidad;
    }, 0);
  }
  const orderClickHandler = () => {
    if (!currentUser) {
      return;
    }

    const totalproducts = [
      ...new Set(products.map((product) => product.brand)),
    ].map((brand) => {
      return brand;
    });

    navigate(`/paypal-button/${totalAmount}/${totalproducts}`);
    setShowCart(false);
  };

  return (
    <Wrapper>
      {products?.length ? (
        <summary className="bg-gray-300  p-10 max-md:w-full max-md:h-full rounded-lg animate-slide-down">
          {cartItems}
          <article className="flex max-md:flex-col-reverse mt-8  font-bold gap-20 text-1.5rem my-4">
            <div className=" flex gap-5 items-center">
              <span className="font-bold text-2xl">Total Amount:</span>
              <span className="font-bold text-2xl">{totalAmount}$</span>
            </div>
            <section className="flex max-md:flex-col-reverse  gap-4 pb-3">
              <Button
                onClick={() => {
                  setShowCart(false);
                }}
                text={"Close"}
                className=" text-white rounded-2xl shadow-none hover:scale-105"
              />

              {products?.length > 0 && (
                <Button
                  className=" bg-white rounded-2xl transform hover:scale-105 shadow-none border-solid border-2 border-black "
                  text="Order"
                  onClick={orderClickHandler}
                />
              )}
            </section>
          </article>
        </summary>
      ) : productsLocalStorage?.length ? (
        <summary className="bg-gray-300  p-10 max-md:w-full max-md:h-full rounded-lg animate-slide-down">
          {cartItems}
          <article className="flex max-md:flex-col-reverse mt-8  font-bold gap-20 text-1.5rem my-4">
            <div className=" flex gap-5 items-center">
              <span className="font-bold text-2xl">Total Amount:</span>
              <span className="font-bold text-2xl">{totalAmount}$</span>
            </div>
            <section className="flex max-md:flex-col-reverse  gap-4 pb-3">
              <Button
                onClick={() => {
                  setShowCart(false);
                }}
                text={"Close"}
                className=" text-white rounded-2xl shadow-none hover:scale-105"
              />

              {productsLocalStorage.length > 0 && (
                <Button
                  className=" bg-white rounded-2xl transform hover:scale-105 shadow-none border-solid border-2 border-black "
                  text="Order"
                  onClick={orderClickHandler}
                />
              )}
            </section>
          </article>
        </summary>
      ) : (
        <summary className=" list-none bg-gray-300 p-10 rounded-lg animate-slide-down">
          <section className="flex justify-between items-center font-bold text-1.5rem my-4">
            <span className="font-bold text-2xl">Carrito vacio</span>
          </section>
          <section className="flex justify-center gap-2">
            <Button
              onClick={() => {
                setShowCart(false);
              }}
              text={"Close"}
              className=" text-white rounded-2xl shadow-none hover:scale-105"
            />
          </section>
        </summary>
      )}
    </Wrapper>
  );
};

export default Cart;
