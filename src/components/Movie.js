import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie(props) {
  const { coverImg, code, title, summ, gn } = props;
  return (
    <div>
      <img src={coverImg} alt={code}></img>
      <h2>
        <Link to="/movie">{title}</Link>
      </h2>
      <p>{summ}</p>
      <ul>
        {gn.map((g, index) => {
          return <li key={index}>{g}</li>;
        })}
      </ul>
      <hr />
    </div>
  );
}

Movie.prototype = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summ: PropTypes.string.isRequired,
  gn: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
