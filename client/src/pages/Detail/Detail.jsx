import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

const Detail = () => {
  const [ isLoading, setIsLoading] = useState(true);
  const [moto, setMoto] = useState({});
  const [brand, setBrand] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios(`${URL}motos/${id}`);
        setMoto(response.data);

        const responseBrand = await axios(`${URL}marcas`);
        const brandFound = responseBrand.data.find((e) => e.id === response.data.brandId);
        setBrand(brandFound);

        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchDataDetail();
  }, [id]);
  
  
  // const fetchDataDetail = async () => {
  //   try {
  //     const response = await axios(`${URL}motos/${id}`);
  //     const responseBrand = await axios(`${URL}marcas`)
  //     setMoto(response.data)
  //     let brandfound = responseBrand.data/* .find((e)=> e.id === moto.brandId) */
  //     brandfound = brandfound.find((e)=> e.id === moto.brandId)
  //     console.log(brandfound)
  //     setBrands(brandfound)
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
   console.log(brand)
   console.log(moto)

    
  //   useEffect(()=>{
  //     fetchDataDetail(id)
  //   },[id])
  //   /* const brandDetail = brands.find((e)=> e.id === moto.brandId)
  //   console.log(brandDetail) */
    
    return (
      <div>
      <button 
          onClick={() => navigate("/home")}
          className="bg-[#161616] p-3 hover:scale-110 mx-10 text-white hover:bg-[#161616] duration-300"
          >Home</button>

          {isLoading ? <div>Cargando datos ...</div> :
      <div>
        <h1>{brand.name}</h1>
        <h2>{moto.motoModel}</h2>
        <img src={moto.imageUrl[0]} alt="moto-detail"></img>

        <span>{moto.precio}</span>
        <span>{moto.stock}</span>
        <span>{moto.tipo}</span>
        <span>{moto.year}</span>
      </div>
      }
    </div>
  )
}

export default Detail