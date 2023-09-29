import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Paginated = ({ totalPages, onPageChange }) => {
  const { currentPage } = useSelector((state) => state.motoList);
  const handlePageChange = (selectedPage) => {
    onPageChange(selectedPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba
  };

  return (
    <section className="flex pb-5 gap-3 flex-wrap m-auto justify-center items-center">
      <ReactPaginate
        className=" flex flex-wrap justify-center items-center gap-2"
        pageCount={totalPages}
        pageRangeDisplayed={window.innerWidth < 768 ? 2 : 4}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => handlePageChange(selected)}
        activeClassName=" bg-orange-600"
        pageClassName="bg-[#0006] cursor-pointer border-none font-semibold  py-2 text-xl  rounded-md  duration-300 hover:bg-gray-400"
        previousClassName=" bg-[#000] text-white border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-orange-700 font-semibold hover:text-black shadow transition duration-300 hover:bg-gold"
        nextClassName=" bg-[#000] text-white border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-orange-700 font-semibold hover:text-black shadow transition duration-300 hover:bg-gold "
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName=" cursor-pointer text-xl py-2 px-4 font-semibold"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1} // Utiliza currentPage desde el estado de Redux
        pageLinkClassName=" cursor-pointer border-none font-semibold p-2 px-4 text-xl rounded-md duration-300 hover:bg-gray-400"
        onPageActive={(e) => {
          e.preventDefault();
          handlePageChange(e.currentTarget.getAttribute("data-page")); // Utiliza el data-page para obtener el número de página
        }}
      />
    </section>
  );
};

export default Paginated;
