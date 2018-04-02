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
var CLOUD_DEFLECTION = 10;

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
 * Высота текстовых строк
 * @const
 * @type {number}
 */
var TEXT_HEIGHT = 20;

/**
 * Функция, отрисовывающая облако.
 * @param {Object} ctx - контекст отрисовки
 * @param {number} startX - x-координата левого верхнего угла
 * @param {number} startY - y-координата левого верхнего угла
 * @param {string} color - цвет облака
 */
var renderCloud = function (ctx, startX, startY, color) {
  // координаты центра облака
  var centerX = startX + CLOUD_WIDTH / 2;
  var centerY = startY + CLOUD_HEIGHT / 2;

  // координаты правого нижнего угла облака
  var endX = startX + CLOUD_WIDTH;
  var endY = startY + CLOUD_HEIGHT;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(centerX, startY + CLOUD_DEFLECTION);
  ctx.lineTo(endX, startY);
  ctx.lineTo(endX - CLOUD_DEFLECTION, centerY);
  ctx.lineTo(endX, endY);
  ctx.lineTo(centerX, endY - CLOUD_DEFLECTION);
  ctx.lineTo(startX, endY);
  ctx.lineTo(startX + CLOUD_DEFLECTION, centerY);
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
 * Отрисовка статистики.
 * @param {Object} ctx - контекст отрисовки
 * @param {Array.<string>} names - массив с именами игроков
 * @param {Array.<number>} times - массив с результатами игроков, совпадающий по длине с массивом names
 */
window.renderStatistics = function (ctx, names, times) {
  // Внутренние отступы
  var cloudPaddingX = (CLOUD_WIDTH - CLOUD_DEFLECTION * 2 - (BAR_WIDTH + BAR_MARGIN) * names.length) / 2;
  var cloudPaddingY = (CLOUD_HEIGHT - CLOUD_DEFLECTION * 2 - TEXT_HEIGHT * 4 - BAR_MAX_HEIGHT) / 2;

  // Координаты содержимого
  var contentX = CLOUD_X + CLOUD_DEFLECTION + cloudPaddingX;
  var contentY = CLOUD_Y + CLOUD_DEFLECTION + cloudPaddingY;

  var maxTime = findMaxItem(times);

  renderCloud(ctx, CLOUD_X + CLOUD_SHIFT, CLOUD_Y + CLOUD_SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText('Ура вы победили!', contentX, contentY);
  contentY += TEXT_HEIGHT;
  ctx.fillText('Список результатов:', contentX, contentY);
  contentY += TEXT_HEIGHT;

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.round(150 * times[i] / maxTime);
    var barX = contentX + (BAR_WIDTH + BAR_MARGIN) * i;
    var barY = contentY + TEXT_HEIGHT + (150 - barHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(times[i]), barX, barY - TEXT_HEIGHT / 2);
    ctx.fillText(names[i], barX, barY + barHeight + TEXT_HEIGHT / 2);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.floor(25 + Math.random() * 75);
      var lightness = Math.floor(30 + Math.random() * 40);
      ctx.fillStyle = 'hsla(240, ' + saturation + '%, ' + lightness + '%, 1)';
    }
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  }
};
