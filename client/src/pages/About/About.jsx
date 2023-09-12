import React from "react";

const About = () => {
  return (
    <div className=" h-max overflow-hidden">
      <br />      
      <section className="overflow-hidden sm:grid sm:grid-cols-2 ">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-700">
          SOBRE NOSOTROS
        </h1> <br />
        <div>
          <p className=" text-gray-1000 text-1xl title-font text-justify mb-4">
            Nuestra visión es ser una agencia líder en calidad y servicio.
            Creemos que con el constante avance de las tecnologías, es
            importante seguir ofreciendo a nuestros clientes soluciones
            digitales modernas y de moda a través de nuestros servicios
            profesionales.
          </p>
        </div>
      </section>
      <img
        className="object-cover sm:h-full rounded-lg w-96"
        alt="mission"
        src="https://i0.wp.com/comotos.co/wp-content/uploads/2022/01/Yamaha-MT-10-MP.png?resize=540%2C500&ssl=1"
      />
      <div className="flex justify-center px-4 py-8 bg-base-200 flex-col">
      <section className="overflow-hidden sm:grid sm:grid-cols-2 mt-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-700">
            VISIÓN
          </h1>
          <p className=" text-gray-1000 text-1xl title-font text-justify mb-4">
            Va más allá de una simple página de Internet, es más bien una
            solución para que cada uno de los usuarios obtenga lo que requiere,
            información veraz, productos y servicios que cumplan con sus
            necesidades y ampliadas con las últimas tendencias tecnológicas.
          </p>
      </section>
      </div>

      <div className="p-4 lg:w-1/3 md:w-1/2 w-full ">
              <div className="h-full flex items-top border-gray-200 border p-2 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:bg-[#FFD700]">
                <div className="flex-grow max-w-fit sm:pl-2 sm:pt-2 ">
                  <img
                    alt="team"
                    className=" mr-2 flex-shrink-0 h-32 w-28 bg-gray-50 rounded-lg object-cover object-top sm:mb-0 border-solid shadow-md shadow-[#555555] transition duration-500 hover:scale-105"
                    src={person_3}
                    width={"500"}
                  />
                </div>
                <div className="flex-grow sm:pl-4 pl-2">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    Don Alejandro
                  </h2>

                  <h3 className="text-gray-500 mb-3">Developer</h3>

                  <p className="mb-4">Description:</p>

                  <span className="inline-flex">
                    <a href={"https://github.com/alecanonm"} target="black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        className="m-1 w-6 h-6"
                      >
                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" />
                      </svg>
                    </a>

                    <a
                      href={"https://www.linkedin.com/in/alecanonm/"}
                      target="black"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        className="m-1 w-6 h-6"
                      >
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>

    </div>
  );
};

export default About;
