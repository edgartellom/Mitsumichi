import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider666 from "../../components/Slider666/Slider666";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";
import Wrapper from "../../helper/Wrapper";
import { LoadingSpinner } from "../../components";

const URL = "https://mitsumichi-production.up.railway.app/";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moto, setMoto] = useState({});
  const [brand, setBrand] = useState("");
  const [tipo, setTipo] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

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
        console.log("Error al obtener los datos:", error);
        setIsLoading(false);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <article>
      <Slider666 />
      <div className="max-w-5xl mx-auto px-4">
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
                alt="Detalle de la moto"
                className="max-w-sm mx-auto mb-4 rounded-lg shadow-lg"
              />
              <aside className="flex flex-wrap flex-col-reverse gap-3 max-md:gap-10 items-center justify-center">
                <div className="flex gap-2">
                  {moto.imageUrl.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`miniatura-${index}`}
                      onClick={() => handleImageClick(index)}
                      width={100}
                      className="rounded-lg shadow-lg cursor-pointer"
                    />
                  ))}
                </div>
                <div className="flex">
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
                      {moto.colorDisponible.map((color, index) => (
                        <span className="font-normal" key={index}>
                          {" "}
                          {color}
                          {index < moto.colorDisponible.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="thumbnail-gallery ml-10 flex gap-2">
                    {moto.imageUrl.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`miniatura-${index}`}
                        onClick={() => handleImageClick(index)}
                        className={`w-16 h-16 cursor-pointer border-2 ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-transparent"
                        } rounded-lg transition duration-300`}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            </figure>
            <div className="flex flex-col">
              <h1 className="font-bold font-MiAvenirRegular text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
                {brand.name}
              </h1>
              <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
                {moto.motoModel}
              </span>
              <p className="text-xs font-bold uppercase tracking-wide mt-4 mb-0">
                Precio
              </p>
              <p className="text-3xl font-bold">U$D {moto.precio}</p>
              <br />
              <button
                className="bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-gray-500 to-blue-100 shadow-2xl"
                onClick={() =>
                  navigate(`/paypal-button/${moto.precio}/${brand.name}`)
                }
              >
                Comprar
              </button>
              <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
                <span className="mr-6">Compartir</span>
                <div className="flex flex-row">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <img
                      src={facebook}
                      alt="facebook.png"
                      width={15}
                      height={13}
                      className="flex mx-4 cursor-pointer backdrop-brightness-2xl"
                    />
                  </a>
                  <a href="https://twitter.com/Twitter" target="_blank" rel="noreferrer">
                    <img
                      src={twitter}
                      alt="twitter.png"
                      width={15}
                      height={13}
                      className="mx-4 cursor-pointer"
                    />
                  </a>
                  <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
                    <img
                      src={whatsapp}
                      alt="whatsapp.png"
                      width={15}
                      height={15}
                      className="mx-4 cursor-pointer"
                      style={{ filter: "grayscale(100%)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="flex flex-row">
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
                    {moto.colorDisponible.map((color, index) => (
                      <span className="font-normal" key={index}>
                        {" "}
                        {color}
                        {index < moto.colorDisponible.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="w-1 border bg-black mx-4"></div>
                <div className="pl-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Ficha Técnica
                  </h3>
                  <p>Motor: {moto.fichaTecnica.motor}</p>
                  <p>Pasajeros: {moto.fichaTecnica.pasajeros}</p>
                  <p>Cilindrada: {moto.fichaTecnica.cilindrada}</p>
                  <p>Velocidades: {moto.fichaTecnica.velocidades}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10 py-5">
              <div className="flex">
                <p className="text-3xl font-bold">USD {moto.precio}</p>
              </div>
              <button
                className="bg-transparent self-start text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-gray-500 to-blue-100 shadow-2xl"
                onClick={() => navigate(`/paypal-button/${moto.precio}/${brand.name}`)}
              >
                Comprar
              </button>
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default Detail;
