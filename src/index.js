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

// header 
const header = document.createElement('h1')
header.id = 'header'
header.textContent = 'Weather Sounds'


// container buttons
const containerButtons = document.createElement('div')
containerButtons.id = 'buttons'
containerButtons.className = 'container'

// container for controller volume
const containerVolume = document.createElement('div')
containerVolume.className = 'container'


// buttons wheather's
const button_rain = document.createElement('button')
button_rain.id = 'button-rain'
button_rain.className = 'button'
button_rain.onclick = () => {alert('rain')}

const button_summer = document.createElement('button')
button_summer.id = 'button-summer'
button_summer.className = 'button'
button_summer.onclick = () => {alert('summer')}

const button_winter = document.createElement('button')
button_winter.id = 'button-winter'
button_winter.className = 'button'
button_winter.onclick = () => {alert('winter')}

// controller
const controllerVolume = document.createElement('input')
controllerVolume.id = 'volume'
controllerVolume.min = 1
controllerVolume.max = 100
controllerVolume.type = 'range'
controllerVolume.step = 1
controllerVolume.value = 50


containerButtons.appendChild(button_summer)
containerButtons.appendChild(button_rain)
containerButtons.appendChild(button_winter)

containerVolume.appendChild(controllerVolume)

app.appendChild(header)
app.appendChild(containerButtons)
app.appendChild(containerVolume)