import React from 'react';

const Review = ({ name, description, starCount, userImage }) => {
  // Calcula el porcentaje de estrellas llenas
  const starPercentage = (starCount / 5) * 100;

  return (
    <div className="max-w-md mx-auto relative bg-gradient-to-r from-black to-gray-700 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img
          src={`https://png.pngtree.com/thumb_back/fh260/background/20201027/pngtree-yellow-orange-gradient-background-image_433766.jpg`}
          alt={`${name}'s Review`}
          className="object-cover h-32 w-full"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 56%, 0 100%)' }}
        />
        <div className="absolute top-2 right-2 p-1 rounded-full shadow-md">
          <img
            src={userImage}
            alt={name}
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold mr-5">{name}</div>
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index < starCount ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <p className="text-white text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Review;