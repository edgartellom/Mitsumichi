import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Carousel } from "react-responsive-carousel";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const MediaInventoryManager_Product = ({
  formData,
  setFormData,
  isButtonActive,
  handleImageChange,
  selectedImages,
  imagePreviews,
  handleSubmiMoto,
}) => {
  const [isTall, setIsTall] = useState(false);

  //console.log(formData);
  //console.log(isTall);

  // Estados y funciones para la edición de stock
  const [editingStock, setEditingStock] = useState(false);
  const [newStock, setNewStock] = useState(formData.stock);
  const [stockError, setStockError] = useState("");

  const handleStockChange = (e) => {
    setNewStock(e.target.value);
    if (e.target.value.length < 1) {
      setStockError("El campo de stock no puede estar vacío");
    } else {
      setStockError("");
    }
  };

  const handleStockSave = () => {
    if (stockError) {
      return;
    } else if (newStock !== formData.stock) {
      // Aquí puedes agregar lógica para guardar el nuevo valor de stock
      // Puedes actualizar el formData u otros estados según tus necesidades
      setFormData({ ...formData, stock: Number(newStock) });
    }
    setEditingStock(false);
  };

  const handleStockCancel = () => {
    setEditingStock(false);
    setNewStock(formData.stock);
  };

  // Estados y funciones para la edición de precio
  const [editingPrecio, setEditingPrecio] = useState(false);
  const [newPrecio, setNewPrecio] = useState(formData.precio);
  const [precioError, setPrecioError] = useState("");

  const handlePrecioChange = (e) => {
    setNewPrecio(e.target.value);
    if (e.target.value < 0) {
      setPrecioError("El precio no puede ser negativo");
    } else {
      setPrecioError("");
    }
  };

  const handlePrecioSave = () => {
    if (precioError) {
      return;
    } else if (newPrecio !== formData.precio) {
      // Aquí puedes agregar lógica para guardar el nuevo valor de precio
      // Puedes actualizar el formData u otros estados según tus necesidades
      setFormData({ ...formData, precio: Number(newPrecio) });
    }
    setEditingPrecio(false);
  };

  const handlePrecioCancel = () => {
    setEditingPrecio(false);
    setNewPrecio(formData.precio);
  };

  useEffect(() => {
    // Calcula la altura del contenedor cuando el componente se monta
    const contenedor = document.getElementById("ImageContainer");
    if (contenedor) {
      setIsTall(contenedor.offsetHeight > 0);
    }
  }, []);

  return (
    <div className="flex flex-col m-auto min-w-[100%] max-w-full min-h-[100%] max-h-[100%] gap-5 py-5 px-10 border-2 rounded-b-lg">
      <div className="flex flex-row">
        <div
          id="ImageContainer"
          className="flex flex-col items-center w-[40%] border rounded p-2"
        >
          <label
            htmlFor="imageUrl"
            className="text-lg font-semibold text-[#c63d05] uppercase"
          >
            Imagenes
            {selectedImages.length === 0
              ? "Por favor selecciona una imagen"
              : selectedImages.length > 1
              ? "Imagenes seleccionadas"
              : "Imagen seleccionada"}
          </label>
          <Carousel className="flex flex-col">
            {formData?.imageUrl.map((preview, index) => (
              <div key={index}>
                <img src={preview} alt={`Vista previa ${index + 1}`} />
              </div>
            ))}
          </Carousel>
          {selectedImages.length > 0 && (
            <div
              className={`flex flex-col image-preview m-4 ${
                isTall ? "w-[60%]" : "w-[100%]"
              }`}
            >
              {selectedImages.length === 1 ? (
                <img src={imagePreviews[0]} alt="Vista previa" className="" />
              ) : (
                <Carousel className="flex flex-col">
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <img src={preview} alt={`Vista previa ${index + 1}`} />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between w-[50%] mx-auto gap-4 py-5">
          <div className="flex flex-row items-center justify-left my-4">
            <div className="flex items-center gap-2 mr-2">
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                className="hidden"
                onChange={handleImageChange}
                id="imageUrl"
                multiple
              />
              <label
                htmlFor="imageUrl"
                className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-gray-900 transition duration-300"
              >
                Seleccionar Imagen
              </label>
            </div>
          </div>

          <div className="input-wrapper flex flex-col">
            <label
              htmlFor="colorDisposible"
              className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
            >
              Stock del producto
            </label>
            <div className="relative">
              {editingStock ? (
                <>
                  <input
                    type="text"
                    value={newStock}
                    onChange={handleStockChange}
                    className={`border rounded px-3 py-2 w-full ${
                      stockError ? "border-red-500" : ""
                    }`}
                  />
                  {stockError && (
                    <span className="text-red-500">{stockError}</span>
                  )}
                  <div className="flex flex-row w-full m-auto items-center justify-center">
                    <button
                      type="button"
                      disabled={stockError || newStock === ""}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                      onClick={handleStockSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                      onClick={handleStockCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={formData.stock}
                    disabled={true}
                    className={`border rounded px-3 py-2 w-full `}
                  />
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    onClick={() => setEditingStock(true)}
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="input-wrapper flex flex-col">
            <label
              htmlFor="precio"
              className="pl-2 text-lg font-semibold text-[#c63d05] uppercase"
            >
              Precio
            </label>
            <div className="relative">
              {editingPrecio ? (
                <>
                  <input
                    type="number"
                    value={newPrecio}
                    onChange={handlePrecioChange}
                    className={`border rounded px-3 py-2 w-full ${
                      precioError ? "border-red-500" : ""
                    }`}
                  />
                  {precioError && (
                    <span className="text-red-500">{precioError}</span>
                  )}
                  <div className="flex flex-row w-full m-auto items-center justify-center">
                    <button
                      type="button"
                      disabled={precioError || newPrecio === ""}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                      onClick={handlePrecioSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                      onClick={handlePrecioCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.precio}
                    disabled={true}
                    className={`border rounded px-3 py-2 w-full `}
                  />
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    onClick={() => setEditingPrecio(true)}
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center h-full w-full items-end">
            <button
              type="submit"
              onClick={handleSubmiMoto}
              disabled={!isButtonActive}
              className={`mt-4 w-fit h-12 uppercase ${
                !isButtonActive
                  ? "bg-slate-300 text-3xl text-black font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 shadow-[#808080] cursor-not-allowed"
                  : "bg-[#C63D05] text-3xl text-white font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600] cursor-pointer"
              }`}
              //className="w-fit h-12 bg-[#C63D05] text-3xl text-white font-bold px-4 mb-2 rounded-lg shadow-sm duration-300 hover:shadow-sm shadow-[#202020] hover:text-gray-900 hover:bg-[#ff6600] uppercase"
            >
              guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaInventoryManager_Product;
