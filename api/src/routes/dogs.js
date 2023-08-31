const axios = require("axios");
const app = require("express").Router();
const { Dog, Temperament } = require("../db");
require("dotenv").config();
const { DOGS_API_KEY } = process.env;
const apiLink = `https://api.thedogapi.com/v1/breeds?api_key=${DOGS_API_KEY}`;
/**
 * Globals.
 */
let allTemperamentsArray = [];
let temperamentsInObjet = [];
let auxArray = [];
// Datos de la api.
const getFromApi = async () => {
  const apiData = await axios.get(apiLink);
  /**
   * Filtrado de datos:
   */
  const dogsFromApi = apiData.data.map((element) => {
    // Traemos todos los temperaments, y los separamos en un array.
    let temperamentsArray = [];
    if (element.temperament) {
      temperamentsArray = element.temperament.split(", ");
      // Vamos guardando los temperamentos y filtrandolos.
      auxArray = allTemperamentsArray;
      auxArray = [...auxArray, ...temperamentsArray];
      auxArray = new Set(auxArray); // Nos permite guardar un arreglo sin elementos repetidos.
      allTemperamentsArray = [...auxArray];
    }
    // Devolvemos nuestro objeto.
    return {
      id: element.id,
      name: element.name,
      height: element.height.metric.split(" - "),
      weight: element.weight.metric.split(" - "),
      life_span: element.life_span.replace(" years", "").split(" - "),
      image: element.image.url,
      temperaments: temperamentsArray,
    };
  });
  // Creamos la base de datos con los temperaments.
  for (let temperament of auxArray) {
    temperamentsInObjet.push({ name: temperament }); //Forma de la base de datos.
  }
  // Limpiamos auxArray.
  auxArray = [];
  // Antes de insertar en la base de datos verificamos que ya no se hayan cargado.
  const seeTemperaments = await Temperament.findAll();
  console.log(seeTemperaments.length);
  if (!seeTemperaments.length) {
    // Insersion en masa de los temperaments.
    await Temperament.bulkCreate(temperamentsInObjet);
  }
  return dogsFromApi;
};

// Datos de la Data base.
const getFromDb = async () => {
  const dbInfo = await Dog.findAll({
    // Buscamos las razas creadas con sus temperamentos asociados.
    include: {
      model: Temperament,
      attributes: ["name"], // Los atributos que quiero traer del modelo Temperament.
      through: {
        attributes: [], // Trae solo los elementos de attributes.
      },
    },
  });
  const dogsFromDb = dbInfo.map((element) => {
    // Filtramos los datos de la Db.
    return {
      id: element.id,
      name: element.name,
      height: element.height,
      weight: element.weight,
      life_span: element.life_span,
      image: element.image,
      // Como tenemnos un objeto, traemos solo los name y lo devolvemos en un arreglo.
      temperaments: element.temperaments.map((temperament) => temperament.name),
    };
  });
  return dogsFromDb;
};
// Combine breeds from Api and Db.
const getAllDogs = async () => {
  const dogFromApi = await getFromApi();
  const dogFromDb = await getFromDb();
  const allDogsMixed = [...dogFromDb, ...dogFromApi];
  return allDogsMixed;
};
app.get("/dogs", async (req, res) => {
  try {
    // Buscar por nombre de raza.
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (!name) return res.status(200).send(allDogs);
    // Buscamos los que coincidan pro nombre.
    const dogsByName = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    // Verificamos respuesta de array vacio.
    dogsByName.length
      ? res.status(200).send(dogsByName)
      : res.status(404).send("Breed not found");
  } catch (error) {
    res.status(400).send("Error en el servidor");
  }
});
app.get("/dogs/:idDog", async (req, res) => {
  try {
    // Buscar por id de raza.
    const { idDog } = req.params;
    const allDogs = await getAllDogs();
    const dogById = allDogs.filter((dog) => dog.id == idDog);
    dogById.length
      ? res.status(200).send(dogById)
      : res.status(404).send("Breed not found");
  } catch (error) {
    res.status(400).send("Error en el servidor");
  }
});
app.get("/api", async (req, res) => {
  const allDogs = await getFromApi();
  // const allBreeds = await getFromDb();
  // console.log(allTemperamentsArray);
  // console.log(auxArray);
  res.status(200).send(allDogs);
  // res.status(200).send(allTemperamentsArray);
});
app.get("/db", async (req, res) => {
  // const allBreeds = await getFromApi();
  const allBreeds = await getFromDb();
  // console.log(allTemperamentsArray);
  // console.log(auxArray);
  res.status(200).send(allBreeds);
  // res.status(200).send(allTemperamentsArray);
});
app.get("/temperaments", async (req, res) => {
  try {
    if (!allTemperamentsArray.length) await getFromApi();
    const allTemperamentsForDb = await Temperament.findAll();
    res.status(200).send(allTemperamentsForDb);
  } catch (error) {
    res.status(400).send("Error en el servidor");
  }
});
app.post("/dog", async (req, res) => {
  // console.log(req.body);
  try {
    let {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_life,
      max_life,
      temperaments,
      image,
    } = req.body;
    if (
      !name ||
      !/^[A-Za-z ]+$/.test(name) ||
      !min_height ||
      min_height < 15 ||
      !/^[0-9]+$/.test(min_height) ||
      !max_height ||
      max_height > 110 ||
      !/^[0-9]+$/.test(max_height) ||
      min_height > max_height ||
      !min_weight ||
      min_weight < 1 ||
      !/^[0-9]+$/.test(min_weight) ||
      !max_weight ||
      max_weight > 90 ||
      !/^[0-9]+$/.test(max_weight) ||
      min_weight > max_weight ||
      !min_life ||
      min_life < 1 ||
      !/^[0-9]+$/.test(min_life) ||
      !max_life ||
      max_life > 20 ||
      !/^[0-9]+$/.test(max_life) ||
      min_life > max_life ||
      temperaments.length == 0
    )
      throw new Error("Manda bien los datos");
    // Unimos las alturas.
    const mixedHeight = [];
    mixedHeight.push(min_height, max_height);
    // Unimos las anchuras.
    const mixedWeight = [];
    mixedWeight.push(min_weight, max_weight);
    // Unimos el tiempo de vida.
    const mixedLife = [];
    mixedLife.push(min_life, max_life);
    // Creamos nuestro modelo.
    let newDog = await Dog.create({
      name,
      height: mixedHeight,
      weight: mixedWeight,
      life_span: mixedLife,
      image,
    });
    console.log(temperaments);
    // Buscamos los temperamentos en la db.
    temperaments.map(async (temperament) => {
      const associateTemperament = await Temperament.findAll({
        where: { name: temperament },
      });
      // Lo asociamos con la raza creada.
      await newDog.addTemperament(associateTemperament);
    });
    // console.log(newBreed);
    res.status(200).send(newDog);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = app;
