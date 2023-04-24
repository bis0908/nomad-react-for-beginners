import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
    ).json();

    // console.log("json: ", json);
    // json 그대로 저장하면 에러남. 객체로 들어가기 때문.
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  // console.log("movies: ", movies.data.movies);

  return (
    <div>
      {loading ? (
        <h1>Loading... </h1>
      ) : (
        <div>
          {movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                code={movie.imdb_code}
                title={movie.title_long}
                summ={movie.summary}
                gn={movie.genres}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
