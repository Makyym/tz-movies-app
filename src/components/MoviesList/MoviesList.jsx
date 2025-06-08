import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movies/operations.js";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectIsLoading, selectMoviesList, selectTotal } from "../../redux/movies/selectors.js";
const s = require("./MoviesList.module.css");

const MoviesList = ({searchValue}) => {
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const movies = useSelector(selectMoviesList);
  const loading = useSelector(selectIsLoading);
  const listLength = useSelector(selectTotal);
  useEffect(() => {
    dispatch(fetchMovies({searchValue, offset}));
  }, [dispatch, searchValue, offset]);
  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 10);
  };

  if (loading) return <p>Download movies...</p>;
  if (!movies) return <div>Loading error.</div>;

  return (
    <div className={s.wrapper}>
      <h2>List of movies</h2>
      {movies.length ? (
        <>
          <ul className={s.ul}>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id.toString()}`} state={location}>
                  {movie.title}
                  <br />({movie.year})
                </Link>
              </li>
            ))}
          </ul>
          {listLength > movies.length ? (<button type="button" onClick={handleLoadMore}>Load more</button>) : <></>}
        </>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesList;