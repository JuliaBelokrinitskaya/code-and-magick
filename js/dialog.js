'use strict';

var setupWindow = document.querySelector('.setup');
var dialogHandle = setupWindow.querySelector('.setup-user-pic');

/**
 * Начальные координаты указателя мыши на каждом участке движения.
 * @type {Object}
 */
var startPoint = {
  x: null,
  y: null
};

/**
 * Функция, сохраняющая начальные координаты указателя мыши.
 * @param {number} startX - x-координата указателя мыши
 * @param {number} startY - y-координата указателя мыши
 */
var setStartPoint = function (startX, startY) {
  startPoint.x = startX;
  startPoint.y = startY;
};

/**
 * Функция, задающая позицию диалогового окна.
 * @param {string} left - css-значение левого отступа окна от родительского блока
 * @param {string} top - css-значение верхнего отступа окна от родительского блока
 */
var setDialogPosition = function (left, top) {
  setupWindow.style.left = left;
  setupWindow.style.top = top;
};

/**
 * Функция, подготавливающая диалоговое окно к перемещению.
 * @param {number} startX - начальная x-координата указателя мыши
 * @param {number} startY - начальная y-координата указателя мыши
 */
var startMovingDialog = function (startX, startY) {
  setStartPoint(startX, startY);

  document.addEventListener('mousemove', documentMouseMoveHandler);
  document.addEventListener('mouseup', documentMouseUpHandler);
};

/**
 * Функция, перемещающая диалоговое окно вслед за указателем мыши.
 * @param {number} endX - конечная x-координата указателя мыши
 * @param {number} endY - конечная y-координата указателя мыши
 */
var moveDialogTo = function (endX, endY) {
  var mouseShift = {
    x: endX - startPoint.x,
    y: endY - startPoint.y
  };

  var dialogPosition = {
    left: (setupWindow.offsetLeft + mouseShift.x) + 'px',
    top: (setupWindow.offsetTop + mouseShift.y) + 'px'
  };

  setDialogPosition(dialogPosition.left, dialogPosition.top);
  setStartPoint(endX, endY);
};

/**
 * Функция, завершающая перемещение диалогового окна
 */
var finishMovingDialog = function () {
  document.removeEventListener('mousemove', documentMouseMoveHandler);
  document.removeEventListener('mouseup', documentMouseUpHandler);
};

/**
 * Обработчик перемещения мыши
 * @param {Object} evt - объект события
 */
var documentMouseMoveHandler = function (evt) {
  evt.preventDefault();
  moveDialogTo(evt.clientX, evt.clientY);
};

/**
 * Обработчик отжатия мыши
 * @param {Object} evt - объект события
 */
var documentMouseUpHandler = function (evt) {
  evt.preventDefault();
  finishMovingDialog();
};

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  startMovingDialog(evt.clientX, evt.clientY);
});

/**
 * Метод, возвращающий диалоговое окно в исходную позицию.
 */
window.resetDialogPosition = function () {
  setDialogPosition('', '');
};
