/* Boton para ser reutilizado en los demas componentes, puede ser modificado pasando por props el className */

const Button = ({ text, className, onfunction }) => {
  const buttonStyled =
    className +
    " bg-black shadow-zinc-700 shadow-lg text-white py-2 px-6 mx-52  max-sm:mx-9 rounded text-2xl font-semibold";

  return <button onClick={onfunction} className={buttonStyled}>{text}</button>;
};

export default Button;
