const { Moto, Color, MotoColor } = require('./models'); // Asegúrate de importar tus modelos correctamente

// Controlador para cargar motos con colores
async function getAllColors(req, res) {
  try {
    const motosConColores = await Moto.findAll({
      include: [
        {
          model: MotoColor, // Modelo de la tabla intermedia (moto_color)
          include: [Color], // Incluye el modelo Color dentro de la tabla intermedia
          attributes: ['stock'], // Puedes seleccionar las columnas que deseas mostrar
        },
      ],
    });

    res.json(motosConColores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener motos con colores.' });
  }
}

module.exports = { getAllColors };
