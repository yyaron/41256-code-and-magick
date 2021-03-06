'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

//  с помощью функции получаем случайное число, которое зависит от длины массива
var getRandomElement = function (arr) {
  var max = arr.length;
  var randomElement = Math.round(Math.random() * (max - 1));
  return randomElement;
};

// функция, которая генерирует массив с объектами. внутри объектов содержатся случайные значения
var getRandomWizards = function () {
  //  массив, в котором содержатся объекты, описывающие параметры персонажей
  var wizards = [];
  //  цикл, который добавляет в массив необходимое количество объектов
  for (var i = 0; i <= 3; i++) {
    wizards[i] =
    {
      name: WIZARD_NAMES[getRandomElement(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomElement(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[getRandomElement(COAT_COLORS)],
      eyeColor: EYE_COLORS[getRandomElement(EYE_COLORS)],
    };
  }
  return wizards;

};
var wizards = getRandomWizards();

//  создаем переменные для окна похожих персонажей и шаблона
var similarListElement = document.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content;

//  сохраняем в шаблон случайно сгенерированные параметры
var renderWizard = function (wizard) {
  var wizardElement = similarTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

//  воспроизводим шаблон 4 раза
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

//  делаем видимым окно похожих персонажей
var similarDialog = document.querySelector('.setup-similar');
similarDialog.classList.remove('hidden');

//  ///////////////////////////////////// //
//  //.............. #12 ..............// //
//  ///////////////////////////////////// //

var setupWindow = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open');
var setupCloseIcon = setupWindow.querySelector('.setup-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupWindow();
  }
};

var onWindowEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
};

//  функция открытия окна
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');

  //  закрываем по нажании Enter, если крестик в фокусе
  setupCloseIcon.addEventListener('keydown', onWindowEnterPress);

  //  закрываем по нажатии Escape
  document.addEventListener('keydown', onWindowEscPress);
};

//  функция закрытия окна
var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onWindowEscPress);
  document.removeEventListener('keydown', onWindowEnterPress);
};

//  открываем окно по клику на иконку
setupOpenIcon.addEventListener('click', function () {
  openSetupWindow();
});

//  открываем окно по нажании Enter, если иконка в фокусе
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

//  закрываем по клику на крестик
setupCloseIcon.addEventListener('click', function () {
  closeSetupWindow();
});

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

//  меняем параметры персанажа по клику
var setupWizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyeColor = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireballColor = document.querySelector('.setup-fireball-wrap');

setupWizardCoatColor.addEventListener('click', function () {
  setupWizardCoatColor.style.fill = COAT_COLORS[getRandomElement(COAT_COLORS)];
});

setupWizardEyeColor.addEventListener('click', function () {
  setupWizardEyeColor.style.fill = EYE_COLORS[getRandomElement(EYE_COLORS)];
});

setupWizardFireballColor.addEventListener('click', function () {
  setupWizardFireballColor.style.backgroundColor = FIREBALL_COLORS[getRandomElement(FIREBALL_COLORS)];
});
