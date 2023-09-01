import React from "react";

<<<<<<< HEAD
const DropdownMenu = ({ name, data }) => {
  return (
    <div className="group">
      <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
=======
const DropdownMenu = ({ name, data, onClick }) => {
  return (
    <div className="group inline-block ">
      <button className="outline-none focus:outline-none border px-3 py-1 bg-gray-200 rounded-sm flex items-center min-w-32 max-sm:w-screen">
>>>>>>> d1395e205a174c54b2dfdf94c1a36a65d302e495
        <span className="pr-1 font-semibold flex-1">{name}</span>
        <span>
          <svg
            className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
      >
<<<<<<< HEAD
        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option A</li>
        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option B</li>
        <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option C</li>
=======
        {data ? (
          data.map((item, i) => (
            <li
              key={i}
              className="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => onClick(item)}
            >
              {item}
            </li>
          ))
        ) : (
          <>
            <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option A</li>
            <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option B</li>
            <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Option C</li>
          </>
        )}
>>>>>>> d1395e205a174c54b2dfdf94c1a36a65d302e495
      </ul>
    </div>
  );
};

export default DropdownMenu;

