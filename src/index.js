import './styles/styles.scss';

import rainSound from './assets/sounds/rain.mp3';
import summerSound from './assets/sounds/summer.mp3';
import winterSound from './assets/sounds/winter.mp3';

import rainIcon from './assets/icons/cloud-rain.svg';
import summerIcon from './assets/icons/sun.svg';
import winterIcon from './assets/icons/cloud-snow.svg';
import pauseIcon from './assets/icons/pause.svg';

import rainBg from './assets/images/rainy-bg.jpg';
import summerBg from './assets/images/summer-bg.jpg';
import winterBg from './assets/images/winter-bg.jpg';


const app = document.getElementById('app');



function createCustomElement(type, id, className = null, action = null, others = {}) {
    const elem = document.createElement(type)
    elem.id = id
    if (className) elem.className = className
    if (action) elem.onclick = action
    if (others) {
        for (let key in others) elem[key] = others[key]
    }
    return elem
}

const header = createCustomElement('h1', 'header', null, null, {textContent: 'Weather Sounds'})
const containerButtons = createCustomElement('div', 'buttons', 'container', null, {})
const containerVolume = createCustomElement('div', null, 'container', null, {})
const buttonRain = createCustomElement('button', 'button-rain', 'button', () => alert('rain'));
const buttonSummer = createCustomElement('button', 'button-summer', 'button', () => alert('summer'));
const buttonWinter = createCustomElement('button', 'button-winter', 'button', () => alert('winter'));
const controllerVolume = createCustomElement('input', 'volume', null, null, {
    type: 'range',
    min: 1,
    max: 100,
    step: 1,
    value: 50
});

containerButtons.appendChild(buttonSummer)
containerButtons.appendChild(buttonRain)
containerButtons.appendChild(buttonWinter)

containerVolume.appendChild(controllerVolume)

app.appendChild(header)
app.appendChild(containerButtons)
app.appendChild(containerVolume)