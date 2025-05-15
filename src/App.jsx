import React, { useState } from "react";
import { useEffect } from "react";
import Search from "./components/Search";
import RasenganSpinner from "./components/spinner";
import MovieCard from "./components/movieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

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
  const [trendingMovies, settrendingMovies] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [deBouncedSearchTerm, setdeBouncedSearchTerm] = useState("");
  useDebounce(
    () => {
      setdeBouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
      updateSearchCount();
      setmovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      settrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };
  useEffect(() => {
    fetchMovies(deBouncedSearchTerm);
  }, [deBouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

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
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <br></br>
          <br></br>
          <h2 style={{ textAlign: "center" }}>All Movies</h2>
          {isLoading ? (
            <RasenganSpinner></RasenganSpinner>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
            </ul>
          )}
        </section>{" "}
      </div>
    </main>
  );
};

export default App;
