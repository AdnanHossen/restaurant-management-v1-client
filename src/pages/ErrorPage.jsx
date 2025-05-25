import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        flexDirection: "column",
      }}
    >
      <img
        src="https://www.svgrepo.com/show/266944/error.svg"
        alt="Error"
        style={{
          width: "100%",
          maxWidth: "200px",
          marginBottom: "20px",
        }}
      />
      <h1 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
        The page you are looking for does not exist or an error occurred.
      </p>
      <Link
        to={"/"}
        style={{ color: "#007BFF", textDecoration: "none", fontSize: "1rem" }}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
