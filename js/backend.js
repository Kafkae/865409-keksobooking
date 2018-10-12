'use strict';
(function () {
  var POST = 'https://js.dump.academy/keksobooking';
  var GET = POST + '/data';
  var SUCCESS = 200;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', GET);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        var data = xhr.response;
        window.ads = data;
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
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

    xhr.timeout = 10000;
    xhr.open('POST', POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
  };
})();
