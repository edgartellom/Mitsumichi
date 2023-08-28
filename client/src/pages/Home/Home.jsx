import React, { useEffect, useState } from "react";
import axios from "axios";
import videoHome from "../../assets/video.mp4";
import DropdownMenu from "../../components/DropdownMenu/DropDownMenu";
import Paginate from "../../components/Paginate/Paginate";
import Cards from "../../components/Cards/Cards";

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;
const limit = 6;

const Home = () => {
  const [motos, setMotos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios(
        `http://localhost:3001/motos?page=${currentPage}&limit=${limit}`
      );

      const jsonData = await response.data;

      setTotalPages(jsonData.totalPages);

      if (Array.isArray(jsonData.data)) {
        setMotos(jsonData.data);
      } else {
        console.log("API response is not an array:", jsonData.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      /* setIsLoading(false); */
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" ">
      <video autoPlay muted loop src={videoHome} className=""></video>
      <section className="p-1 bg-black w-full">
        <div className="  flex flex-wrap gap-4 items-center">
          <h1 className="text-white ml-3">Filtros:</h1>
          <DropdownMenu name={"Color"} />
          <DropdownMenu name={"Engine"} />
          <DropdownMenu name={"Asientos"} />
          <DropdownMenu name={"Storage"} />
        </div>
      </section>
      <Cards data={motos} />
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
