import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postBreed, getTemperaments } from "../../redux/actions/dogsActions";
import "./Form.css";

export const Form = () => {
  // Traemos temperaments del estado global
  const { temperaments } = useSelector((state) => state.breeds);
  const dispatch = useDispatch();
  //console.log("---->", temperaments);
  // Verificamos que tenemos los temperament, o sino los pedimos.
  if (!temperaments.length) {
    dispatch(getTemperaments());
  }
  // Definimos un estado para manejar nuestro form.
  const [form, setForm] = useState({
    name: ".",
    min_height: ".",
    max_height: ".",
    min_weight: ".",
    max_weight: ".",
    min_life: ".",
    max_life: ".",
  });
  // Agregamos temperamentos al objeto si no existe.
  if (!form.temperaments) setForm({ ...form, temperaments: [] });
  // Estado para manejar los errores.
  const [errors, setErrors] = useState({});
  function validateForm(input) {
    //console.log("------->", input);
    let errors = {};
    // Validamos el name.
    if (input.name == "") errors.name = "Coloca un nombre!";
    else if (!/^[A-Za-z ]+$/.test(input.name))
      errors.name = "Sin caracteres especiales o numeros!";
    // Validamos los height.
    if (input.min_height == "")
      errors.min_height = "Coloca una altura correcta!";
    else if (input.min_height < 15)
      errors.min_height = "Tiene que medir 15cm o mas!";
    if (input.max_height == "")
      errors.max_height = "Coloca una altura correcta!";
    else if (input.max_height > 110)
      errors.max_height = "Tiene que medir 110cm o menos";
    if (parseInt(input.min_height) > parseInt(input.max_height))
      errors.min_height = "El minimo no puede superar al mayor";
    // Validamos los weihgth.
    if (input.min_weight == "") errors.min_weight = "Coloca un peso correcto!";
    else if (parseInt(input.min_weight) < 1)
      errors.min_weight = "Tiene que pesar 1Kg o mas";
    if (input.max_weight == "") errors.max_weight = "Colcoa un peso correcto!";
    else if (parseInt(input.max_weight) > 90)
      errors.max_weight = "Tiene que pesar 90Kg o menos";
    if (parseInt(input.min_weight) > parseInt(input.max_weight))
      errors.min_weight = "El minimo no puede ser menor al mayor";
    // Validamso el life span.
    if (input.min_life == "") errors.min_life = "Coloca un año correcto!";
    else if (input.min_life < 1) errors.min_life = "Tiene que ser mayor a 1 ";
    if (input.max_life == "") errors.max_life = "Coloca un año correcto!";
    else if (input.max_life > 90)
      errors.max_life = "Tiene que vivir 20 o menos";
    if (parseInt(input.min_life) > parseInt(input.max_life))
      errors.min_life = "El maximo no puede ser menor al mayor";
    return errors;
  }
  function verifyImage(url) {
    new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(setForm({ ...form, image: url }));
      img.onerror = () => resolve(delete form.image);
    });
  }
  function handleInputChange(name, value) {
    //console.log(name, value);
    if (isNaN(parseInt(value))) setForm({ ...form, [name]: value });
    else setForm({ ...form, [name]: parseInt(value) });
    setErrors(
      validateForm({
        ...form,
        [name]: [value],
      })
    );
  }
  function handleSelectTemperament(option) {
    setForm({
      ...form,
      temperaments: form.temperaments.includes(option)
        ? form.temperaments
        : [...form.temperaments, option],
    });
  }
  function handleDeleteTemperament(option) {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((value) => value != option),
    });
  }
  async function createBreed(e) {
    e.preventDefault();
    await dispatch(postBreed(form)); // Assuming postBreed is asynchronous
    window.location.href = "/home"; // Use window.location.href to navigate
  }

  // console.log(Object.entries(errors).length);
  return (
    <div className="containerForm">
      <Link className="buttonBack" to="/home">
        Volver
      </Link>
      <form className="form">
        <div className="inputContainer">
          <label>Name:</label>
          <input
            placeholder="Breed name."
            required
            onChange={(e) => {
              handleInputChange(e.target.name, e.target.value);
            }}
            name="name"
            type="text"
          />
          {errors.name ? (
            <span style={{ color: "red" }}>{errors.name}</span>
          ) : null}
        </div>
        <hr />
        <div className="inputContainer">
          <label>Height:</label>
          <div className="inputFlex">
            <input
              placeholder="Min height."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="min_height"
              min="1"
            />
            <input
              placeholder="Max height."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="max_height"
              min="1"
            />
          </div>
          <span style={{ color: "red" }}>{errors.min_height}</span>
          <span style={{ color: "red" }}>{errors.max_height}</span>
        </div>
        <hr />
        <div className="inputContainer">
          <label>Weight:</label>
          <div className="inputFlex">
            <input
              placeholder="Min weight."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="min_weight"
            />
            <input
              placeholder="Max weight."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="max_weight"
            />
          </div>
          <span style={{ color: "red" }}>{errors.min_weight}</span>
          <span style={{ color: "red" }}>{errors.max_weight}</span>
        </div>
        <hr />
        <div className="inputContainer">
          <label>Life Span:</label>
          <div className="inputFlex">
            <input
              placeholder="Min life."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="min_life"
            />
            <input
              placeholder="Max life."
              required
              onChange={(e) => {
                handleInputChange(e.target.name, e.target.value);
              }}
              type="number"
              name="max_life"
            />
          </div>
          <span style={{ color: "red" }}>{errors.min_life}</span>
          <span style={{ color: "red" }}>{errors.max_life}</span>
        </div>
        <hr />
        <div className="inputContainer">
          <label>Image:</label>
          <input
            placeholder="https://url.com/image.jpg"
            required
            onChange={(e) => {
              verifyImage(e.target.value);
            }}
            type="text"
          />
        </div>
        <hr />
        <div className="selectBox">
          <select
            defaultValue={"DEFAULT"}
            required
            onChange={(e) => {
              handleSelectTemperament(e.target.value);
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
        <div className="list">
          <ul className="listUl">
            {form.temperaments &&
              form.temperaments.map((option, index) => (
                <div className="listButton">
                  <li className="listLi" key={index}>
                    {option}
                    <button
                      className="listButtonTemp"
                      onClick={() => handleDeleteTemperament(option)}
                    >
                      X
                    </button>
                  </li>
                </div>
              ))}
          </ul>
        </div>
        <input
          className="sendButton"
          disabled={
            Object.entries(errors).length != 0 ||
            form.name == "." ||
            form.min_height == "." ||
            form.max_height == "." ||
            form.min_weight == "." ||
            form.max_weight == "." ||
            form.min_life == "." ||
            form.max_life == "."
          }
          onClick={(e) => {
            createBreed(e);
          }}
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};
