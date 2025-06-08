import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import AuthNav from "../AuthNav/AuthNav.jsx";
import Logout from "../Logout/Logout.jsx";
import Navigation from "../Navigation/Navigation.jsx";
const s = require('./AppBar.module.css');

const AppBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <header className={s.wrapper}>
            <h2>Movies App</h2>
            {isLoggedIn && <Navigation />}
            {isLoggedIn ? <Logout /> : <AuthNav/>}
        </header>
    )
}

export default AppBar