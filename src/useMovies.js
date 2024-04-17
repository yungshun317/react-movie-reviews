import {useEffect, useState} from "react";

const API_KEY = "47335132";

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function () {
        callback?.();

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${query}`, {signal: controller.signal});
                if (!res.ok) throw new Error("Something went wrong with fetching movies!");

                const data = await res.json();
                if (data.Response === "False") throw new Error("Movie not found!");

                // If there is no movie returned, see how `res.json()` looks like
                // console.log(data);
                // {Response: 'False', Error: 'Movie not found!'}

                setMovies(data.Search);
                setError("");

                // console.log(movies);
                // []
                // Because the function is asynchronous, we get the stale state (empty array)
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err.message);
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (!query.length) {
            setMovies([]);
            setError("");
            return;
        }

        // handleCloseMovie();
        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query]);

    return {movies, isLoading, error};
}