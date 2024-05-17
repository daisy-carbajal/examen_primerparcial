const { Router } = require("express");
const { check } = require("express-validator");
const {
  getLibros,
  postLibros,
  updateLibro,
  deleteLibro,
} = require("../controllers/libro.controller");
const router = Router();

router.get("/", getLibros);

router.post(
  "/",
  [
    check("nombreLibro", "El nombreLibro es obligatorio").not().isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("editorial", "La editorial es obligatoria").not().isEmpty(),
  ],
  postLibros
);

router.put(
  "/:id",
  [
    check("nombreLibro", "El nombreLibro es obligatorio").not().isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("editorial", "La editorial es obligatoria").not().isEmpty(),
  ],
  updateLibro
);

router.delete("/:id", deleteLibro);

module.exports = router;
