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
// "http://localhost:3001/"
const URL = "https://mitsumichi-production.up.railway.app/";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moto, setMoto] = useState({});
  const [brand, setBrand] = useState("");
  const [tipo, setTipo] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, setProductsLocalStorage, productsLocalStorage } =
    useContext(userAuth);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios(`${URL}motos/${id}`);
        setMoto(response.data);

        const responseBrand = await axios(`${URL}marcas`);
        const brandFound = responseBrand.data.find(
          (e) => e.id === response.data.brandId
        );
        setBrand(brandFound);

        const responseTipo = await axios(`${URL}tipos`);
        const tipoFound = responseTipo.data.find(
          (e) => e.id === response.data.tipoId
        );
        setTipo(tipoFound);

        setIsLoading(false);
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
    };
    navigate(`/paypal-button/${moto.precio}/${brand.name}`);
    window.localStorage.setItem("moto", JSON.stringify(motocycle));
  };

  const [amount, setAmount] = useState(0);

  const addProducto = async () => {
    const response = await axios.get(`motos/${id}`);
    const stock = response.data.stock;
    console.log(stock);
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
          brand: brandName,
          tipo: tipoName,
          imageUrl: imageUrl[0],
          motoModel,
          id,
          precio,
          cantidad: 1,
        });
      }

      increase(currentUser.uid, id);
    } else {
      // Si el usuario no está autenticado, verifica si el producto ya está en el carrito local
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const existingProduct = existingProducts.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito local, aumenta la cantidad
        existingProduct.cantidad += 1;
        // Actualiza el localStorage y el estado local
        localStorage.setItem("products", JSON.stringify(existingProducts));
        setProductsLocalStorage(existingProducts);
      } else {
        // Si el producto no está en el carrito local, agrégalo

        existingProducts.push({
          brand: brandName,
          tipo: tipoName,
          imageUrl: imageUrl[0],
          motoModel,
          id,
          precio,
          cantidad: 1,
        });

        // Actualiza el localStorage y el estado local
        localStorage.setItem("products", JSON.stringify(existingProducts));
        setProductsLocalStorage(existingProducts);
      }
    }
  };

  return (
    <article>
      <Slider666 />
      <summary>
        {isLoading ? (
          <Wrapper>
            <LoadingSpinner />
          </Wrapper>
        ) : (
          <section className="flex flex-col items-center justify-center flex-wrap py-10">
            <section className=" flex flex-col items-center pb-5">
              <h1 className="font-bold text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
                {brand.name}
              </h1>
              <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
                {moto.motoModel}
              </span>
            </section>
            <section>
              <figure className=" flex max-md:flex-col flex-wrap gap-20 max-md:gap-5">
                <img
                  src={moto.imageUrl[selectedImage]}
                  alt="moto-detail"
                  width={400}
                  className=" rounded-lg shadow-lg"
                />
                <aside className=" flex flex-wrap flex-col-reverse gap-3 max-md:gap-10 items-center justify-center">
                  <section className=" flex gap-2">
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
                  <summary className="flex  ">
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
                      <span className="text-lg font-semibold ">
                        Color Disponible:
                        {/* {moto.colors.map((color, index) => (
                          <span className="font-normal p-1" key={index}>
                            {color?.name},
                          </span>
                        ))} */}
                      </span>
                    </div>

                    <div className=" w-1 border  bg-black mx-4"></div>

                    <div className=" pl-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Ficha Técnica
                      </h3>
                      <p>Motor: {moto.fichaTecnica.motor}</p>
                      <p>Pasajeros: {moto.fichaTecnica.pasajeros}</p>
                      <p>Cilindrada: {moto.fichaTecnica.cilindrada}</p>
                      <p>Velocidades: {moto.fichaTecnica.velocidades}</p>
                    </div>
                  </summary>
                </aside>
              </figure>

              <div className=" flex items-center justify-center gap-10 py-5">
                <div className="flex ">
                  <p className="text-3xl font-bold">USD {moto.precio}</p>
                </div>
                <button
                  className="bg-transparent self-start text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-gray-500 to-blue-100 shadow-2xl"
                  onClick={navigateToPaypal}
                >
                  Comprar
                </button>
              </div>
            </section>
            <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
              <span className="mr-6">Compartir</span>
              <div className="flex flex-row">
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
          </section>
        )}
      </summary>
    </article>
  );
};

export default Detail;
