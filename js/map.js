'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;

  var LimitsCoord = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1200
  };

  for (var i = 0; i < adForm.length; i += 1) {
    adForm[i].disabled = true;
  }

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < adForm.length; j += 1) {
      adForm[j].disabled = false;
    }
    window.pin.renderPin();
  };

  mainPin.addEventListener('mouseup', function () {
    activateMap();
  });

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

  window.map = {
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinWidth: MAIN_PIN_WIDTH,
    mapKeks: map,
    adForm: adForm
  };
})();
