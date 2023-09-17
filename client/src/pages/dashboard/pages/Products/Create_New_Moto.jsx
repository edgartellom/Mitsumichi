import React, { useState } from "react";

const Create_New_Moto = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="min-h-full bg-slate-100 p-4">
      <div className="tabs min-h-full">
        <button
          className={`mr-2 ${activeTab === 1 ? "active-tab bg-green-500" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Información Básica
        </button>

        <button
          className={`mr-2 ${activeTab === 2 ? "active-tab bg-red-500" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          Imágenes, Colores y Stock
        </button>

        <button
          className={`mr-2 ${activeTab === 3 ? "active-tab bg-blue-500" : ""}`}
          onClick={() => handleTabChange(3)}
        >
          Ficha Técnica
        </button>
      </div>

      <div className="tab-content min-h-full">
        {activeTab === 1 && (
          /* Contenido de la pestaña 1 (Información Básica) */
          /* Aquí coloca el formulario de información básica */
          <div className="bg-red-500">hola</div>
        )}

        {activeTab === 2 && (
          /* Contenido de la pestaña 2 (Imágenes, Colores y Stock) */
          /* Aquí coloca el formulario de imágenes, colores y stock */
          <div></div>
        )}

        {activeTab === 3 && (
          /* Contenido de la pestaña 3 (Ficha Técnica) */
          /* Aquí coloca el formulario de ficha técnica */
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Create_New_Moto;
