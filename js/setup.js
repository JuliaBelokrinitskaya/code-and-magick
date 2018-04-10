'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

/**
 * Функция, показывающая скрытый элемент.
 * @param {Object} element - DOM-элемент с классом 'hidden'
 */
var showElement = function (element) {
  element.classList.remove('hidden');
};

/**
 * Функция, выбирающая случайный элемент в массиве.
 * @param {Array.<*>} items - массив элементов
 * @return {*} - случайный элемент массива
 */
var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Функция, генерирующая похожего персонажа случайным образом.
 * @callback generateItemCallback
 * @return {Object} - JS объект, описывающий персонажа
 */
var generateWizard = function () {
  var firstName = getRandomItem(FIRST_NAMES);
  var lastName = getRandomItem(LAST_NAMES);
  var fullName = getRandomItem([0, 1]) ? firstName + ' ' + lastName : lastName + ' ' + firstName;

  return {
    name: fullName,
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS)
  };
};

/**
 * Функция, создающая массив объектов.
 * @param {generateItemCallback} generateItem - функция, генерирующая объект
 * @param {number} length - длина массива
 * @return {Array.<Object>}
 */
var generateDataList = function (generateItem, length) {
  var dataList = [];
  for (var i = 0; i < length; i++) {
    dataList[i] = generateItem();
  }

  return dataList;
};

/**
 * Функция, создающая DOM-элемент, соответствующй похожему персонажу.
 * @callback renderItemCallback
 * @param {Object} wizard - объект, описывающий похожего персонажа
 * @param {Object} wizardTemplate - шаблон похожего персонажа
 * @return {Object} - DOM-элемент
 */
var renderWizard = function (wizard, wizardTemplate) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Функция, отрисовывающая массив DOM-элементов.
 * @param {Array.<Object>} dataList - массив объектов, содержащий данные элементов
 * @param {Object} parentElement - родительский DOM-элемент, в котором будут отрисованы элементы
 * @param {Object} template - шаблон элемента
 * @param {renderItemCallback} renderItem - функция, создающая DOM-элемент
 */
var renderElements = function (dataList, parentElement, template, renderItem) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) {
    fragment.appendChild(renderItem(dataList[i], template));
  }
  parentElement.appendChild(fragment);
};

var setupWindow = document.querySelector('.setup');
showElement(setupWindow);

var similarWizardsList = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = generateDataList(generateWizard, 4);
renderElements(wizards, similarWizardsList, similarWizardTemplate, renderWizard);

showElement(document.querySelector('.setup-similar'));