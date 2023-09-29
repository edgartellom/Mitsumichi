import React, { useState, useEffect } from "react";
import getAllReviews from "../../../../firebase/getAllReviews";
import deleteReviewById from "../../../../firebase/deleteReviewById";
import { Pagination, SearchBar_Dashboard } from "../../components";

const Reviews_Admin = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  console.log(reviews);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Calcular el índice de inicio y final para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchReviews = async () => {
      const allReviews = await getAllReviews();
      setReviews(allReviews);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  const handleDeleteReview = async (reviewId) => {
    await deleteReviewById(reviewId);

    // Después de eliminar la revisión, volvemos a cargar las revisiones actualizadas
    const updatedReviews = await getAllReviews();
    setReviews(updatedReviews);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSearch = (searchQuery) => {
    const searchText = searchQuery.toLowerCase();
    const filteredReviews = reviews.filter((review) => {
      const reviewId = review.id ? review.id.toString().toLowerCase() : "";
      return (
        reviewId.includes(searchText) ||
        (review.id &&
          review?.userReview?.name.toLowerCase().includes(searchText)) ||
        review?.selectedItem?.brand.toLowerCase().includes(searchText) ||
        review?.selectedItem?.motoModel.toLowerCase().includes(searchText)
      );
    });

    // Establece filteredusers en todas las users si la búsqueda está vacía
    setFilteredReviews(searchQuery === "" ? reviews : filteredReviews);
  };

  return (
    <div className="min-h-full bg-slate-100 p-4">
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Foto</th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Modelo de Moto</th>
            <th className="py-2 px-4">Feedback</th>
            <th className="py-2 px-4">Rating</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((element) => (
            <tr
              key={element.id}
              className="group hover:bg-gray-200 text-center"
            >
              <td className="py-2 px-4">{element.id}</td>
              <td className="flex py-2 px-4 justify-center">
                <img
                  src={element.userReview.photoURL}
                  width="56px"
                  height="56px"
                  alt={element.userReview.name}
                />
              </td>
              <td className="py-2 px-4">{element.userReview.name}</td>
              <td className="py-2 px-4">{`${element.selectedItem.brand} ${element.selectedItem.motoModel}`}</td>
              <td className="py-2 px-4">{element.feedback}</td>
              <td className="py-2 px-4">{element.selectedRating}/5</td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  onClick={() =>
                    handleDeleteReview({
                      userId: element.userReview.id,
                      reviewId: element.id,
                    })
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-between">
        <section className="flex w-[30%]">
          <SearchBar_Dashboard handleSearch={handleSearch} />
        </section>
        <section className=" w-[70%]">
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </section>
      </div>
    </div>
  );
};

export default Reviews_Admin;
