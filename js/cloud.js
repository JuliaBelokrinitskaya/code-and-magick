'use strict';

(function () {
  /**
   * Размер впадин облака
   * @const
   * @type {number}
   */
  var CLOUD_DEFLECTION = 18;

  window.cloud = {
    /**
     * Метод, возвращающий размер впадин облака
     * @return {number}
     */
    getDeflection: function () {
      return CLOUD_DEFLECTION;
    },

    /**
     * Метод, отрисовывающий облако.
     * @param {Object} ctx - контекст отрисовки
     * @param {number} startX - x-координата левого верхнего угла
     * @param {number} startY - y-координата левого верхнего угла
     * @param {number} width - габаритная ширина облака
     * @param {number} height - габаритная высота облака
     * @param {string} color - цвет облака
     */
    render: function (ctx, startX, startY, width, height, color) {
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
    }
  };
})();
