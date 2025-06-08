import { useState } from "react";
import { useDispatch } from "react-redux";
import { importMovies } from "../../redux/movies/operations.js";
const s = require("./ImportMovies.module.css");

const ImportMovies = () => {
    const dispatch = useDispatch();
    const [fileContent, setFileContent] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
        setFileContent(event.target.result);
        };
        reader.readAsText(file);
    };

    const handleImport = () => {
        if (!fileContent) {
        alert("First, select a file.");
        return;
        }
        dispatch(importMovies(fileContent));
    };

    return (
        <div className={s.wrapper}>
        <h3>Import movies from a file</h3>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button onClick={handleImport}>Import</button>
        </div>
    );
};

export default ImportMovies;