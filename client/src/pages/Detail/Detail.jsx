import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider666 from "../../components/Slider666/Slider666";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";
import Wrapper from "../../helper/Wrapper";
import { Button, LoadingSpinner } from "../../components";

// const URL = "http://localhost:3001/";

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
        const response = await axios(`motos/${id}`);
        setMoto(response.data);

        const responseBrand = await axios(`$marcas`);
        const brandFound = responseBrand.data.find(
          (e) => e.id === response.data.brandId
        );
        setBrand(brandFound);

        const responseTipo = await axios(`tipos`);
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
                    <section className="flex flex-col">
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
                        Color Dispoible:
                        {moto.colorDisponible.map((color, index) => (
                          <span className="font-normal pl-2" key={index}>
                            {color}
                          </span>
                        ))}
                      </span>
                    </section>

                    <div className=" w-1 border  bg-black mx-4"></div>

                    <section className=" pl-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Ficha Técnica
                      </h3>
                      <p>Motor: {moto.fichaTecnica.motor}</p>
                      <p>Pasajeros: {moto.fichaTecnica.pasajeros}</p>
                      <p>Cilindrada: {moto.fichaTecnica.cilindrada}</p>
                      <p>Velocidades: {moto.fichaTecnica.velocidades}</p>
                    </section>
                  </summary>
                </aside>
              </figure>

              <section className=" flex items-center justify-center gap-10 py-5">
                <p className="text-3xl font-bold">USD {moto.precio}</p>
                <Button
                  className="bg-transparent   border-2 border-black  text-base leading-5 rounded-md hover:bg-orange-600 transtion duration-300"
                  onClick={() =>
                    navigate(`/paypal-button/${moto.precio}/${brand.name}`)
                  }
                  text={"Comprar"}
                />
              </section>
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
