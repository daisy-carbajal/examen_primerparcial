const { response } = require("express");

const Libro = require("../models/libro.model");

const getLibros = async (req, res) => {
  const libros = await Libro.find(
    {},
    'nombreLibro autor stock usuario editoral'
  );

  res.status(200).json({
    status: "success",
    libros
  });
};

const postLibros = async (req, res = response) => {
  const {
    nombreLibro,
    autor,
    stock,
    usuario,
    editorial
  } = req.body;

  try {
    const existLibro = await Libro.findOne({ nombreLibro });
    if (existLibro) {
      return res.status(400).json({
        status: "error",
        message: "Libro ya existe",
      });
    }

    const libro = new Libro(req.body);

    await libro.save();

    res.status(200).json({
      status: "success",
      libro,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateLibro = async (req, res = response) => {
  const libroId = req.params.id;

  try {
    const libroDB = await Libro.findById(libroId);

    if (!libroDB) {
      return res.status(400).json({
        status: "error",
        message: "Libro no encontrado",
      });
    }

    const newInformation = req.body;

    if (libroDB.nombreLibro === req.body.nombreLibro) {
      delete newInformation.nombreLibro;
    } else {
      const existNombreLibro = await Libro.findOne({
        nombreLibro: req.body.nombreLibro,
      });
      if (existNombreLibro) {
        return res.status(400).json({
          status: "error",
          message: "Libro ya existe",
        });
      }
    }

    const libroUpdated = await Libro.findByIdAndUpdate(
      libroId,
      newInformation,
      { new: true }
    );

    res.json({
      status: "success",
      msg: 'Libro actualizado',
      libro: libroUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: 'Error no esperado'
    });
  }
};

const deleteLibro = async (req, res = response) => {
  const libroId = req.params.id;

  try {
    const libroDB = await Libro.findById(libroId);
    if (!libroDB) {
      return res.status(400).json({
        status: "error",
        message: "Libro no Encontrado",
      });
    }
    await Libro.findByIdAndDelete(libroId);

    res.json({
      status: "success",
      message: "Libro Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error no esperado",
    });
  }
};

module.exports = {
    getLibros,
    postLibros,
    updateLibro,
    deleteLibro
}