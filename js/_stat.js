'use strict';

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
 * Размер отклонения середин сторон облака
 * @const
 * @type {number}
 */
var CLOUD_DEFLECTION = 18;

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
 * Функция, отрисовывающая облако.
 * @param {Object} ctx - контекст отрисовки
 * @param {number} startX - x-координата левого верхнего угла
 * @param {number} startY - y-координата левого верхнего угла
 * @param {number} width - габаритная ширина облака
 * @param {number} height - габаритная высота облака
 * @param {string} color - цвет облака
 */
var renderCloud = function (ctx, startX, startY, width, height, color) {
  // координаты правого нижнего угла облака
  var endX = startX + width;
  var endY = startY + height;

  // точки излома
  var points = [
    {
      x: startX + width * 0.7,
      y: startY + CLOUD_DEFLECTION
    },
    {
      x: endX - CLOUD_DEFLECTION,
      y: startY + height * 0.4
    },
    {
      x: startX + width * 0.6,
      y: endY - CLOUD_DEFLECTION
    },
    {
      x: startX + CLOUD_DEFLECTION,
      y: startY + height * 0.5
    }
  ];

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.bezierCurveTo(points[0].x, points[0].y, startX + width * 0.75, startY, startX + width * 0.85, startY);
  ctx.bezierCurveTo(startX + width * 0.95, startY, endX, startY + height * 0.1, endX, startY + height * 0.2);
  ctx.bezierCurveTo(endX, startY + height * 0.3, points[1].x, points[1].y, points[1].x, points[1].y);
  ctx.bezierCurveTo(points[1].x, points[1].y, endX, startY + height * 0.5, endX, startY + height * 0.7);
  ctx.bezierCurveTo(endX, startY + height * 0.9, startX + width * 0.95, endY, startX + width * 0.8, endY);
  ctx.bezierCurveTo(startX + width * 0.65, endY, points[2].x, points[2].y, points[2].x, points[2].y);
  ctx.bezierCurveTo(points[2].x, points[2].y, startX + width * 0.5, endY, startX + width * 0.3, endY);
  ctx.bezierCurveTo(startX + width * 0.1, endY, startX, startY + height * 0.95, startX, startY + height * 0.75);
  ctx.bezierCurveTo(startX, startY + height * 0.55, points[3].x, points[3].y, points[3].x, points[3].y);
  ctx.bezierCurveTo(points[3].x, points[3].y, startX, startY + height * 0.4, startX, startY + height * 0.2);
  ctx.bezierCurveTo(startX, startY, startX + width * 0.15, startY, startX + width * 0.4, startY);
  ctx.bezierCurveTo(startX + width * 0.65, startY, points[0].x, points[0].y, points[0].x, points[0].y);
  ctx.closePath();
  ctx.fill();
};

/**
 * Функция, определяющая наибольший элемент в массиве.
 * @param {Array.<number>} items - числовой массив
 * @return {number} - наибольшее значение в массиве
 */
var findMaxItem = function (items) {
  var maxItem = items[0];

  for (var i = 1; i < items.length; i++) {
    if (items[i] > maxItem) {
      maxItem = items[i];
    }
  }

  return maxItem;
};

/**
 * Функция, выбирающая случайное число из заданного промежутка.
 * @param {number} minValue - минимальное число
 * @param {number} maxValue - максимальное число
 * @return {number} - случайное число из заданного промежутка,
 * включая minValue и maxValue
 */
var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/**
 * Функция, генерирующая синий цвет случайной насыщенности.
 * @return {string} - цвет в формате hsla
 */
var getRandomBlueColor = function () {
  var saturation = getRandomNumber(MIN_SATURATION, MAX_SATURATION);
  var lightness = getRandomNumber(MIN_LIGHTNESS, MAX_LIGHTNESS);

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
  var maxValue = findMaxItem(values);

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
 * Отрисовка статистики.
 * @param {Object} ctx - контекст отрисовки
 * @param {Array.<string>} names - массив с именами игроков
 * @param {Array.<number>} times - массив с результатами игроков, совпадающий по длине с массивом names
 */
window.renderStatistics = function (ctx, names, times) {
  // Внутренние отступы
  var cloudPaddingX = (CLOUD_WIDTH - (BAR_WIDTH + BAR_MARGIN) * names.length + BAR_MARGIN) / 2 - CLOUD_DEFLECTION;
  var cloudPaddingY = (CLOUD_HEIGHT - CLOUD_DEFLECTION * 2 - TEXT_HEIGHT * 4 - BAR_MAX_HEIGHT) / 2;

  // Координаты содержимого
  var contentX = CLOUD_X + CLOUD_DEFLECTION + cloudPaddingX;
  var contentY = CLOUD_Y + CLOUD_DEFLECTION + cloudPaddingY;

  renderCloud(ctx, CLOUD_X + CLOUD_SHIFT, CLOUD_Y + CLOUD_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.font = CLOUD_TEXT_STYLE;
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Ура вы победили!', contentX, contentY);
  contentY += TEXT_HEIGHT;
  ctx.fillText('Список результатов:', contentX, contentY);
  contentY += TEXT_HEIGHT;

  renderBarChart(ctx, contentX, contentY, names, times);
};
