import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import createReview from '../../firebase/createReview';
import { userAuth } from '../../context/Auth-context';

const colors = {
  orange: "#FA6600",
  grey: "#A9A9A9"
};

const Rating = ({setShowReview, selectedItem}) => {
  console.log(selectedItem);
  const { currentUser, products, user } = useContext(userAuth);

  const stars = Array(5).fill(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(undefined);
  const [feedback, setFeedback] = useState("");

  const handleRatingClick = (value) => {
    setSelectedRating(value);
  };

  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(undefined);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para guardar los datos, por ejemplo, hacer una solicitud a una API.
    // Puedes usar selectedRating y feedback para enviar los datos que el usuario ingresó.
    await createReview(currentUser?.uid, {selectedRating, feedback})
    setShowReview(false)
    window.alert("Gracias por tu valoración")
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <button onClick={()=>{setShowReview(false)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
      </button>
      <div className="text-2xl font-semibold mb-2">{`Review de ${selectedItem.brand} ${selectedItem.motoModel}`}</div>
      <div className="flex justify-center p-4 gap-2">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            color={(hoveredRating || selectedRating) > index ? colors.orange : colors.grey}
            onClick={() => handleRatingClick(index + 1)}
            onMouseOver={() => handleRatingHover(index + 1)}
            onMouseLeave={handleRatingLeave}
          />
        ))}
      </div>
      <textarea
        className="w-full h-24 p-2 border border-black rounded-md mb-4"
        placeholder="¿Cuál es tu opinión?"
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <button
        className="w-1/4 hover:bg-[#FA6600] bg-black text-white hover:text-black font-bold py-2 px-4 rounded-md"
        onClick={guardarDatos}
      >
        Enviar
      </button>
    </div>
  );
};

export default Rating;
