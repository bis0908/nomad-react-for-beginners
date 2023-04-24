import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  /*  Route의 변수를 받아온다. (/movie/:id)
    :tomato 라고 쓰면 tomato 변수의 값을 보여줄 것.
   */
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log("json: ", json);
    setMovie(json.data.movie);
    // console.log(Object.entries(movie));
    setLoading(false);
  };
  // console.log(typeof movie); // object

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h2>
            <Link to={movie.url}>{movie.title_long}</Link>: 🍿 {movie.genres.map((g) => `${g} `)}
          </h2>
          <img src={movie.medium_cover_image} alt={movie.imdb_code}></img>
          <p>Rating: {movie.rating}</p>
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}
