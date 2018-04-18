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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

/**
 * Количество похожих персонажей
 * @const
 * @type {number}
 */
var SIMILAR_WIZARDS_COUNT = 4;

/**
 * Код клавиши Escape
 * @const
 * @type {number}
 */
var ESC_KEYCODE = 27;

/**
 * Код клавиши Enter
 * @const
 * @type {number}
 */
var ENTER_KEYCODE = 13;

var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var setupWizard = setupWindow.querySelector('.setup-wizard');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var eyesColorField = setupWindow.querySelector('[name=eyes-color]');
var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');
var fireballColorField = setupFireball.querySelector('[name=fireball-color]');
var setupSimilar = setupWindow.querySelector('.setup-similar');
var similarWizardsList = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var eyesColorValue = eyesColorField.value;
var eyesColorIndex = EYES_COLORS.indexOf(eyesColorValue);
var fireballColorValue = fireballColorField.value;
var fireballColorIndex = FIREBALL_COLORS.indexOf(fireballColorValue);

var similarWizards = [];

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
 * @return {Object} - JS объект, описывающий персонажа
 */
var generateRandomWizard = function () {
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
 * Функция, создающая массив персонажей.
 * @param {number} length - длина массива
 * @return {Array.<Object>}
 */
var getWizardsList = function (length) {
  var dataList = [];
  for (var i = 0; i < length; i++) {
    dataList[i] = generateRandomWizard();
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

/**
 * Функция, показывающая окно настройки персонажа.
 */
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');

  setupOpen.removeEventListener('click', openSetupClickHandler);
  setupOpenIcon.removeEventListener('keydown', openSetupEnterPressHandler);

  document.addEventListener('keydown', setupWindowEscPressHandler);
};

/**
 * Функция, скрывающая окно настройки персонажа.
 */
var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');

  setupOpen.addEventListener('click', openSetupClickHandler);
  setupOpenIcon.addEventListener('keydown', openSetupEnterPressHandler);

  document.removeEventListener('keydown', setupWindowEscPressHandler);
};

/**
 * Функция, определяющая следующий индекс элемента массива по кругу.
 * @param {Array.<*>} items - массив элементов
 * @param {number} currentIndex - индекс текущего элемента
 * @return {number} - индекс следующего элемента (по кругу)
 */
var getNextIndex = function (items, currentIndex) {
  return (currentIndex + 1) % items.length;
};

/**
 * Функция, меняющая цвет глаз по порядку.
 */
var changeEyesColor = function () {
  eyesColorIndex = getNextIndex(EYES_COLORS, eyesColorIndex);
  eyesColorValue = EYES_COLORS[eyesColorIndex];

  setupWizardEyes.style.fill = eyesColorValue;
  eyesColorField.value = eyesColorValue;
};

/**
 * Функция, меняющая цвет фаербола по порядку.
 */
var changeFireballColor = function () {
  fireballColorIndex = getNextIndex(FIREBALL_COLORS, fireballColorIndex);
  fireballColorValue = FIREBALL_COLORS[fireballColorIndex];

  setupFireball.style.background = fireballColorValue;
  fireballColorField.value = fireballColorValue;
};

var openSetupClickHandler = function () {
  openSetupWindow();
};

var openSetupEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
};

var setupWindowEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closeSetupWindow();
  }
};

similarWizards = getWizardsList(SIMILAR_WIZARDS_COUNT);
renderElements(similarWizards, similarWizardsList, similarWizardTemplate, renderWizard);
setupSimilar.classList.remove('hidden');

setupOpen.addEventListener('click', openSetupClickHandler);
setupOpenIcon.addEventListener('keydown', openSetupEnterPressHandler);

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

setupWizardEyes.addEventListener('click', function () {
  changeEyesColor();
});

setupFireball.addEventListener('click', function () {
  changeFireballColor();
});
