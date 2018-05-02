'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    /**
     * Метод, проверяющий нажатие клавиши Esc
     * @param {Object} evt - объект события
     * @return {boolean}
     */
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },

    /**
     * Метод, проверяющий нажатие клавиши Enter
     * @param {Object} evt - объект события
     * @return {boolean}
     */
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    /**
     * Метод, определяющий наибольший элемент в массиве.
     * @param {Array.<number>} items - числовой массив
     * @return {number} - наибольшее значение в массиве
     */
    findMaxItem: function (items) {
      var maxItem = items[0];

      for (var i = 1; i < items.length; i++) {
        if (items[i] > maxItem) {
          maxItem = items[i];
        }
      }

      return maxItem;
    },

    /**
     * Метод, выбирающий случайное число из заданного промежутка.
     * @param {number} minValue - минимальное число
     * @param {number} maxValue - максимальное число
     * @return {number} - случайное число из заданного промежутка,
     * включая minValue и maxValue
     */
    getRandomNumber: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    },

    /**
     * Метод, выбирающий случайный элемент в массиве.
     * @param {Array.<*>} items - массив элементов
     * @return {*} - случайный элемент массива
     */
    getRandomItem: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    /**
     * Метод, отрисовывающий массив DOM-элементов.
     * @param {Array.<Object>} dataList - массив объектов, содержащий данные элементов
     * @param {Object} parentElement - родительский DOM-элемент, в котором будут отрисованы элементы
     * @param {Object} template - шаблон элемента
     * @param {renderItemCallback} renderItem - функция, создающая DOM-элемент
     */
    renderElements: function (dataList, parentElement, template, renderItem) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < dataList.length; i++) {
        fragment.appendChild(renderItem(dataList[i], template));
      }
      parentElement.appendChild(fragment);
    }
  };
})();
