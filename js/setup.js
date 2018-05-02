'use strict';

(function () {
  var setupWindow = window.dialog.getElement();
  var setupWizard = setupWindow.querySelector('.setup-wizard');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var eyesColorField = setupWindow.querySelector('[name=eyes-color]');
  var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');
  var fireballColorField = setupFireball.querySelector('[name=fireball-color]');

  var eyesColors = window.wizard.getEyesColors();
  var fireballColors = window.wizard.getFireballColors();
  var eyesColorValue = eyesColorField.value;
  var eyesColorIndex = eyesColors.indexOf(eyesColorValue);
  var fireballColorValue = fireballColorField.value;
  var fireballColorIndex = fireballColors.indexOf(fireballColorValue);

  /**
   * Функция, определяющая следующий индекс элемента массива по кругу.
   * @param {Array.<*>} items - массив элементов
   * @param {number} currentIndex - индекс текущего элемента
   * @return {number} - индекс следующего элемента (по кругу)
   */
  var getNextIndex = function (items, currentIndex) {
    return ++currentIndex % items.length;
  };

  /**
   * Функция, меняющая цвет глаз по порядку.
   */
  var changeEyesColor = function () {
    eyesColorIndex = getNextIndex(eyesColors, eyesColorIndex);
    eyesColorValue = eyesColors[eyesColorIndex];

    setupWizardEyes.style.fill = eyesColorValue;
    eyesColorField.value = eyesColorValue;
  };

  /**
   * Функция, меняющая цвет фаербола по порядку.
   */
  var changeFireballColor = function () {
    fireballColorIndex = getNextIndex(fireballColors, fireballColorIndex);
    fireballColorValue = fireballColors[fireballColorIndex];

    setupFireball.style.background = fireballColorValue;
    fireballColorField.value = fireballColorValue;
  };

  // Выбор цвета глаз
  setupWizardEyes.addEventListener('click', function () {
    changeEyesColor();
  });

  // Выбор цвета фаербола
  setupFireball.addEventListener('click', function () {
    changeFireballColor();
  });
})();
