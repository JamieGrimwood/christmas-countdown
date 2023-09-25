import { render } from 'preact';
import { App } from './app.jsx';
import { ToastContainer } from 'react-toastify';
import { registerSW } from 'virtual:pwa-register';

import './index.css';
import './christmas-lights.css';
import 'react-toastify/dist/ReactToastify.css';

if ("serviceWorker" in navigator && !/dev.jmgcoding.com/.test(window.location)) {
    registerSW();
}

render(
    <div data-theme="dark">
        <App />
        <ToastContainer />
    </div>, document.getElementById('app'))
