import { useId } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../redux/movies/operations.js";
import { Field, Formik, Form } from "formik";
import { clearMovies } from "../../redux/movies/slice.js";
const s = require("./SearchBox.module.css");

const SearchBox = ({onSearch, searchValue, clearSearch}) => {
    const searchId = useId();
    const dispatch = useDispatch();
    const handleSubmit = (values, { setSubmitting }) => {
        values.offset = 0;
        dispatch(clearMovies());
        dispatch(fetchMovies(values));
        onSearch(values.searchValue);
        setSubmitting(false);
    };
    const handleClearClick = (resetForm) => {
        resetForm({ values: { searchValue: "" } });
        clearSearch();
    };

    const initialValues = {
        searchValue: searchValue ?? "",
    };
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>
            {({ isSubmitting, resetForm }) => (
                <Form className={s.form}>
                <label htmlFor={searchId}>Find movie by title or actor</label>
                <Field id={searchId} name="searchValue" type="text" />
                <button type="submit" disabled={isSubmitting}>
                    Search
                </button>
                <button type="button" onClick={() => handleClearClick(resetForm)}>Clear</button>
                </Form>
            )}
        </Formik>
    )
}

export default SearchBox