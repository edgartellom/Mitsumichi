import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider666 from "../../components/Slider666/Slider666";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";

const URL = "http://localhost:3001/";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moto, setMoto] = useState({});
  const [brand, setBrand] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
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
    <div>
      <Slider666 />
      <div className="max-w-5xl mx-auto px-4">
        {isLoading ? (
          <div>Cargando datos ...</div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-2 items-center m-8">
              <div className="image-gallery mb-6">
                <img
                  src={moto.imageUrl[selectedImage]}
                  alt="moto-detail"
                  className="max-w-sm mx-auto mb-4 rounded-lg shadow-lg"
                />
                <div className="thumbnail-gallery ml-10 flex gap-2">
                  {moto.imageUrl.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`thumbnail-${index}`}
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

              <div className=" flex flex-col">
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
                <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
                  <span className="mr-6">Compartir</span>
                  <div className="flex flex-row">
                    <img
                      src={facebook}
                      alt="facebook.png"
                      width={15}
                      height={13}
                      className="flex mx-4 cursor-pointer backdrop-brightness-2xl"
                    />
                    <img
                      src={twitter}
                      alt="twitter.png"
                      width={15}
                      height={13}
                      className="mx-4 cursor-pointer"
                    />
                    <img
                      src={whatsapp}
                      alt="whatsapp.png"
                      width={15}
                      height={15}
                      className="mx-4 cursor-pointer"
                      style={{ filter: "grayscale(100%)" }}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold mb-2">
                      Stock: {moto.stock}
                    </span>
                    <span className="text-lg font-semibold mb-2">
                      Tipo: {moto.tipo}
                    </span>
                    <span className="text-lg font-semibold">
                      Año: {moto.year}
                    </span>
                    <span className="text-lg font-semibold ">
                      Color Dispoible:
                      {moto.colorDisponible.map((color, index) => (
                        <span className="font-normal" key={index}>
                          {" "}
                          {color}
                        </span>
                      ))}
                    </span>
                  </div>

                  <div className="min-h-full w-1 border rounded-lg bg-gray-800 mx-4"></div>

                  <div className=" pl-4 flex items-start flex-col">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
