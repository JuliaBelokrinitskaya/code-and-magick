'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/code-and-magick/data';
  var SUBMIT_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 10000; // 10 секунд

  /**
   * Функция, выполняющая запрос к серверу.
   * @param {string} requestMethod - метод запроса
   * @param {string} requestURL - URL запроса
   * @param {onLoadCallback} onLoad - обработчик успешной загрузки
   * @param {onErrorCallback} onError - обработчик ошибок
   * @param {Object} data - данные для отправки на сервер
   */
  var request = function (requestMethod, requestURL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(requestMethod, requestURL);
    xhr.send(data);
  };

  window.backend = {
    /**
     * Метод, выполняющий загрузку данных с сервера.
     * @param {onLoadCallback} onLoad - обработчик успешной загрузки
     * @param {onErrorCallback} onError - обработчик ошибок
     */
    load: function (onLoad, onError) {
      request('GET', DATA_URL, onLoad, onError);
    },

    /**
     * Метод, выполняющий отправку данных на сервер.
     * @param {Object} data - данные для отправки
     * @param {onLoadCallback} onLoad - обработчик успешной загрузки
     * @param {onErrorCallback} onError - обработчик ошибок
     */
    save: function (data, onLoad, onError) {
      request('POST', SUBMIT_URL, onLoad, onError, data);
    }
  };
})();
