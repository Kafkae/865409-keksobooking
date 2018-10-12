'use strict';
(function () {
  var PINS_COUNT = 5;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (data.location.x - window.map.mainPinWidth) + 'px; top: ' + (data.location.y - window.map.mainPinHeight) + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.closeCard();
      window.card.renderCard(data);
    });
    return pinElement;
  };


  var fragment = document.createDocumentFragment();
  var renderPin = function () {
    var allPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.remove();
    });
    for (var i = 0; i < PINS_COUNT; i++) {
      if (window.ads[i]) {
        fragment.appendChild(createPin(window.ads[i], i));
      }
    }
    mapPins.appendChild(fragment);
  };
  window.pin = {
    renderPin: renderPin
  };
})();
