import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, fetchMovieById } from "../../redux/movies/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectMovie } from "../../redux/movies/selectors.js";
const s = require("./MovieItem.module.css");
import { FaArrowCircleLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const MovieItem = () => {
    const { movieId } = useParams();
    const movie = useSelector(selectMovie);
    const loading = useSelector(selectIsLoading);
    const location = useLocation();
    const goBackLink = useRef(location.state ?? "/movies");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovieById(movieId));
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (!movie.title) return <div>Movie not found</div>;

    const {id, title, year, format, actors} = movie;

    const handleDelete = () => {
        dispatch(deleteMovie(id));
        navigate('/movies');
    };

    return (
        <div className={s.wrapper}>
            <Link to={goBackLink.current}>
            <FaArrowCircleLeft />
            Go back
            </Link>
            <h3>{title}</h3>
            <ul className={s.detailsList}>
                <li>Movie ID: {id}</li>
                <li><GoDotFill /></li>
                <li>Year: {year}</li>
                <li><GoDotFill /></li>
                <li>Format: {format}</li>
            </ul>
            <div className={s.actorsDiv}>
                <p>List of actors:</p>
                <ul>
                    {actors.map((actor) => <li key={actor.id}>{actor.name}</li>)}
                </ul>
            </div>
            <button onClick={handleDelete}>Delete movie</button>
        </div>
    )
}

export default MovieItem