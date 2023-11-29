import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registrarMatricula } from "../../../redux/actions/Actions"; // Asegúrate de ajustar las importaciones según tus acciones y rutas
import "./Matricula.css";

export const Matricula = () => {
  const dispatch = useDispatch();

  // Definimos un estado para manejar nuestro formulario de estudiante.
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    // Agrega otros campos necesarios para tu estudiante
  });

  // Estado para manejar los errores.
  const [errors, setErrors] = useState({});

  // Estado para manejar la alerta de satisfacción
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  function validateForm(input) {
    let errors = {};

    // Realiza validaciones necesarias para los campos del estudiante
    if (input.nombre == "") errors.nombre = "Coloca un nombre!";
    else if (!/^[A-Za-z ]+$/.test(input.nombre))
      errors.nombre = "Sin caracteres especiales o numeros!";

    if (input.apellido == "") errors.apellido = "Coloca un apellido!";
    else if (!/^[A-Za-z ]+$/.test(input.apellido))
      errors.apellido = "Sin caracteres especiales o numeros!";
    if (input.correo === "") {
      errors.correo = "Ingresa una dirección de correo electrónico";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.correo)) {
      errors.correo = "Ingresa una dirección de correo electrónico válida";
    }

    // Puedes agregar más validaciones según sea necesario

    return errors;
  }

  function handleInputChange(name, value) {
    setForm({ ...form, [name]: value });
    setErrors(validateForm({ ...form, [name]: value }));
  }

  async function createMatricula(e) {
    e.preventDefault();

    // Validación final antes de enviar la solicitud
    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Dispatch para crear un estudiante
      await dispatch(registrarMatricula(form));

      // Limpiar el formulario después de crear un estudiante
      setForm({
        nombre: "",
        apellido: "",
        correo: "",
        // Limpiar otros campos necesarios
      });
      // Mostrar la alerta de satisfacción
      setShowSuccessAlert(true);

      // Ocultar la alerta después de unos segundos
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000); // 2000 milisegundos (2 segundos) - puedes ajustar este valor según tus necesidades
    }
  }

  return (
    <div className="containerForm">
      <Link className="buttonBack" to="/home">
        Volver
      </Link>
      <form className="form">
        {/* Agrega los campos necesarios para el formulario del estudiante */}
        <div className="inputContainer">
          <label>Nombre: </label>
          <input
            placeholder="Ingresa nombre."
            required
            onChange={(e) => {
              handleInputChange("nombre", e.target.value);
            }}
            name="nombre"
            type="text"
            value={form.nombre}
          />
          {errors.nombre && (
            <span style={{ color: "red" }}>{errors.nombre}</span>
          )}

          <label>Apellido: </label>
          <input
            placeholder="Ingresa el apellido."
            required
            onChange={(e) => {
              handleInputChange("apellido", e.target.value);
            }}
            name="apellido"
            type="text"
            value={form.apellido}
          />
          {errors.apellido && (
            <span style={{ color: "red" }}>{errors.apellido}</span>
          )}

          <label>Correo: </label>
          <input
            placeholder="Ingresa el correo."
            required
            onChange={(e) => {
              handleInputChange("correo", e.target.value);
            }}
            name="correo"
            type="email"
            value={form.correo}
          />
          {errors.correo && (
            <span style={{ color: "red" }}>{errors.correo}</span>
          )}
        </div>
        {/* Agrega otros campos del estudiante según sea necesario */}
        <hr />

        {showSuccessAlert && (
          <div className="successAlert">¡Matricula registrada con éxito!</div>
        )}

        <input
          className="sendButton"
          disabled={Object.keys(errors).length !== 0}
          onClick={(e) => {
            createMatricula(e);
          }}
          type="submit"
          value="Registrar"
        />
      </form>
    </div>
  );
};
