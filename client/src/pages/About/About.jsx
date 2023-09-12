import React from 'react'

import Perfiles from "./perfiles/perfiles";

const About = () => {
  return (
    <div className=" min-w-screen overflow-hidden">    
        <h1 className="sm:text-3xl text-2xl font-medium title-font my-4 text-gray-700 text-center ">
          SOBRE NOSOTROS
        </h1>
      <section className="overflow-hidden mt-[10%] flex flex-row min-w-full justify-evenly flex-wrap">
        <div className=" text-gray-1000 text-1xl title-font text-justify mb-4 pl-2 w-[60%]">
          <p className='font-semibold'>
            Nuestra visión es ser una agencia líder en calidad y servicio.
            Creemos que con el constante avance de las tecnologías, es
            importante seguir ofreciendo a nuestros clientes soluciones
            digitales modernas y de moda a través de nuestros servicios
            profesionales.
          </p>
        </div>
      <div>
      <img
        className="object-cover rounded-lg w-96"
        alt="mission"
        src="https://i0.wp.com/comotos.co/wp-content/uploads/2022/01/Yamaha-MT-10-MP.png?resize=540%2C500&ssl=1"
      />
      </div>
      </section>
      <div >
      <section >
          <h1 className="sm:text-3xl text-2xl font-medium title-font my-4 text-gray-700 text-center">
            VISIÓN
          </h1>
          <div className="flex text-gray-1000 text-1xl title-font text-justify mb-4 pl-2 w-[100%] justify-center">
          <p className='font-semibold w-[60%]'>
            Va más allá de una simple página de Internet, es más bien una
            solución para que cada uno de los usuarios obtenga lo que requiere,
            información veraz, productos y servicios que cumplan con sus
            necesidades y ampliadas con las últimas tendencias tecnológicas.
          </p>
          </div>
      </section>
      </div>

      <Perfiles />

    </div>
  )
}

export default About