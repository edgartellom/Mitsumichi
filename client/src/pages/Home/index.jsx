import React from "react";
import videoHome from "../../assets/video.mp4";
import Navbar from "../../components/Navbar/Navbar";
import DropdownMenu from "../../components/DropdownMenu";

const Home = () => {
  return (
      <div>
        <div className="fixed w-full bg-white p-1">
        <Navbar/>
        </div>
          <video autoPlay muted loop src={videoHome} className=""></video>
        <section className="p-1 bg-black w-full">
          <div className="  flex gap-4 items-center">
          <h1 className="text-white ml-3">Filtros:</h1>
          <DropdownMenu name={"Color"}/>
          <DropdownMenu name={"Engine"}/>
          <DropdownMenu name={"Asientos"}/>
          <DropdownMenu name={"Storage"}/>         
          
          </div>
        </section>
      </div>);
};

export default Home;
