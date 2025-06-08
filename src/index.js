import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import "modern-normalize";
import App from './App.jsx';
import { store } from './redux/store.js';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                duration: 2000,
                }}
                />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
); 