import {useEffect, useState, useRef} from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";

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
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error} = useMovies(query, handleCloseMovie);

    const [watched, setWatched] = useState(function () {
        const storedValue = localStorage.getItem("watched");
        return JSON.parse(storedValue);
    });

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
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);

        // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    }

    useEffect(function () {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched])

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
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    { /* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {
                        selectedId ?
                            <MovieDetails
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            /> :
                            <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMovieList
                                    watched={watched}
                                    onDeleteWatched={handleDeleteWatched}
                                />
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

function ErrorMessage({message}) {
    return (
        <p className="error">
            <span>⛔️</span> {message}
        </p>
    );
}

function NavBar({children}) {
    return (
        <nav className="nav-bar">
            <Logo/>
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

function NumResults({movies}) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Search({query, setQuery}) {
    /*
    useEffect(function() {
        const el = document.querySelector(".search");
        console.log(el);
        // <input class="search" type="text" placeholder="Search movies..." value>
        el.focus();
    }, []);
    */
    const inputEl = useRef(null);

    useEffect(function () {
        // console.log(inputEl.current);
        // <input class="search" type="text" placeholder="Search movies..." value>

        function callback(e) {
            if (document.activeElement === inputEl.current) return;

            if (e.code === "Enter") {
                inputEl.current.focus();
                setQuery("");
            }
        }

        document.addEventListener("keydown", callback);

        return () => document.addEventListener("keydown", callback);
    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}

function Main({children}) {
    return <main className="main">
        {children}
    </main>
}

function Box({children}) {
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

function MovieList({movies, onSelectMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
            ))}
        </ul>
    );
}

function Movie({movie, onSelectMovie}) {
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

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    // Check states including `countRatingDecisions` in `hooks` of `App` in the `Components` tab of the React Developer Tools
    useEffect(function () {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating]);

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    // [1] Inside conditionals
    // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

    // [2] After an early return. Cannot guarantee all the hooks are always in the same order
    // if (imdbRating > 8) return <p>Greatest ever!</p>

    // [3] Only look at the initial state on the initial render. So when the component first mounts
    /*
    const [isTop, setIsTop] = useState(imdbRating > 8);
    console.log(isTop);
    // false
    // Fix with `useEffect`
    useEffect(function() {
        setIsTop(imdbRating > 8);
    }, [imdbRating]);
    */
    // Just use `const`
    const isTop = imdbRating > 8;
    console.log(isTop);
    // true

    // const [avgRating, setAvgRating] = useState(0);

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current
        }
        onAddWatched(newWatchedMovie);
        onCloseMovie();

        // [1] Update asynchronously
        // setAvgRating(Number(imdbRating));
        // console.log(avgRating);
        // 0
        // Stale state, wrong average
        // setAvgRating((avgRating + userRating) / 2);
        // [2] Fix with a callback function
        // setAvgRating((avgRating) => (avgRating + userRating) / 2);
    }

    useEffect(function () {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovie();
                console.log("Closing.")
            }
        }

        document.addEventListener("keydown", callback);

        return function () {
            document.removeEventListener("keydown", callback);
        }
    }, [onCloseMovie]);

    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);

            // console.log(data);
            /*
            {Title: 'Interstellar', Year: '2014', Rated: 'PG-13', Released: '07 Nov 2014', Runtime: '169 min', ...}
                Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain"
                Awards: "Won 1 Oscar. 44 wins & 148 nominations total"
                BoxOffice: "$188,020,017"
                Country: "United States, United Kingdom, Canada"
                DVD: "24 May 2016"
                Director: "Christopher Nolan"
                Genre: "Adventure, Drama, Sci-Fi"
                Language: "English"
                Metascore: "74"
                Plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."
                Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
                Production: "N/A"
                Rated: "PG-13"
                Ratings: (3) [{…}, {…}, {…}]
                Released: "07 Nov 2014"
                Response: "True"
                Runtime: "169 min"
                Title: "Interstellar"
                Type: "movie"
                Website: "N/A"
                Writer: "Jonathan Nolan, Christopher Nolan"
                Year: "2014"
                imdbID: "tt0816692"
                imdbRating: "8.7"
                imdbVotes: "2,071,776"
                [[Prototype]]: Object
            */
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(function () {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function () {
            document.title = "React Movie Reviews";
            // A closure means a function will always remember all the variables that were present at the time and the place that function was created
            console.log(`Cleanup Effect for Movie ${title}.`)
        };
    }, [title]);

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    { /* <p>{avgRating}</p> */}

                    <section>
                        <div className="rating">
                            {
                                !isWatched ?
                                    <>
                                        <StarRating
                                            maxRating={10}
                                            size={24}
                                            onSetRating={setUserRating}
                                        />
                                        {
                                            userRating > 0 &&
                                            <button className="btn-add" onClick={handleAdd}>+ Add to List</button>
                                        }
                                    </>
                                    :
                                    <p>You Rated this Movie {watchedUserRating}</p>
                            }
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director} <span>⭐️</span></p>
                    </section>
                </>
            }
            { /*selectedId */}
        </div>
    );
}

function WatchedSummary({watched}) {
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
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMovieList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
}

function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
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
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}