import { NavLink } from "react-router-dom";
const s = require('./Navigation.module.css');
import clsx from "clsx";

const Navigation = () => {
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };
    return (
        <nav className={s.nav}>
            <NavLink className={buildLinkClass} to='/'>
                Add movie
            </NavLink>
            <NavLink className={buildLinkClass} to='movies'>
                Movies
            </NavLink>
        </nav>
    )
}

export default Navigation