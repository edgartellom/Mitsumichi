//Wrapper reutilizable para colocar un fondo oscuro cuando se habre una modal

const Wrapper = ({ children }) => {
  return (
    <div className=" bg-[#0000009d] fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-20">
      {children}
    </div>
  );
};

export default Wrapper;
