const axios = require('axios');
const dotenv = require('dotenv').config();
const { Dog, Temperament} = require('../db.js');

const { URL_BASE, API_KEY } = process.env;

const getTemperamentData = async () => {
  
  try {
    //* Obtener temperamentos de la DB
    const temperamentsDb = await Temperament.findAll();
    if (temperamentsDb.length) {
      return [ ...temperamentsDb].sort();
    } else {
      //*obtener Temperament de la Api
      
      var temperaments = [];
      const { data } = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
      data.map((raza) => {
        let temperament = raza.hasOwnProperty("temperament") ? raza.temperament.split(",") : [];
        const arreglo = temperament.map((arr) => arr.trim());
        temperaments = [ ...temperaments, ...arreglo];
      });
      
      const temp = new Set([ ...temperaments]);
      const sort = [ ...temp].sort();
      
      const bulk = sort.map((tmp) => {
        return { name: tmp}
      });

      const insertTemperaments = await Temperament.bulkCreate(bulk);
      return insertTemperaments;
      
    }
  } catch (error) {
    throw Error('Hay algun problema');
  }
}

module.exports = {
  getTemperamentData
};