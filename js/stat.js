'use strict';

(function () {

  /**
   * Ширина облака
   * @const
   * @type {number}
   */
  var CLOUD_WIDTH = 420;

  /**
   * Высота облака
   * @const
   * @type {number}
   */
  var CLOUD_HEIGHT = 270;

  /**
   * X-координата левого верхнего угла облака
   * @const
   * @type {number}
   */
  var CLOUD_X = 100;

  /**
   * Y-координата левого верхнего угла облака
   * @const
   * @type {number}
   */
  var CLOUD_Y = 10;

  /**
   * Сдвиг тени от облака по горизонтали и вертикали
   * @const
   * @type {number}
   */
  var CLOUD_SHIFT = 10;

  /**
   * Параметры шрифта облака
   * @const
   * @type {string}
   */
  var CLOUD_TEXT_STYLE = '16px PT Mono';

  /**
   * Высота текстовых строк
   * @const
   * @type {number}
   */
  var TEXT_HEIGHT = 20;

  /**
   * Максимальная высота колонки гистограммы
   * @const
   * @type {number}
   */
  var BAR_MAX_HEIGHT = 150;

  /**
   * Ширина колонки гистограммы
   * @const
   * @type {number}
   */
  var BAR_WIDTH = 40;

  /**
   * Расстояние между колонками гистограммы
   * @const
   * @type {number}
   */
  var BAR_MARGIN = 50;

  /**
   * Минимальная насыщенность цвета синей колонки
   * @const
   * @type {number}
   */
  var MIN_SATURATION = 25;

  /**
   * Максимальная насыщенность цвета синей колонки
   * @const
   * @type {number}
   */
  var MAX_SATURATION = 100;

  /**
   * Минимальная светлота цвета синей колонки
   * @const
   * @type {number}
   */
  var MIN_LIGHTNESS = 30;

  /**
   * Максимальная светлота цвета синей колонки
   * @const
   * @type {number}
   */
  var MAX_LIGHTNESS = 70;

  /**
   * Цвет облака
   * @const
   * @type {string}
   */
  var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';

  /**
   * Цвет тени облака
   * @const
   * @type {string}
   */
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  /**
   * Цвет текста облака
   * @const
   * @type {string}
   */
  var TEXT_COLOR = 'rgba(0, 0, 0, 1)';

  /**
   * Цвет колонки пользователя 'Вы'
   * @const
   * @type {string}
   */
  var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

  /**
   * Функция, генерирующая синий цвет случайной насыщенности.
   * @return {string} - цвет в формате hsla
   */
  var getRandomBlueColor = function () {
    var saturation = window.util.getRandomNumber(MIN_SATURATION, MAX_SATURATION);
    var lightness = window.util.getRandomNumber(MIN_LIGHTNESS, MAX_LIGHTNESS);

    return 'hsla(240, ' + saturation + '%, ' + lightness + '%, 1)';
  };

  /**
   * Функция, отрисовывающая гистограмму.
   * @param {Object} ctx - контекст отрисовки
   * @param {number} startX - x-координата левого верхнего угла гистограммы
   * @param {number} startY - y-координата левого верхнего угла гистограммы
   * @param {Array.<string>} labels - массив с подписями
   * @param {Array.<number>} values - массив со значениями
   */
  var renderBarChart = function (ctx, startX, startY, labels, values) {
    var maxValue = window.util.findMaxItem(values);

    for (var i = 0; i < values.length; i++) {
      var barHeight = Math.round(BAR_MAX_HEIGHT * values[i] / maxValue);
      var barX = startX + (BAR_WIDTH + BAR_MARGIN) * i;
      var barY = startY + TEXT_HEIGHT + (BAR_MAX_HEIGHT - barHeight);

      ctx.fillStyle = TEXT_COLOR;
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(values[i]), barX, barY - TEXT_HEIGHT / 2);
      ctx.fillText(labels[i], barX, barY + barHeight + TEXT_HEIGHT / 2);

      ctx.fillStyle = labels[i] === 'Вы' ? USER_BAR_COLOR : getRandomBlueColor();
      ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    }
  };

  /**
   * Метод, отрисовывающий статистику игры.
   * @param {Object} ctx - контекст отрисовки
   * @param {Array.<string>} names - массив с именами игроков
   * @param {Array.<number>} times - массив с результатами игроков, совпадающий по длине с массивом names
   */
  window.renderStatistics = function (ctx, names, times) {
    // Внутренние отступы
    var cloudPaddingX = (CLOUD_WIDTH - (BAR_WIDTH + BAR_MARGIN) * names.length + BAR_MARGIN) / 2 - window.cloud.getDeflection();
    var cloudPaddingY = (CLOUD_HEIGHT - window.cloud.getDeflection() * 2 - TEXT_HEIGHT * 4 - BAR_MAX_HEIGHT) / 2;

    // Координаты содержимого
    var contentX = CLOUD_X + window.cloud.getDeflection() + cloudPaddingX;
    var contentY = CLOUD_Y + window.cloud.getDeflection() + cloudPaddingY;

    window.cloud.render(ctx, CLOUD_X + CLOUD_SHIFT, CLOUD_Y + CLOUD_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
    window.cloud.render(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

    ctx.font = CLOUD_TEXT_STYLE;
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText('Ура вы победили!', contentX, contentY);
    contentY += TEXT_HEIGHT;
    ctx.fillText('Список результатов:', contentX, contentY);
    contentY += TEXT_HEIGHT;

    renderBarChart(ctx, contentX, contentY, names, times);
  };
})();
