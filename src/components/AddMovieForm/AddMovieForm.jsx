import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addMovie } from "../../redux/movies/operations.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
const s = require("./AddMovieForm.module.css");

const currentYear = new Date().getFullYear();

const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required("Movie title is required!"),

    year: Yup.number()
        .typeError("Year must be a number!")
        .integer("Year must be an integer!")
        .required("Release year is required!")
        .min(1888, "Year must be 1888 or later!")
        .max(currentYear, `Year cannot be later than ${currentYear}!`),

    actors: Yup.string()
        .test(
        "at-least-one-actor",
        "At least one actor is required!",
        (value) => {
            if (!value) return false;
            const list = value
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean);
            return list.length > 0;
        }
        )
        .matches(/^[A-Za-z\s\-,]+$/, 'Only letters, spaces, hyphens, and commas are allowed!')
        .required("At least one actor is required!"),
});

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
            if (newMovie.data) {
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
                return;
            };
            toast.error(newMovie.error.code);
        })
        .catch((error) => {
        toast.error(error.message || 'An error occurred.');
        console.log(error.message);
        });
    };

    return (
    <div className={s.wrapper}>
        <h3>Add new movie</h3>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
            <Form className={s.form}>
            <div className={s.fieldDiv}>
                <label>Title:</label>
                <Field type="text" name="title" placeholder="Enter movie title"/>
                <ErrorMessage name="title" component="span"/>
            </div>
            <div className={s.fieldDiv}>
                <label>Year:</label>
                <Field type="number" name="year" placeholder="1888"/>
                <ErrorMessage name="year" component="span"/>
            </div>
            <div>
                <label>Format:</label>
                <Field as="select" name="format">
                <option value="VHS">VHS</option>
                <option value="DVD">DVD</option>
                <option value="Blu-Ray">Blu-Ray</option>
                </Field>
            </div>
            <div className={s.fieldDiv}>
                <label>Actors (separated by a comma):</label>
                <Field
                type="text"
                name="actors"
                placeholder="Karl Urban, Keanu Reeves"
                />
                <ErrorMessage name="actors" component="span"/>
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