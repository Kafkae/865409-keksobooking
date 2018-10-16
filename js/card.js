'use strict';

(function () {
  var ESC_CODE = 27;

  var TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };
  var renderPhotos = function (photo) {
    var photosFragment = document.createDocumentFragment();
    photo.forEach(function (element) {
      var photosTemplate = document
        .querySelector('#card')
        .content
        .querySelector('.popup__photos');
      var photosElement = photosTemplate.cloneNode(true);
      var PhotoSize = {
        width: 60,
        height: 60
      };
      photosElement.querySelector('img').src = element;
      photosElement.querySelector('img').height = PhotoSize.height;
      photosElement.querySelector('img').width = PhotoSize.width;
      photosFragment.appendChild(photosElement);
    });

    return photosFragment;
  };

  var createCard = function (mapCard) {
    var cardTemplate = document
      .querySelector('#card')
      .content
      .querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
    cardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPES[mapCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = '';
    mapCard.offer.features.forEach(function (element) {
      cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + element + '"></li>');
    }); cardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
    cardElement.querySelector('.popup__photos').textContent = '';
    cardElement.querySelector('.popup__photos').appendChild(renderPhotos(mapCard.offer.photos));

    cardElement.querySelector('.popup__close').addEventListener('click', closeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        closeCard();
      }
    });
    return cardElement;
  };

  var renderCard = function (card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(card));
    window.map.mapKeks.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    renderCard: renderCard,
    closeCard: closeCard
  };
})();
