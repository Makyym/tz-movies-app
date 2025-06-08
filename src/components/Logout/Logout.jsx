import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/slice.js";

const Logout = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    };
    return <button onClick={handleClick}>Logout</button>
}

export default Logout