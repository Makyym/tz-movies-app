import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addMovie } from "../../redux/movies/operations.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const s = require("./AddMovieForm.module.css");

const AddMovieForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        title: "",
        year: "",
        format: "DVD",
        actors: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        const actorsArray = values.actors
        ? values.actors.split(",").map((actor) => actor.trim())
        : [];
        const movieData = {
            title: values.title,
            year: parseInt(values.year, 10),
            format: values.format,
            actors: actorsArray,
        };
        dispatch(addMovie(movieData))
        .unwrap()
        .then((newMovie) => {
        toast.success(`The movie "${newMovie.data.title}" has been added!`, {
            duration: 3000,
            style: {
                border: '1px solid #646cff',
                padding: '16px',
                color: 'white',
                backgroundColor: '#1a1a1a',
                fontSize: '16px',
                fontWeight: '700',
            },
            icon: null});
        navigate(`/movies/${newMovie.data.id}`);
        resetForm();
        })
        .catch((error) => {
        toast.error(error.message || 'An error occurred.');
        });
    };

    return (
    <div className={s.wrapper}>
        <h3>Add new movie</h3>
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
            <Form className={s.form}>
            <div>
                <label>Title:</label>
                <Field type="text" name="title" placeholder="Enter movie title"/>
                <ErrorMessage name="title" component="div" style={{ color: "red" }} />
            </div>
            <div>
                <label>Year:</label>
                <Field type="number" name="year" placeholder="xxxx"/>
                <ErrorMessage name="year" component="div" style={{ color: "red" }} />
            </div>
            <div>
                <label>Format:</label>
                <Field as="select" name="format">
                <option value="VHS">VHS</option>
                <option value="DVD">DVD</option>
                <option value="Blu-ray">Blu-ray</option>
                </Field>
            </div>
            <div>
                <label>Actors (separated by a comma):</label>
                <Field
                type="text"
                name="actors"
                placeholder="Karl Urban, Keanu Reeves"
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                Add movie
            </button>
            </Form>
        )}
        </Formik>
    </div>
    );
};

export default AddMovieForm;