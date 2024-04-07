import {useEffect, useState} from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "47335132";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*
  // Synchronize with no variable at all, not executed as re-render
  useEffect(function() {
      console.log("After initial render.");
  }, []);

  // No dependency array, synchronize with everything
  useEffect(function() {
      console.log("After every render.");
  });

  useEffect(function() {
      console.log("Query just changes.");
  }, [query]);

  console.log("During render.");
  // [1] Render
  // During render.
  // After initial render.
  // After every render.
  // [2] Re-render
  // During render.
  // After every render.
  // Query just changes.
  */

  function handleSelectMovie(id) {
      setSelectedId(id);
  }

  useEffect(function() {
      async function fetchMovies() {
          try {
              setIsLoading(true);
              setError("");

              const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${query}`);
              if (!res.ok) throw new Error("Something went wrong with fetching movies!");

              const data = await res.json();
              if (data.Response === "False") throw new Error("Movie not found!");

              // If there is no movie returned, see how `res.json()` looks like
              // console.log(data);
              // {Response: 'False', Error: 'Movie not found!'}

              setMovies(data.Search);

              // console.log(movies);
              // []
              // Because the function is asynchronous, we get the stale state (empty array)
          } catch (err) {
              console.error(err.message);
              setError(err.message);
          } finally {
              setIsLoading(false);
          }
      }

      if (!query.length) {
          setMovies([]);
          setError("");
          return;
      }

      fetchMovies();
  }, [query]);
  /*
  console.log(data.Search);
  (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    0: {Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MD…WIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'}
    1: {Title: 'The Science of Interstellar', Year: '2015', imdbID: 'tt4415360', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDFhNzU4MT…WU4OTkzXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg'}
    2: {Title: 'Interstellar Wars', Year: '2016', imdbID: 'tt5083736', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMzE5MmExYz…2ltYWdlXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg'}
    3: {Title: 'Lolita from Interstellar Space', Year: '2014', imdbID: 'tt3506492', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNDI1MmJmYW…WQ1YmIyXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg'}
    4: {Title: "Interstellar: Nolan's Odyssey", Year: '2014', imdbID: 'tt4172224', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNjc4ZjkyZm…zliYmIwXkEyXkFqcGdeQXVyMjc5MDg0NDc@._V1_SX300.jpg'}
    5: {Title: 'Interstellar Civil War: Shadows of the Empire', Year: '2017', imdbID: 'tt5056352', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDJmYjQ4Ym…WJkZjk2XkEyXkFqcGdeQXVyMzM1MjQzNTk@._V1_SX300.jpg'}
    6: {Title: "Inside 'Interstellar'", Year: '2015', imdbID: 'tt5297406', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYzNhZjBmNm…2ltYWdlXkEyXkFqcGdeQXVyNjE0OTE2MDY@._V1_SX300.jpg'}
    7: {Title: 'Transformers: Interstellar', Year: '2014–2015', imdbID: 'tt6046050', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMGYxMmM0ZW…jlkMWY4XkEyXkFqcGdeQXVyNTY3NjQzNjM@._V1_SX300.jpg'}
    8: {Title: 'Interstellar', Year: '2005', imdbID: 'tt0758429', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTgyNzUyMTQ3OV5BMl5BanBnXkFtZTgwNDg0OTE2MzE@._V1_SX300.jpg'}
    9: {Title: 'Interstellar Ranger Commence', Year: '2022–', imdbID: 'tt11236038', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMjk4MWQyZj…zQzMmJmXkEyXkFqcGdeQXVyOTgwMDkwNzY@._V1_SX300.jpg'}
    length: 10
    [[Prototype]]: Array(0)
  */

  return (
      <>
        <NavBar>
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
        </NavBar>
        <Main>
            <Box>
                { /* {isLoading ? <Loader /> : <MovieList movies={movies} />} */ }
                {isLoading && <Loader />}
                {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
                {error && <ErrorMessage message={error} />}
            </Box>
            <Box>
                {
                    selectedId ?
                        <MovieDetails selectedId={selectedId} /> :
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList watched={watched} />
                        </>
                }
            </Box>
            {
                /*
                <Box element={<MovieList movies={movies} />} />
                <Box element={
                    <>
                        <WatchedSummary watched={watched} />
                        <WatchedMovieList watched={watched} />
                    </>
                } />
                */
            }
        </Main>
      </>
  );
}

function Loader() {
    return (
        <p className="loader">Loading...</p>
    );
}

function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>⛔️</span> {message}
        </p>
    );
}

function NavBar({ children }) {
    return (
        <nav className="nav-bar">
          <Logo />
          {children}
      </nav>
  );
}

function Logo() {
  return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
  );
}

function NumResults({ movies }) {
  return (
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
  );
}

function Search({ query, setQuery }) {
  return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
  );
}

function Main({ children }) {
  return <main className="main">
      {children}
  </main>
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>

            {isOpen && children}
        </div>
    );
}

function MovieList({ movies, onSelectMovie }) {
  return (
      <ul className="list list-movies">
        {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
        ))}
      </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
      <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
  );
}

function MovieDetails({ selectedId }) {
    return (
        <div className="details">{selectedId}</div>
    );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
      <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </li>
  );
}