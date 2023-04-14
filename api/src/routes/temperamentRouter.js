const { Router } = require('express');
const { getTemperamentData } = require('../controllers/temperamentController.js');

const temperamentRouter = Router();

temperamentRouter.get("/", async (req, res) => {
  try {
    const temperamentData = await getTemperamentData();
    console.log(temperamentData);
    res.status(200).json(temperamentData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = temperamentRouter;