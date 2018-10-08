'use strict';

(function () {
  var pinElements = document.querySelector('.map__pins');
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

  var renderPin = function () {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < window.data.adv.length; i++) {
      frag.appendChild(createPin(window.data.adv[i]));
    }
    pinElements.appendChild(frag);
  };

  window.pin = {
    renderPin: renderPin
  };
})();
