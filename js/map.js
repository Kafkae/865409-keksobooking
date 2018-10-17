'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPin = document.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');
  var inputAddress = document.querySelector('#address');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var DELAY = 500;

  var LimitsCoord = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1200
  };

  var onActive = function () {
    mainPin.addEventListener('mousedown', activateMap);
  };

  var fillAddress = function () {
    inputAddress.value = Math.round((mainPin.offsetTop + MAIN_PIN_HEIGHT)) + ', ' + Math.round((mainPin.offsetLeft + MAIN_PIN_WIDTH / 2));
  };
  fillAddress();

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftPosEnd = mainPin.offsetLeft - shift.x;
      var topPosEnd = mainPin.offsetTop - shift.y;

      if (LimitsCoord.minX - MAIN_PIN_WIDTH / 2 >= leftPosEnd) {
        leftPosEnd = LimitsCoord.minX - MAIN_PIN_WIDTH / 2 + 'px';
      } else if (LimitsCoord.maxX - MAIN_PIN_WIDTH / 2 <= leftPosEnd) {
        leftPosEnd = LimitsCoord.maxX - MAIN_PIN_WIDTH / 2 + 'px';
      } else {
        leftPosEnd = leftPosEnd + 'px';
      }
      mainPin.style.left = leftPosEnd;

      if (LimitsCoord.minY - MAIN_PIN_WIDTH >= topPosEnd) {
        topPosEnd = LimitsCoord.minY - MAIN_PIN_WIDTH + 'px';
      } else if (LimitsCoord.maxY - MAIN_PIN_WIDTH <= topPosEnd) {
        topPosEnd = LimitsCoord.maxY - MAIN_PIN_WIDTH + 'px';
      } else {
        topPosEnd = topPosEnd + 'px';
      }
      mainPin.style.top = topPosEnd;

      fillAddress();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  [].forEach.call(adForm, function (element) {
    element.disabled = true;
  });

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    [].forEach.call(adForm, function (element) {
      element.disabled = false;
    });
    mainPin.removeEventListener('mousedown', activateMap);
    window.backend.load(window.pin.renderPin, onError);
  };

  onActive();

  var onError = function (errorText) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.textContent = errorText;
    main.appendChild(errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
  };
  var onSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    successElement.addEventListener('mousedown', closeSuccess);
    main.appendChild(successElement);
    document.addEventListener('keydown', closeSuccess);
  };

  var closeSuccess = function () {
    var successElement = document.querySelector('.success');
    main.removeChild(successElement);
    document.removeEventListener('keydown', closeSuccess);
  };

  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
  };
  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, DELAY);
    };
  };
  var onFilter = function (evt) {
    evt.preventDefault();
    window.pin.closePins();
    window.card.closeCard();
    window.filter.filterPin(window.ads);
  };

  filters.addEventListener('change', debounce(onFilter));

  window.map = {
    mapPin: mapPin,
    mapKeks: map,
    adress: inputAddress,
    adForm: adForm,
    mainPin: mainPin,
    main: main,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinWidth: MAIN_PIN_WIDTH,
    map: map,
    mapPins: mapPins,
    onSuccess: onSuccess,
    onError: onError,
    closeError: closeError,
    fillAddress: fillAddress,
    onActive: onActive
  };
})();
