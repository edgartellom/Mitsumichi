import React from "react";
import videoHome from "../../assets/video.mp4";
import Navbar from "../../components/Navbar/Navbar";
import DropdownMenu from "../../components/DropdownMenu";
import Card from "../../components/Card";

const Home = () => {
  return (
      <div>
        <Navbar/>
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
        {<div className="flex flex-wrap gap-4 justify-center z-40">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>}
      </div>);
};

export default Home;
