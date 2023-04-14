const { Router } = require("express");
const {
  getAllData,
  getBreedById,
  createBreed,
  deleteBreed,
} = require("../controllers/dogsControllers.js");

const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let dogsData = await getAllData(name);
    res.status(200).json(dogsData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const breed = await getBreedById(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.post("/", async (req, res) => {
  const {
    image,
    name,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    life_span,
    temperaments,
  } = req.body;

  try {
    if (
      !image ||
      !name ||
      !heightMin ||
      !heightMax ||
      !weightMin ||
      !weightMax ||
      !life_span
    ) {
      res.status(400).json({ error: "Faltan datos" });
    } else {
      const newBreed = await createBreed({
        image,
        name,
        weightMin,
        weightMax,
        heightMin,
        heightMax,
        life_span,
        temperaments,
      });
      res.status(200).json(newBreed);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDog = await deleteBreed(id);
    res.status(200).json({ msg: "eliminación exitosa" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = dogsRouter;
