import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
const s = require("./LoginForm.module.css");
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values, options) => {
        dispatch(loginUser(values))
            .unwrap()
            .then(res => {
                if (res) {
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
                    return;
                }
                toast.error('Incorrect email or password!')
            }).catch(() => {
                toast.error('Something went wrong... Please try again!')
            });
    };
    const initialValues = {
        "email": "",
        "password": "",
    };
    if (isLoggedIn) {
        return <Navigate to='/contacts'/>
    }
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <div>
                <Form className={s.form}>
                    <h2>Log in to your account to start using the application.</h2>
                    <h3>If you don't have an account yet, click <NavLink to='/register'>here</NavLink>.
                    </h3>
                    <div className={s.fieldDiv}>
                        <Field name='email' placeholder='Enter email' />
                        <ErrorMessage name="email" component="span"/>
                    </div>
                    <div className={s.fieldDiv}>
                        <Field name='password' type='password' placeholder='Enter password' />
                        <ErrorMessage name="password" component="span"/>
                    </div>
                    <button type="submit">Log in</button>
                </Form>
            </div>
        </Formik>
    )
};

export default LoginForm