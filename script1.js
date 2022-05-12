const body = document.getElementById('root');
function showTextArea() {
  const textArea = document.createElement('textarea');
  textArea.classList.add('use-keyboard-input');
  body.appendChild(textArea);
}
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.main.setAttribute('id', 'keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayoutEng = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift ',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];
    const keyLayoutRu = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'х', '\\', 'del',
      'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift ',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    // Creates HTML for an icon
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    if (localStorage.lang === 'EN') {
      keyLayoutEng.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['backspace', 'del', 'enter', 'shift '].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute('type', 'button');
        const engKeyValue = key.toUpperCase();
        keyElement.setAttribute('data-value', `Key${engKeyValue}`);
        keyElement.classList.add('keyboard__key');

        switch (key) {
          case 'backspace':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('backspace');

            keyElement.addEventListener('click', () => {
              this.properties.value = this.properties.value
                .substring(0, this.properties.value.length - 1);
              this.triggerEvent('oninput');
            });

            break;

          case 'capslock':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_capslock');

            keyElement.addEventListener('click', () => {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            });

            break;

          case 'enter':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_return');

            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this.triggerEvent('oninput');
            });

            break;

          case 'space':
            keyElement.classList.add('keyboard__key--extra-wide');
            keyElement.innerHTML = createIconHTML('space_bar');

            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this.triggerEvent('oninput');
            });

            break;

          default:
            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener('click', () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this.triggerEvent('oninput');
            });

            break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
      });
    }
    if (localStorage.lang === 'RU') {
      keyLayoutRu.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['backspace', 'del', 'enter', 'shift '].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute('type', 'button');
        const engKeyValue = keyLayoutRu.indexOf(key);
        keyElement.setAttribute('data-value', keyLayoutEng[engKeyValue]);
        keyElement.classList.add('keyboard__key');

        switch (key) {
          case 'backspace':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('backspace');

            keyElement.addEventListener('click', () => {
              this.properties.value = this.properties.value
                .substring(0, this.properties.value.length - 1);
              this.triggerEvent('oninput');
            });

            break;

          case 'capslock':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_capslock');

            keyElement.addEventListener('click', () => {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            });

            break;

          case 'enter':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('keyboard_return');

            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this.triggerEvent('oninput');
            });

            break;

          case 'space':
            keyElement.classList.add('keyboard__key--extra-wide');
            keyElement.innerHTML = createIconHTML('space_bar');

            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this.triggerEvent('oninput');
            });

            break;

          default:
            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener('click', () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this.triggerEvent('oninput');
            });

            break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
      });
    }

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0
        && key.innerHTML !== 'backspace'
        && key.innerHTML !== 'tab'
        && key.innerHTML !== 'del'
        && key.innerHTML !== 'enter'
        && key.innerHTML !== 'shift'
        && key.innerHTML !== 'shift '
        && key.innerHTML !== 'ctrl'
        && key.innerHTML !== 'win'
        && key.innerHTML !== 'alt'
        && key.innerHTML !== 'space') {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  showTextArea();
  localStorage.setItem('lang', 'EN');
  Keyboard.init();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'AltLeft' && (event.ctrlKey || event.metaKey)) {
    const currentLang = localStorage.getItem('lang');
    localStorage.clear();
    if (currentLang === 'EN') {
      localStorage.setItem('lang', 'RU');
    } else {
      localStorage.setItem('lang', 'EN');
    }
    document.getElementById('keyboard').remove();
    Keyboard.init();
  }
});
