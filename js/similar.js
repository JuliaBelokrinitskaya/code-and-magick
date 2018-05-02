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
  var similarWizards = [];

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

  // Отрисовка похожих персонажей
  similarWizards = window.wizard.getSimilarObjects(SIMILAR_WIZARDS_COUNT);
  window.util.renderElements(similarWizards, similarWizardsList, similarWizardTemplate, renderWizard);
  setupSimilar.classList.remove('hidden');
})();
