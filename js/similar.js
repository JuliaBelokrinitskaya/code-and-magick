'use strict';

(function () {
  /**
   * Количество похожих персонажей
   * @const
   * @type {number}
   */
  var SIMILAR_WIZARDS_COUNT = 4;

  var setupWindow = window.dialog.getElement();
  var setupSimilar = setupWindow.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = setupWindow.querySelector('.setup-similar-list');

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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * Обработчик успешной загрузки данных о похожих персонажах. Отрисовывает похожих персонажей.
   * @callback onLoadCallback
   * @param {Array.<Object>} wizards - массив с данными о похожих персонажах
   */
  var loadHandler = function (wizards) {
    var similarWizards = wizards.slice(0, SIMILAR_WIZARDS_COUNT);
    window.util.renderElements(similarWizards, similarWizardsList, similarWizardTemplate, renderWizard);
  };

  // Отрисовка похожих персонажей
  window.backend.load(loadHandler, window.util.showError);
  setupSimilar.classList.remove('hidden');
})();
