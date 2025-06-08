import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
const s = require("./RegistrationForm.module.css");

const RegistrationForm = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values, options) => {
        values.confirmPassword = values.password;
        dispatch(registerUser(values))
            .unwrap()
            .then(res => {
                toast.success(`Welcome, ${values.name}!`, {
                    style: {
                        border: '1px solid #646cff',
                        padding: '16px',
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                        opacity: '0.8',
                    },
                    iconTheme: {
                        primary: '#646cff',
                        secondary: 'white'
                    }});
                navigate('/');
            }).catch(() => {
                toast.error('Something went wrong... Please try again!')
            });
        options.resetForm();
    };
    const initialValues = {
        "email": "",
        "name": "",
        "password": "",
    };
    if (isLoggedIn) {
        return <Navigate to='/contacts'/>
    }
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form className={s.form}>
                <h2>Create an account to start using the application.</h2>
                <h3>If you already have an account, click <NavLink to='/login'>here</NavLink>.</h3>
                <Field name='email' placeholder='Enter email' />
                <Field name='name' placeholder='Enter name' />
                <Field name='password' type='password' placeholder='Enter pass' />
                <button type="submit">Log in</button>
            </Form>
        </Formik>
    )
};

export default RegistrationForm