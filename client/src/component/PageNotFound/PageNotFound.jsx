import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFound">
        {/* <div className="notFoundImg">
                    <img src="" alt="" />
                </div> */}
        <div className="notFoundMessage">
          <h1>404</h1>
          <h2>Page not found</h2>
          <div className="notFoundButton">
            <Link to="/home">
              <button>Back to home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
