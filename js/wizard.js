'use strict';

(function () {
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
   * Функция, генерирующая похожего персонажа случайным образом.
   * @return {Object} - JS объект, описывающий персонажа
   */
  var generateRandomWizard = function () {
    var firstName = window.util.getRandomItem(FIRST_NAMES);
    var lastName = window.util.getRandomItem(LAST_NAMES);
    var fullName = window.util.getRandomItem([0, 1]) ? firstName + ' ' + lastName : lastName + ' ' + firstName;

    return {
      name: fullName,
      coatColor: window.util.getRandomItem(COAT_COLORS),
      eyesColor: window.util.getRandomItem(EYES_COLORS)
    };
  };

  window.wizard = {
    /**
     * Метод, возвращающий список возможных цветов глаз.
     * @return {Array.<string>} массив css-цветов
     */
    getEyesColors: function () {
      return EYES_COLORS;
    },

    /**
     * Метод, возвращающий список возможных цветов фаербола.
     * @return {Array.<string>} массив css-цветов
     */
    getFireballColors: function () {
      return FIREBALL_COLORS;
    },

    /**
     * Метод, создающий массив похожих персонажей.
     * @param {number} length - длина массива
     * @return {Array.<Object>}
     */
    getSimilarObjects: function (length) {
      var dataList = [];
      for (var i = 0; i < length; i++) {
        dataList[i] = generateRandomWizard();
      }

      return dataList;
    }
  };
})();
