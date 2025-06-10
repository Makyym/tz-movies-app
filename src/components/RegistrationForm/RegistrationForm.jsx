import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/auth/operations.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
const s = require("./RegistrationForm.module.css");
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email address')
    .required('Email is required')
    .test(
        'Invalid email domain',
        (value) => {
            if (!value) return false;
            const parts = value.split('@');
            if (parts.length < 2) return false;
            return parts[1].includes('.') && parts[1].split('.').filter(Boolean).length > 1;
        }
    ),
    name: Yup.string()
    .matches(/^[А-Яа-яЁёA-Za-z\s]+$/, 'Just letters and spaces!')
    .required('Name is required'),
    password: Yup.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (values, options) => {
        values.confirmPassword = values.password;
        dispatch(registerUser(values))
            .unwrap()
            .then(res => {
                if (res) {
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
                return;
            }
            toast.error('Something went wrong... Please try again!');
            }).catch(() => {
                toast.error('Something went wrong... Please try again!');
            });
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
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form className={s.form}>
                <h2>Create an account to start using the application.</h2>
                <h3>If you already have an account, click <NavLink to='/login'>here</NavLink>.</h3>
                <div className={s.fieldDiv}>
                    <Field name='email' placeholder='Enter email' />
                    <ErrorMessage name="email" component="span"/>
                </div>
                <div className={s.fieldDiv}>
                    <Field name='name' placeholder='Enter name' />
                    <ErrorMessage name="name" component="span"/>
                </div>
                <div className={s.fieldDiv}>
                    <Field name='password' type='password' placeholder='Enter password' />
                    <ErrorMessage name="password" component="span"/>
                </div>
                <button type="submit">Log in</button>
            </Form>
        </Formik>
    )
};

export default RegistrationForm