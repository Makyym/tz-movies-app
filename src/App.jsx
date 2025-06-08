import './App.css';
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import PrivateRoute from './PrivateRoute.jsx';
import RestrictedRoute from './RestrictedRoute.jsx';

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));

const App = () => {
    return (
        <Layout>
      <Routes>
        <Route path="/" 
        element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>} />
        <Route
          path='register'
          element=
          {<RestrictedRoute component={<RegistrationPage />} redirectTo='/movies' />}
        />
        <Route
          path='login'
          element=
          {<RestrictedRoute component={<LoginPage />} redirectTo='/movies' />}
        />
        <Route path='movies'
          element={
            <PrivateRoute>
              <MoviesPage />
            </PrivateRoute>}
        />
        <Route path='movies/:movieId'
          element={
            <PrivateRoute>
              <MovieDetailsPage />
            </PrivateRoute>}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
    );
};

export default App;