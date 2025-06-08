import { NavLink } from "react-router-dom";
import clsx from "clsx";
const s = require('./AuthNav.module.css');

const AuthNav = () => {
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };
    return (
        <div className={s.wrapper}>
            <NavLink className={buildLinkClass} to='login'>
                Log In
            </NavLink>
            <NavLink className={buildLinkClass} to='register'>
                Register
            </NavLink>
        </div>
    )
}

export default AuthNav