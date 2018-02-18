'use strict';

//  constants.js
window.constants = (function () {
  return {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    ENTER: 13,
  }
})();
//  ...

//  get-random-element.js
window.getRandomElement = (function (arr) {
    //  ^ с помощью функции получаем случайное число, которое зависит от длины массива
    var max = arr.length;
    var randomElement = Math.round(Math.random() * (max - 1));
    return randomElement;
});
//  ...

//  render-random-wizards.js
(function () {
  // функция, которая генерирует массив с объектами. внутри объектов содержатся случайные значения
  var getRandomWizards = function () {

    var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

    //  массив, в котором содержатся объекты, описывающие параметры персонажей
    var wizards = [];
    //  цикл, который добавляет в массив необходимое количество объектов
    for (var i = 0; i <= 3; i++) {
      wizards[i] =
      {
        name: WIZARD_NAMES[window.getRandomElement(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[window.getRandomElement(WIZARD_SURNAMES)],
        coatColor: window.constants.COAT_COLORS[window.getRandomElement(window.constants.COAT_COLORS)],
        eyeColor: window.constants.EYE_COLORS[window.getRandomElement(window.constants.EYE_COLORS)],
      };
    }
    return wizards;
  };
  var wizards = getRandomWizards();

  var renderWizard = function (wizard) {
    //  ^ сохраняем в шаблон случайно сгенерированные параметры

    //  создаем переменные для шаблона
    var similarTemplate = document.querySelector('#similar-wizard-template').content;
    var wizardElement = similarTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  //  создаем переменные для окна похожих персонажей
  var similarListElement = document.querySelector('.setup-similar-list');
  // объявляем фрагмент
  var fragment = document.createDocumentFragment();

  //  воспроизводим шаблон 4 раза
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  similarListElement.appendChild(fragment);

})();
// ...

//  open-setup-window.js
(function () {
  var setupOpenIcon = document.querySelector('.setup-open');
  window.setupWindow = document.querySelector('.setup');
  window.setupCloseIcon = window.setupWindow.querySelector('.setup-close');

  //  делаем видимым окно похожих персонажей
  var similarDialog = document.querySelector('.setup-similar');
  similarDialog.classList.remove('hidden');

  //  функция открытия окна
  var onSetupOpenIconClick = function () {
    window.setupWindow.classList.remove('hidden');
    //  обработчик нажатия на Enter, если крестик в фокусе
    window.setupCloseIcon.addEventListener('keydown', window.closeSetupWindow.onWindowEnterPress);
    //  обработчик нажатия на Escape
    document.addEventListener('keydown', window.closeSetupWindow.onWindowEscPress);
  };

  //  открываем окно по клику на иконку
  setupOpenIcon.addEventListener('click', function () {
    onSetupOpenIconClick();
  });

  //  открываем окно по нажании Enter, если иконка в фокусе
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER) {
      onSetupOpenIconClick();
    }
  });
})();
//  ...

//  close-setup-window.js
window.closeSetupWindow = (function () {
  var ESCAPE = 27;

  //  функция закрытия окна
  var onSetupCloseIconClick = function () {
    window.setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', window.closeSetupWindow.onWindowEnterPress);
    document.removeEventListener('keydown', window.closeSetupWindow.onWindowEnterPress);
  };

  //  закрываем по клику на крестик
  window.setupCloseIcon.addEventListener('click', function () {
    onSetupCloseIconClick();
  });

  return {
    onWindowEscPress: function (evt) {
      if (evt.keyCode === ESCAPE) {
        onSetupCloseIconClick();
      }
    },

    onWindowEnterPress: function (evt) {
      if (evt.keyCode === window.constants.ENTER) {
        onSetupCloseIconClick();
      }
    },
  };

})();
//  ...

//  validate-user-name-input.js
(function () {
  //  проверяем валидность введенного имени
  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Что это за имя такое короткое? Введи хотя бы 2 знака!');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Больше похоже на хэш-сумму. Попробуй поместиться в 25 знаков.');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('А имя кто будет вводить?');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();
//  ...

//  change-wizard-style-on-click.js
(function () {
  //  меняем параметры персанажа по клику
  var setupWizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyeColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireballColor = document.querySelector('.setup-fireball-wrap');

  setupWizardCoatColor.addEventListener('click', function () {
    setupWizardCoatColor.style.fill = window.constants.COAT_COLORS[window.getRandomElement(window.constants.COAT_COLORS)];
  });

  setupWizardEyeColor.addEventListener('click', function () {
    setupWizardEyeColor.style.fill = window.constants.EYE_COLORS[window.getRandomElement(window.constants.EYE_COLORS)];
  });

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  setupWizardFireballColor.addEventListener('click', function () {
    setupWizardFireballColor.style.backgroundColor = FIREBALL_COLORS[window.getRandomElement(FIREBALL_COLORS)];
  });
})();
//  ...
