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
import './styles/styles.scss';


const app = document.getElementById('app');
let audio = new Audio('');
let globalStates = [
  initialState({audioSource: summerSound, icon: summerIcon, bg: summerBg}),
  initialState({audioSource: rainSound, icon: rainIcon, bg: rainBg}),
  initialState({audioSource: winterSound, icon: winterIcon, bg: winterBg})
];


function initialState(others) {
  return {
    status: false,
    setStatus: function () {
      this.status = !this.status;
      this.icon = this.icon === this.oldIcon ? pauseIcon : this.oldIcon;
      document.body.style.setProperty('--bg-image', `url(${this.bg})`);
      document.body.style.setProperty('--bg-blur', this.status ? 'none' : 'blur(5px)');
    },
    icon: others.icon,
    oldIcon: others.icon,
    audioSource: others.audioSource,
    bg: others.bg
  }
}


function resetGlobalStates(id) {
  globalStates.forEach((state, idx) => {
    if (state.status && idx !== Number(id)) {
      state.setStatus();
      const icon = document.getElementById(`${idx}-icon`);
      icon.src = state.oldIcon;
      icon.alt = `icon ${idx}`;
    }
  })
  if (!audio.paused && id !== audio.getAttribute('data-id')) {
    audio.pause();
    audio.currentTime = 0;
  }
}


function removeChildsElement(element) {
  while (element.firstChild) element.removeChild(element.lastChild);
}

function createCustomElement(type, id, className = null, others = {}, styles = {}) {
  const elem = document.createElement(type);
  elem.id = id;
  if (className) {
    elem.className = className;
    if (className === 'button') {
      const icon = createCustomElement('img', `${id}-icon`, 'icon', { src: globalStates[Number(id)].icon, alt: `icon ${id}` })
      removeChildsElement(elem)
      elem.appendChild(icon)
    }
  }
  if (others) 
    for (let key in others) 
      elem[key] = others[key];
  if (styles) 
    for (let key in styles) 
      elem.style[key] = styles[key];
  return elem;
}


function render() {
  let header = createCustomElement('h1', 'header', null, {textContent: 'Weather Sounds'}),
    containerVolume = createCustomElement('div', null, 'container'),
    containerButtons = createCustomElement('div', 'buttons', 'container'),
    buttons = [
      createCustomElement('div', '0', 'button', {audioSource: summerSound, icon: summerIcon, bg: summerBg}, {backgroundImage: `url(${summerBg})`}),
      createCustomElement('div', '1', 'button', {audioSource: rainSound, icon: rainIcon, bg: rainBg}, {backgroundImage: `url(${rainBg})`}), 
      createCustomElement('div', '2', 'button', {audioSource: winterSound, icon: winterIcon, bg: winterBg}, {backgroundImage: `url(${winterBg})`})
    ],
        
    controllerVolume = createCustomElement('input', 'volume', null, {
      type: 'range',
      min: 0,
      max: 1,
      step: 0.1,
      value: 0.5,
      oninput: () => (audio ? (audio.volume = controllerVolume.value) : null),
    });  
  for (let button of buttons) 
    containerButtons.appendChild(button);

  containerButtons.addEventListener('click', (event) => {
    const button = event.target.closest('.button');
    if (!button) return; 
    const id = button.id;
    const state = globalStates[Number(id)];
    resetGlobalStates(id);
    audio.src = state.audioSource;
    audio.setAttribute('data-id', id);
    state.setStatus();
    const icon = document.getElementById(`${id}-icon`)
    if (state.status) {
      icon.src = state.icon
      icon.alt = `pause icon ${id}`
      audio.play();
      document.body.style.backgroundImage = `url(${state.bg})`
    } else {
      icon.src = state.icon
      icon.alt = `icon ${id}`
      audio.pause()
    }
  })

  containerVolume.appendChild(controllerVolume);
  app.appendChild(header);
  app.appendChild(containerButtons);
  app.appendChild(containerVolume);
}

render();