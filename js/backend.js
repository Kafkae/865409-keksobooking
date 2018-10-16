'use strict';

(function () {
  var POST = 'https://js.dump.academy/keksobooking';
  var GET = POST + '/data';
  var SUCCESS = 200;
  var TIMEOUT = 1000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        var data = xhr.response;
        window.ads = data;
        onLoad(xhr.response);
      } else {
        onError('Непредвиденная ошибка', 'Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('GET', GET);
    xhr.send();
  };


  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('При отправке данных произошла ошибка.', 'Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', POST);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };
})();
