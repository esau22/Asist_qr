import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Importamos nuestras acciones.
import {
  getBreeds,
  getTemperaments,
  filterByTemperaments,
  filterByOrigin,
  filterByName,
  filterByWeight,
  searchByName,
  clearBreedDetail,
} from "../../redux/actions/dogsActions";
import { Pagination } from "../Pagination/Pagination";
import { Card } from "../Card/Card";
import "./Home.css";

export const Home = () => {
  // Traemos el stado global.
  const { breedsForFilter, temperaments } = useSelector(
    (state) => state.breeds
  );

  const dispatch = useDispatch();
  /**
   * Traemos las breeds cuando se monta el componente.
   */
  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
    dispatch(clearBreedDetail());
  }, []);

  // Usamos nuestro loader.
  const { display } = useSelector((state) => state.loader);
  /**
   * PAGINADO:
   * Empezamos definicendo los estados locales.
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage] = useState(8);
  // Para poder ir cortanto por partes el pagiando definimos los indices.
  const indexOfLastBreed = currentPage * breedsPerPage; // 8 - 16
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; // 0 - 8
  // Guardamos los breeds de indice a indice
  const currentBreeds = breedsForFilter.slice(
    indexOfFirstBreed,
    indexOfLastBreed
  );

  // Traemos todos los elementos renderizados de html
  useEffect(() => {
    const htmlCurrentPage = document.getElementsByClassName("elementLink");
    for (let page of htmlCurrentPage) {
      // console.log(`${currentPage} === ${page.id}`);
      if (currentPage == page.id) {
        page.className = "elementLink activePage";
      } else {
        page.className = "elementLink";
      }
    }
  }, [currentPage, dispatch, display]);

  // Definimos una funcion que modifique mi estado local.
  const pagination = (number) => {
    setCurrentPage(number);
  };

  // Reseteamos los valores en breeds.
  const handleClickReset = (e) => {
    e.preventDefault();
    dispatch(getBreeds());
  };

  // Filtro por temperaments.
  const handleFilterTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
  };
  // Filtro por origin.
  const handleFilterOrigin = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setCurrentPage(1);
  };
  // Filtro por names.
  const handleFilterName = (e) => {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setCurrentPage(1);
  };
  // Filtro por weight.
  const handleFilterWeight = (e) => {
    e.preventDefault();
    dispatch(filterByWeight(e.target.value));
    setCurrentPage(1);
  };

  const handleInputSearch = (e) => {
    dispatch(searchByName(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="homeContainer">
      <div className="filters">
        <div className="resetButton">
          <button
            onClick={(e) => {
              handleClickReset(e);
            }}
          >
            Reset
          </button>
        </div>
        <div className="selectBox">
          <select
            defaultValue={"DEFAULT"}
            className="selects"
            onChange={(e) => {
              handleFilterTemperament(e);
            }}
          >
            <option disabled value="DEFAULT">
              Temperaments
            </option>
            {temperaments &&
              temperaments.map((option) => {
                return (
                  <option value={option.name} key={option.id}>
                    {option.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="selectBox">
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => {
              handleFilterOrigin(e);
            }}
          >
            <option disabled value="DEFAULT">
              Origin
            </option>
            <option value="all">All</option>
            <option value="db">DataBase</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="selectBox">
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => {
              handleFilterName(e);
            }}
          >
            <option disabled value="DEFAULT">
              Alphabetical Order
            </option>
            <option value="upward">[A-Z]Ascendente</option>
            <option value="falling">[z-A]Descendente</option>
          </select>
        </div>
        <div className="selectBox">
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => {
              handleFilterWeight(e);
            }}
          >
            <option disabled value="DEFAULT">
              Weight
            </option>
            <option value="minor">Menor a Mayor</option>
            <option value="major">Mayor a Menor</option>
          </select>
        </div>
        <div className="searchContainer">
          <form className="searchBar">
            <input
              onChange={(e) => handleInputSearch(e)}
              type="text"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      <div className="cardsContainer">
        <div className="cards">
          {currentBreeds &&
            currentBreeds.map((breed) => {
              return (
                <Link className="" to={"/home/" + breed.id} key={breed.id}>
                  <Card
                    id={breed.id}
                    name={breed.name}
                    temperaments={breed.temperaments}
                    weight={breed.weight}
                    image={breed.image}
                  ></Card>
                </Link>
              );
            })}
        </div>
        <Pagination
          breedsPerPage={breedsPerPage}
          breeds={breedsForFilter.length}
          pagination={pagination}
        ></Pagination>
      </div>
    </div>
  );
};
