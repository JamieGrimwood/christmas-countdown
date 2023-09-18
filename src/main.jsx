import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

render(
    <div data-theme="dark">
        <App />
    </div>, document.getElementById('app'))
