'use strict';

(function () {
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
    }
  };
})();
