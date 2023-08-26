/* Boton para ser reutilizado en los demas componentes, puede ser modificado pasando por props el className */

const Button = ({ image, text, className, onClick, type }) => {
  const buttonStyled =
    " bg-black flex justify-center gap-2 items-center shadow-zinc-700 shadow-lg  py-2 px-6   max-sm:mx-9 rounded text-2xl font-semibold " +
    className;

  return (
    <button type={type || "button"} className={buttonStyled} onClick={onClick}>
      {image && <img src={image} width={23} />}
      {text}
    </button>
  );
};

export default Button;
