import { render } from 'preact';
import { App } from './app.jsx';
import { ToastContainer } from 'react-toastify';

import './index.css';
import './christmas-lights.css';
import 'react-toastify/dist/ReactToastify.css';

render(
    <div data-theme="dark">
        <App />
        <ToastContainer />
    </div>, document.getElementById('app'))
