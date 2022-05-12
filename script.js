const body = document.getElementById('root');
const textArea = document.createElement('textarea');
function showTextArea() {
  textArea.classList.add('textarea');
  const note = document.createElement('p');
  note.innerHTML = 'Клавиатура создана в ОС Windows.<br> Для переключения языка комбинация: левыe ctrl + alt';
  note.classList.add('note');
  body.append(note, textArea);
}

const GENERALKEYS = ['backspace', 'tab', 'del', 'capslock', 'enter', 'shift', 'shift ', 'ctrl', 'win', 'alt', 'space'];

const KEYS = [{ ru: 'ё', en: '`' }, { ru: '1', en: '1' }, { ru: '2', en: '2' }, { ru: '3', en: '3' }, { ru: '4', en: '4' }, { ru: '5', en: '5' }, { ru: '6', en: '6' }, { ru: '7', en: '7' }, { ru: '8', en: '8' }, { ru: '9', en: '9' }, { ru: '0', en: '0' }, { ru: '-', en: '-' }, { ru: '=', en: '=' }, { ru: 'backspace', en: 'backspace' }, /*  */ { ru: 'tab', en: 'tab' }, { ru: 'й', en: 'q' }, { ru: 'ц', en: 'w' }, { ru: 'у', en: 'e' }, { ru: 'к', en: 'r' }, { ru: 'е', en: 't' }, { ru: 'н', en: 'y' }, { ru: 'г', en: 'u' }, { ru: 'ш', en: 'i' }, { ru: 'щ', en: 'o' }, { ru: 'з', en: 'p' }, { ru: 'х', en: '[' }, { ru: 'ъ', en: ']' }, { ru: '\\', en: '\\' }, { ru: 'del', en: 'del' }, /*  */ { ru: 'capslock', en: 'capslock' }, { ru: 'ф', en: 'a' }, { ru: 'ы', en: 's' }, { ru: 'в', en: 'd' }, { ru: 'а', en: 'f' }, { ru: 'п', en: 'g' }, { ru: 'р', en: 'h' }, { ru: 'о', en: 'j' }, { ru: 'л', en: 'k' }, { ru: 'д', en: 'l' }, { ru: 'ж', en: ';' }, { ru: 'э', en: '\'' }, { ru: 'enter', en: 'enter' }, /*  */ { ru: 'shift', en: 'shift' }, { ru: 'я', en: 'z' }, { ru: 'ч', en: 'x' }, { ru: 'с', en: 'c' }, { ru: 'м', en: 'v' }, { ru: 'и', en: 'b' }, { ru: 'т', en: 'n' }, { ru: 'ь', en: 'm' }, { ru: 'б', en: ',' }, { ru: 'ю', en: '.' }, { ru: '.', en: '/' }, { ru: '▲', en: '▲' }, { ru: 'shift ', en: 'shift ' }, /*  */ { ru: 'ctrl', en: 'ctrl' }, { ru: 'win', en: 'win' }, { ru: 'alt', en: 'alt' }, { ru: 'space', en: 'space' }, { ru: 'alt', en: 'alt' }, { ru: '◄', en: '◄' }, { ru: '▼', en: '▼' }, { ru: '►', en: '►' }, { ru: 'ctrl', en: 'ctrl' }];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
    lang: KEYS.ru,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.main.setAttribute('id', 'keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);

    document.body.append(this.elements.main);
  },

  setLanguage() {
    const currentLang = localStorage.getItem('lang');
    if (currentLang) {
      this.properties.lang = currentLang;
    } else {
      this.properties.lang = 'en';
    }
  },

  createKeys() {
    this.setLanguage();
    const keyboardWrapper = document.createElement('div');

    KEYS.forEach((el) => {
      let key;
      if (this.properties.lang === 'ru') {
        key = el.ru;
      } else {
        key = el.en;
      }
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data-value', `Key${(el.en).toUpperCase()}`);
      keyElement.classList.add('keyboard__key');
      const insertLineBreak = ['backspace', 'del', 'enter', 'shift '].indexOf(key) !== -1;

      GENERALKEYS.forEach((genkey) => {
        if (key === genkey) {
          keyElement.classList.add('general__key');
        
        }
      });
      switch (key) {
        case 'backspace':
          keyElement.classList.add('wide2x');
          keyElement.textContent = '←  Backspace';
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            textArea.value = this.properties.value;
          });

          break;

        case 'capslock':
          keyElement.classList.add('wide2x', '--activatable');
          keyElement.textContent = key;

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('--active', this.properties.capsLock);
          });

          break;
        case 'shift':
        case 'shift ':
          keyElement.classList.add('wide2x');
          keyElement.textContent = key;
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
          });
          break;
        case 'del':
        case 'alt':
        case 'ctrl':
        case 'win':
        case '◄':
        case '▲':
        case '►':
        case '▼':
          keyElement.textContent = key;
          keyElement.addEventListener('click', (e) => {
            e.preventDefault();
          });
          break;
        case 'tab':
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            textArea.value = this.properties.value;
          });
          break;
        case 'enter':
          keyElement.classList.add('wide2x');
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            textArea.value = this.properties.value;
          });

          break;

        case 'space':
          keyElement.classList.add('space');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            textArea.value = this.properties.value;
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            textArea.value = this.properties.value;
          });

          break;
      }

      keyboardWrapper.appendChild(keyElement);
      if (insertLineBreak) {
        keyboardWrapper.appendChild(document.createElement('br'));
      }
    });
    return keyboardWrapper;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      GENERALKEYS.forEach((genkey) => {
        if (genkey.indexOf(key.textContent.toLowerCase()) === -1) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      });
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  showTextArea();
  Keyboard.init();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'AltLeft' && (event.ctrlKey || event.metaKey)) {
    const currentLang = localStorage.getItem('lang');
    if (currentLang) {
      localStorage.clear();
    } else {
      localStorage.setItem('lang', 'ru');
    }
    document.getElementById('keyboard').remove();
    Keyboard.init();
  }
});
