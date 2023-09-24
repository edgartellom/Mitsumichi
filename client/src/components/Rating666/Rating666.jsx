import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import createReview from '../../firebase/createReview';
import { userAuth } from "../../context/Auth-context";

const colors = {
  orange: "#FA6600",
  grey: "#A9A9A9"
};

const Rating = () => {
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

  const guardarDatos = async () => {
    // Aquí puedes implementar la lógica para guardar los datos, por ejemplo, hacer una solicitud a una API.
    // Puedes usar selectedRating y feedback para enviar los datos que el usuario ingresó.
    await createReview(currentUser?.uid, {selectedRating, feedback})
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="text-2xl font-semibold mb-4">Calificación</div>
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
