const { Dog, Temperament } = require("../db.js");
const axios = require("axios");
const dotenv = require("dotenv").config();

const { URL_BASE, API_KEY } = process.env;

const getApiData = async () => {
  const { data } = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);

  try {
    return await data.map((raza) => {
      let [weightMin, weightMax] = raza.weight.metric.split("-");
      let [heightMin, heightMax] = raza.height.metric.split("-");
      let temperament = raza.hasOwnProperty("temperament")
        ? raza.temperament.split(/\s*(?:,|$)\s*/)
        : "";
      resultado = {
        id: raza.id,
        image: raza.image.url,
        name: raza.name,
        weightMin: Number(weightMin),
        weightMax: Number(weightMax),
        heightMin: Number(heightMin),
        heightMax: Number(heightMax),
        life_span: raza.life_span,
        temperament: temperament,
      };
      return resultado;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDbData = async () => {
  const dogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  if (dogs.length) {
    const dbData = await dogs.map((dog) => {
      const tempArray = dog.temperaments.map((tmp) => tmp.name);
      reg = dog.dataValues;
      data = {
        id: reg.id,
        image: reg.image,
        name: reg.name,
        weightMin: reg.weightMin,
        weightMax: reg.weightMax,
        heightMin: reg.heightMin,
        heightMax: reg.heightMax,
        temperament: tempArray,
      };
      return data;
    });
    return dbData;
  } else {
    return [];
  }
};

const getAllData = async (name) => {
  const apiData = await getApiData();
  const dbData = await getDbData();
  const allData = [...apiData, ...dbData];
  allData.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return name
    ? allData.filter((data) => {
        return data.name.toLowerCase().search(name.toLowerCase()) >= 0;
      })
    : allData;
};

const getBreedById = async (id) => {
  const data = await getAllData();
  const raza = data.find((dog) => dog.id.toString() === id.toString());
  if (raza) {
    return raza;
  } else {
    console.log("getBreedById", error.message);
    throw new Error("No existe la raza con ese ID");
  }
};

const createBreed = async ({
  image,
  name,
  weightMin,
  weightMax,
  heightMin,
  heightMax,
  life_span,
  temperaments,
}) => {
  const newBreed = await Dog.create({
    image,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
  });
  temperaments.length
    ? temperaments.map(async (name) => {
        const temperament = await Temperament.findOne({
          attributes: ["id"],
          where: { name },
        });
        await newBreed.addTemperament(temperament.id);
      })
    : [];
  return newBreed;
};

const deleteBreed = async (id) => {
  const deletedItem = await Dog.findByPk(id);
  const aux = { ...deletedItem };
  await deletedItem.destroy();
  return aux;
};

module.exports = {
  getAllData,
  getBreedById,
  createBreed,
  deleteBreed,
};
