import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Slider666 from "../../components/Slider666/Slider666";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";
import Wrapper from "../../helper/Wrapper";
import { LoadingSpinner } from "../../components";
import increase from "../../firebase/increase";
import axios from "axios";
import addProduct from "../../firebase/addProduct";
import { userAuth } from "../../context/Auth-context";
import CartIcon from "../Cart/CartButton/CartIcon";
import { set } from "date-fns";
import getAllReviews from "../../firebase/getAllReviews";
import Review from "../../components/Review/Review";
import Swal from 'sweetalert2';
// "http://localhost:3001/"
//"https://mitsumichi-production.up.railway.app/"
// const URL = "http://localhost:3001/";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moto, setMoto] = useState({});
  const [brand, setBrand] = useState("");
  const [tipo, setTipo] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInStock, setIsInStock] = useState(true);

  const { currentUser, setProductsLocalStorage, productsLocalStorage } =
    useContext(userAuth);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios(`motos/${id}`);
        setMoto(response.data);

        const responseBrand = await axios(`marcas`);
        const brandFound = responseBrand.data.find(
          (e) => e.id === response.data.brandId
        );
        setBrand(brandFound);

        const responseTipo = await axios(`tipos`);
        const tipoFound = responseTipo.data.find(
          (e) => e.id === response.data.tipoId
        );
        setTipo(tipoFound);

        // Actualiza isInStock basado en el stock de la moto
        setIsInStock(response.data.stock > 0);

        setIsLoading(false);
        const allReviews = await getAllReviews();
        setReviews(allReviews);
        console.log(allReviews);
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const navigateToPaypal = () => {
    const motocycle = {
      brand: brand.name,
      motoModel: moto.motoModel,
      year: moto.year,
      precio: moto.precio,
      imageUrl: moto.imageUrl[0],
      cantidad: 1,
      id: moto.id,
      stock: moto.stock,
    };
    navigate(`/paypal-button/${moto.precio}/${brand.name}/${id}/${moto.stock}`);
    window.localStorage.setItem("moto", JSON.stringify(motocycle));
  };

  const addProducto = async () => {
    const response = await axios.get(`motos/${id}`);
    const stock = response.data.stock;

    if (stock > 0) {
      if (currentUser) {
        // Si el usuario está autenticado, verifica si el producto ya está en el carrito
        const existingProduct = productsLocalStorage.find(
          (product) => product.id === id
        );

        if (existingProduct) {
          // Si el producto ya está en el carrito, aumenta la cantidad
          existingProduct.cantidad += 1;
          setProductsLocalStorage([...productsLocalStorage]);
        } else {
          // Si el producto no está en el carrito, agrégalo
          addProduct(currentUser.uid, {
            brand: brand.name,
            motoModel: moto.motoModel,
            year: moto.year,
            precio: moto.precio,
            imageUrl: moto.imageUrl[0],
            cantidad: 1,
            id: moto.id,
            stock: moto.stock,
          });
        }

        increase(currentUser.uid, id);
      } else {
        // Si el usuario no está autenticado, verifica si el producto ya está en el carrito local
        const existingProducts =
          JSON.parse(localStorage.getItem("products")) || [];
        const existingProduct = existingProducts.find(
          (product) => product.id == id
        );

        if (existingProduct) {
          // Si el producto ya está en el carrito local, aumenta la cantidad
          if (existingProduct.cantidad >= stock) {
            setIsInStock(false); // Actualiza el estado para deshabilitar el botón
            return;
          }
          existingProduct.cantidad += 1;
          // Actualiza el localStorage y el estado local
          localStorage.setItem("products", JSON.stringify(existingProducts));
          setProductsLocalStorage(existingProducts);
        } else {
          // Si el producto no está en el carrito local, agrégalo
          existingProducts.push({
            brand: brand.name,
            motoModel: moto.motoModel,
            year: moto.year,
            precio: moto.precio,
            imageUrl: moto.imageUrl[0],
            cantidad: 1,
            id: moto.id,
            stock: moto.stock,
          });

          // Actualiza el localStorage y el estado local
          localStorage.setItem("products", JSON.stringify(existingProducts));
          setProductsLocalStorage(existingProducts);
        }
      }
    } else {
      // Producto sin stock
      Swal.fire({
        icon: 'error',
        title: 'Este producto está sin stock',
        text: 'Lo sentimos, pero este producto está agotado.',
      });
    }
  };

  const filteredReviews = reviews.filter(
    (e) => e.selectedItem?.motoModel === moto.motoModel
  );
  console.log(filteredReviews);

  return (
    <article className="w-full">
      <Slider666 />
      {isLoading ? (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <section className="flex flex-col items-center justify-center flex-wrap py-10">
          <section className="flex flex-col items-center pb-5">
            <h1 className="font-bold text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
              {brand.name}
            </h1>
            <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
              {moto.motoModel}
            </span>
          </section>
          <figure className="flex max-md:flex-col flex-wrap gap-20 max-md:gap-5">
            <img
              src={moto.imageUrl[selectedImage]}
              alt="moto-detail"
              width={400}
              className="rounded-lg shadow-lg"
            />
            <aside className="flex flex-wrap flex-col-reverse gap-3 max-md:gap-10 items-center justify-center">
              <section className="flex gap-2">
                {moto.imageUrl.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`thumbnail-${index}`}
                    onClick={() => handleImageClick(index)}
                    width={100}
                    className="rounded-lg shadow-lg cursor-pointer"
                  />
                ))}
              </section>
              <summary className="flex">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold mb-2">
                    Stock: {moto.stock}
                  </span>
                  <span className="text-lg font-semibold mb-2">
                    Tipo: {tipo.name}
                  </span>
                  <span className="text-lg font-semibold">
                    Año: {moto.year}
                  </span>
                  <span className="text-lg font-semibold">
                    Color Disponible:
                  </span>
                </div>
                <div className="w-1 border bg-black mx-4"></div>
                <div className="pl-4">
                  <h3 className="text-xl font-semibold mb-2">Ficha Técnica</h3>
                  <p>Motor: {moto.fichaTecnica.motor}</p>
                  <p>Pasajeros: {moto.fichaTecnica.pasajeros}</p>
                  <p>Cilindrada: {moto.fichaTecnica.cilindrada}</p>
                  <p>Velocidades: {moto.fichaTecnica.velocidades}</p>
                </div>
              </summary>
            </aside>
          </figure>
          <div className="flex items-center justify-center gap-10 py-5">
            <div className="flex">
              <p className="text-3xl font-bold">USD {moto.precio}</p>
            </div>
            {/* <button
              className={`bg-transparent self-start text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-gray-500 to-blue-100 shadow-2xl ${
                isInStock ? "" : "cursor-not-allowed opacity-50"
              }`}
              onClick={navigateToPaypal}
              disabled={!isInStock}
            >
              {isInStock ? "Comprar" : "Sin stock"}
            </button> */}
            <span
              onClick={addProducto}
              className={`bg-orange-500 p-1 rounded-lg cursor-pointer max-sm:w-7 w-10 hover:scale-110 mr-2 ${
                isInStock ? "" : "cursor-not-allowed opacity-50"
              }`}
            >
              <CartIcon />
            </span>
          </div>
        </section>
      )}

      <div className="py-1 flex flex-col text-left text-sm text-gray-700 border-t border-b border-gray-400">
        <span className="text-center text-lg pb-2">Compartir</span>
        <div className="flex flex-row w-full justify-center">
          <img
            src={facebook}
            alt="facebook.png"
            width={20}
            height={20}
            className="flex mx-4 cursor-pointer backdrop-brightness-2xl"
          />
          <img
            src={twitter}
            alt="twitter.png"
            width={20}
            height={20}
            className="mx-4 cursor-pointer"
          />
          <img
            src={whatsapp}
            alt="whatsapp.png"
            width={20}
            height={20}
            className="mx-4 cursor-pointer"
            style={{ filter: "grayscale(100%)" }}
          />
        </div>
      </div>

      <div className="py-4 mb-5 pb-6 text-center">
        <h1 className="p-5 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-[#FA6600] to-red-600 shadow-2xl">
          Lo que dicen nuestros compradores:
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 pb-6 justify-center">
        {!filteredReviews.length ? (
          <span className="text-xl font-bold text-gray-700 bg-gray-200 p-2 rounded-md">
            Aún no hay reviews de este modelo
          </span>
        ) : (
          filteredReviews.map(
            (rev) => (
              console.log(rev),
              (
                <Review
                  key={rev.id} // Asegúrate de tener una clave única en el mapeo
                  name={rev?.userReview?.name}
                  userImage={rev?.userReview?.photoURL}
                  description={rev.feedback}
                  starCount={rev.selectedRating}
                />
              )
            )
          )
        )}
      </div>
    </article>
  );
};

export default Detail;
