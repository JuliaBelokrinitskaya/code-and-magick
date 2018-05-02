'use strict';

(function () {
  var setupWindow = window.dialog.getElement();
  var setupArtifactsShop = setupWindow.querySelector('.setup-artifacts-shop');
  var setupArtifacts = setupWindow.querySelector('.setup-artifacts');
  var draggedItem = null;

  /**
   * Функция, определяющая, является ли элемент изображением.
   * @param {Object} target - DOM-элемент
   * @return {boolean}
   */
  var isImageElement = function (target) {
    return target.tagName.toLowerCase() === 'img';
  };

  /**
   * Функция, определяющая, является ли перетаскивание элемента в данное место допустимым.
   * @param {Object} target - DOM-элемент - место, куда перетаскивается элемент
   * @return {boolean}
   */
  var isValidDragAndDrop = function (target) {
    return draggedItem && !isImageElement(target) && !target.children.length;
  };

  /**
   * Функция, отрисовывающая рамку на зоне, в которую можно перетащить элемент.
   * @param {string} outlineStyle - CSS-стиль рамки или пустая строка (для снятия рамки)
   */
  var outlineDropZone = function (outlineStyle) {
    setupArtifacts.style.outline = outlineStyle;
  };

  /**
   * Функция, устанавливающая выделение места, над которым перетаскивается элемент.
   * @param {Object} target - DOM-элемент - место, над которым перетаскивается элемент
   * @param {string} color - CSS-цвет или пустая строка (для снятия выделения)
   */
  var highlightDropTarget = function (target, color) {
    target.style.backgroundColor = color;
  };

  /**
   * Функция, подготавливающая перемещение элемента.
   * @param {Object} target - DOM-элемент - перетаскиваемый элемент
   * @param {Object} dataTransfer - объект передачи данных
   */
  var startDraggingItem = function (target, dataTransfer) {
    if (isImageElement(target)) {
      draggedItem = target.cloneNode(true);
      dataTransfer.setData('text/plain', target.alt);
      outlineDropZone('2px dashed red');
    }
  };

  /**
   * Функция, завершающая перемещение элемента.
   */
  var finishDraggingItem = function () {
    if (draggedItem) {
      draggedItem = null;
      outlineDropZone('');
    }
  };

  /**
   * Функция, разрешающая перемещение объекта в правильное место
   * @param {Object} evt - объект события
   */
  var validateDropping = function (evt) {
    if (isValidDragAndDrop(evt.target)) {
      evt.preventDefault();
    }
  };

  /**
   * Функция, устанавливающая выделение ячейки, над которой перетаскивается элемент.
   * @param {Object} target - DOM-элемент - ячейка, над которой перетаскивается элемент
   * @param {string} color - CSS-цвет или пустая строка (для снятия выделения)
   */
  var highlightCellOnDragging = function (target, color) {
    if (isValidDragAndDrop(target)) {
      highlightDropTarget(target, color);
    }
  };

  /**
   * Функция, перемещающая элемент в указанную ячейку.
   * @param {Object} target - DOM-элемент - ячейка, в которую перетаскивается элемент
   */
  var dropItem = function (target) {
    highlightDropTarget(target, '');
    target.appendChild(draggedItem);
  };

  // Перетаскивание предметов из магазина
  setupArtifactsShop.addEventListener('dragstart', function (evt) {
    startDraggingItem(evt.target, evt.dataTransfer);
  });

  setupArtifactsShop.addEventListener('dragend', function (evt) {
    finishDraggingItem();
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    validateDropping(evt);
    return false;
  });

  setupArtifacts.addEventListener('dragenter', function (evt) {
    highlightCellOnDragging(evt.target, 'yellow');
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('dragleave', function (evt) {
    highlightCellOnDragging(evt.target, '');
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('drop', function (evt) {
    dropItem(evt.target);
    evt.preventDefault();
  });
})();
