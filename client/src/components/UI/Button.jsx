/* Boton para ser reutilizado en los demas componentes, puede ser modificado pasando por props el className */

const Button = ({ image, text, className, onClick, type }) => {
  const buttonStyled =
    className +
    " bg-black flex justify-center gap-2 items-center shadow-zinc-700 shadow-lg text-white py-2 px-6 mx-52  max-sm:mx-9 rounded text-2xl font-semibold";

  return (
    <button type={type || "button"} className={buttonStyled} onClick={onClick}>
      {image && <img src={image} width={23} />}
      {text}
    </button>
  );
};

export default Button;
