import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList.jsx"
import SearchBox from "../../components/SearchBox/SearchBox.jsx"

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsQuery = searchParams.get('query');
    const searchValues = (searchQuery) => {
        searchParams.set('query', searchQuery);
        setSearchParams(searchParams);
    };
    const resetSearchValues = () => {
        searchParams.delete('query');
        setSearchParams(searchParams);
    };
    return (
    <>
    <SearchBox onSearch={searchValues} searchValue={paramsQuery} clearSearch={resetSearchValues}/>
    <MoviesList searchValue={paramsQuery}/>
    </>
    )
}

export default MoviesPage