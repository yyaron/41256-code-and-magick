'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

//  делаем видимым основное окно персонажа
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
