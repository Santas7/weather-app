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
import {idAndClass} from './core/types/types-code/index-types';


const app = document.getElementById('app') as HTMLElement
const audio = new Audio('')

const globalStates = [
  initialState({audioSource: summerSound, icon: summerIcon, bg: summerBg}),
  initialState({audioSource: rainSound, icon: rainIcon, bg: rainBg}),
  initialState({audioSource: winterSound, icon: winterIcon, bg: winterBg})
]

const sounds = [
  { audioSource: summerSound, icon: summerIcon, bg: summerBg },
  { audioSource: rainSound, icon: rainIcon, bg: rainBg },
  { audioSource: winterSound, icon: winterIcon, bg: winterBg },
]

interface initialState {
  audioSource: string
  icon: string
  bg: string
}

function initialState({ audioSource, icon, bg }: initialState) {
  return {
    status: false,
    oldIcon: icon,
    icon,
    audioSource,
    bg,
    setStatus() {
      this.status = !this.status;
      this.icon = this.status ? pauseIcon : this.oldIcon;
      document.body.style.setProperty('--bg-image', `url(${this.bg})`);
      document.body.style.setProperty('--bg-blur', this.status ? 'none' : 'blur(5px)');
    },
  };
}


function resetGlobalStates(id: string) {
  globalStates.forEach((state, idx) => {
    if (state.status && idx !== Number(id)) {
      state.setStatus();
      const icon = document.getElementById(`${idx}-icon`) as HTMLImageElement | null;
      if (icon) {
        icon.src = state.oldIcon;
        icon.alt = `icon ${idx}`;
      }
    }
  })

  if (!audio.paused && id !== audio.getAttribute('data-id')) {
    audio.pause();
    audio.currentTime = 0;
  }
}



function createCustomElement(type: string, id: idAndClass, className: idAndClass, others: object = {}, styles: object = {}) {
  const elem = Object.assign(document.createElement(type), { 
    id, 
    className, 
    ...others 
  })
  Object.assign(elem.style, styles)
  return elem
}


function render() {
  const header = createCustomElement('h1', 'header', null, { textContent: 'Weather Sounds' });
  const containerVolume = createCustomElement('div', null, 'container');
  const containerButtons = createCustomElement('div', 'buttons', 'container');

  sounds.forEach((data, idx) => {
    const button = createCustomElement('div', idx, 'button', {}, { backgroundImage: `url(${data.bg})` });
    const icon = createCustomElement('img', `${idx}-icon`, 'icon', {
      src: data.icon,
      alt: `icon ${idx}`,
    })
    
    button.appendChild(icon)
    containerButtons.appendChild(button)
  })

  const controllerVolume = createCustomElement('input', 'volume', null, {
    type: 'range',
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
    oninput: () => (audio ? (audio.volume = Number((controllerVolume as HTMLInputElement).value)) : null),
  })


  containerButtons.addEventListener('click', (event: MouseEvent) => {
    const button = (event.target as HTMLElement).closest('.button')
    if (!button) 
      return
  
    const id = button.id
    const state = globalStates[+id]
  
    resetGlobalStates(id)
    audio.src = state.audioSource
    audio.setAttribute('data-id', id)
  
    state.setStatus()
    const icon = document.getElementById(`${id}-icon`) as HTMLImageElement | null
    if (icon) {
      icon.src = state.icon
      icon.alt = state.status ? `pause icon ${id}` : `icon ${id}`
    }
    if (state.status) audio.play();
    else audio.pause();  
  })
  
  containerVolume.appendChild(controllerVolume)
  app.append(header, containerButtons, containerVolume)
}

render()