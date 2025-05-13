import React, { useState } from "react";
import { useEffect } from "react";
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const fetchMovies = async () => {
   setisLoading(true)
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
       setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }
  };
  useEffect(() => {
    fetchMovies();
  });

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img style={{ paddingBottom: "5%" }} src="./logo.jpg"></img>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></Search>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>{" "}
      </div>
    </main>
  );
};

export default App;
