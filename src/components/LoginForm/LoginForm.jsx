import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
const s = require("./LoginForm.module.css");

const LoginForm = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values, options) => {
        dispatch(loginUser(values))
            .unwrap()
            .then(res => {
                toast.success(`Welcome, ${values.email}!`, {
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
        "password": "",
    };
    if (isLoggedIn) {
        return <Navigate to='/contacts'/>
    }
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <div>
                <Form className={s.form}>
                    <h2>Log in to your account to start using the application.</h2>
                    <h3>If you don't have an account yet, click <NavLink to='/register'>here</NavLink>.
                    </h3>
                    <Field name='email' placeholder='Enter email' />
                    <Field name='password' type='password' placeholder='Enter pass' />
                    <button type="submit">Log in</button>
                </Form>
            </div>
        </Formik>
    )
};

export default LoginForm