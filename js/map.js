'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADRESS_Y = {
  min: 130,
  max: 630
};

var ADRESS_X = {
  min: 100,
  max: 600
};

var PRICE = {
  min: 1000,
  max: 1000000
};

var TYPE_ROOMS = ['flat', 'house', 'bungalo', 'palace'];


var ROOMS = {
  min: 1,
  max: 5
};

var GUESTS = {
  min: 1,
  max: 10
};

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArr = function (arr) {
  return arr[Math.random() * arr.length | 0];
};

var getShufflingArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
};

var getRandomElemArr = function (array) {
  var clone = array.slice();
  clone.length = getRandomNum(1, array.length);
  return clone;
};

var getUserAvatar = function (i) {
  var indexAvatar = i + 1;
  return 'img/avatars/user0' + indexAvatar + '.png';
};


var getTranslateType = function (type) {
  if (type === 'flat') {
    type = 'Квартира';
  } else if (type === 'bungalo') {
    type = 'Бунгало';
  } else if (type === 'house') {
    type = 'Дом';
  } else if (type === 'palace') {
    type = 'Дворец';
  }
  return type;
};

// Генерация объектов palace
var renderAds = function () {
  var adv = [];
  for (var i = 0; i < 8; i++) {
    var locationY = getRandomNum(ADRESS_Y.min, ADRESS_Y.max);
    var locationX = getRandomNum(ADRESS_X.min, ADRESS_X.max);
    var advData = {
      'author': {
        'avatar': getUserAvatar(i)
      },
      'offer': {
        'title': getRandomArr(TITLE),
        'address': (locationX + ', ' + locationY),
        'price': getRandomNum(PRICE.min, PRICE.max),
        'type': getRandomArr(TYPE_ROOMS),
        'rooms': getRandomNum(ROOMS.min, ROOMS.max),
        'guests': getRandomNum(GUESTS.min, GUESTS.max),
        'checkin': getRandomArr(CHECKIN),
        'checkout': getRandomArr(CHECKOUT),
        'features': getRandomElemArr(FEATURES),
        'description': '',
        'photos': getShufflingArray(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    adv.push(advData);
  }
  return adv;
};

var adv = renderAds();

var pinTemplate = document
  .querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pinElements = document.querySelector('.map__pins');

var createPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (data.location.x - PIN_WIDTH) + 'px; top: ' + (data.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  return pinElement;
};

var renderPin = function () {
  var frag = document.createDocumentFragment();
  for (var i = 0; i < adv.length; i++) {
    frag.appendChild(createPin(adv[i]));
  }
  pinElements.appendChild(frag);
};

renderPin();

var renderPhotos = function (photo) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photo.length; i++) {
    var photosTemplate = document
      .querySelector('#card')
      .content
      .querySelector('.popup__photos');
    var photosElement = photosTemplate.cloneNode(true);
    photosElement.querySelector('img').src = photo[i];
    photosElement.querySelector('img').height = 60;
    photosElement.querySelector('img').width = 60;
    photosFragment.appendChild(photosElement);
  }
  return photosFragment;
};

var createCard = function (mapCard) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
  cardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTranslateType(mapCard.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = '';
  for (var i = 0; i < mapCard.offer.features.length; i++) {
    cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + mapCard.offer.features[i] + '"></li>');
  } cardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
  cardElement.querySelector('.popup__photos').textContent = '';
  cardElement.querySelector('.popup__photos').appendChild(renderPhotos(mapCard.offer.photos));

  return cardElement;
};

var renderCard = function () {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(adv[0]));
  map.insertBefore(cardFragment, document.querySelector('.map__filter-container'));
};

renderCard();

