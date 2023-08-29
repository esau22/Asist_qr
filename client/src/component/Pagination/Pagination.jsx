import React from "react";
import "./Pagination.css";

export const Pagination = ({ breedsPerPage, breeds, pagination }) => {
  // Recibo los parametros y la funcion para setear el paginado.
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(breeds / breedsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginationNav">
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number, index) => {
            return (
              <li className="element" key={number}>
                <a
                  id={index + 1}
                  className="elementLink"
                  onClick={() => pagination(number)}
                >
                  {number}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
