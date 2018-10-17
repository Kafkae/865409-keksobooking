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
  var renderPin = function (adv) {
    var allPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.remove();
    });
    adv.slice(0, PINS_COUNT).forEach(function (element) {
      mapPins.appendChild(createPin(element));
    });
    mapPins.appendChild(fragment);
  };

  var closePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var wrapper = document.querySelector('.map__pins');
    [].forEach.call(pins, function (element) {
      wrapper.removeChild(element);
    });
  };

  window.pin = {
    renderPin: renderPin,
    closePins: closePins
  };
})();
