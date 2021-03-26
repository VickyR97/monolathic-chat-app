import React, { useState } from "react";

import "./join.css";
import { Link } from "react-router-dom";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState({});

  const handleError = (e) => {
    e.preventDefault();
    setError({ error: "All fields are required." });
  };

  return (
    <div className="main-container">
      <div className="row d-flex justify-content-center aliign-items-center mt-5 px-3">
        <div className="col-12 col-md-6 p-3">
          <h1 className="text-center font-weight-bold">Join</h1>
          <hr className="border border-dark"></hr>
          {error.error && (
            <div class="alert alert-danger text-center" role="alert">
              {error.error}
            </div>
          )}
          <form className="mt-4">
            <div className="form-group">
              <input
                onChange={(e) => {
                  setError({});
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => {
                  setError({});
                  setRoom(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Enter room"
              />
            </div>
            <Link
              onClick={(e) => (!name || !room ? handleError(e) : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
              <button className="btn btn-block btn-primary font-weight-bold">
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;
