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
var CLOUD_DEFLECTION = 20;

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

  renderCloud(ctx, CLOUD_X + CLOUD_SHIFT, CLOUD_Y + CLOUD_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(255, 255, 255, 1)');

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
