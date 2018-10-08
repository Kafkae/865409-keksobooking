'use strict';

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var pinElements = document.querySelector('.map__pins');
var inputAddress = adForm.querySelector('#address');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var apartmentTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var AdressY = {
  min: 130,
  max: 630
};

var AdressX = {
  min: 100,
  max: 600
};

var Price = {
  min: 1000,
  max: 1000000
};

var TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'palace': 'Дворец'
};

var Rooms = {
  min: 1,
  max: 5
};

var LimitsCoord = {
  minY: 130,
  maxY: 630,
  minX: 0,
  maxX: 1200
};

var Guests = {
  min: 1,
  max: 10
};

var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

var roomsFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_WIDTH = 65;

var ESC_CODE = 27;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomType = function (type) {
  var keys = Object.keys(type);
  return type[keys[keys.length * Math.random() | 0]];
};

var getRandomArrayItem = function (arr) {
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

var getRandomFeatures = function (arr) {
  var arrayFeatures = [];
  var randomArray = getRandomNumber(1, arr.length - 1);

  while (arrayFeatures.length < randomArray) {
    var randomNumber = Math.floor(Math.random() * arr.length - 1) + 1;

    var arrValue = arr[randomNumber];
    if (arrayFeatures.indexOf(arrValue) > -1) {
      continue;
    }
    arrayFeatures.push(arrValue);
  }

  return arrayFeatures;
};

var getUserAvatar = function (i) {
  var indexAvatar = i + 1;
  return 'img/avatars/user0' + indexAvatar + '.png';
};

var renderAds = function () {
  var adv = [];
  for (var i = 0; i < 8; i++) {
    var locationY = getRandomNumber(AdressY.min, AdressY.max);
    var locationX = getRandomNumber(AdressX.min, AdressX.max);
    var advData = {
      'author': {
        'avatar': getUserAvatar(i)
      },
      'offer': {
        'title': getRandomArrayItem(apartmentTitles),
        'address': (locationX + ', ' + locationY),
        'price': getRandomNumber(Price.min, Price.max),
        'type': getRandomType(TYPES),
        'rooms': getRandomNumber(Rooms.min, Rooms.max),
        'guests': getRandomNumber(Guests.min, Guests.max),
        'checkin': getRandomArrayItem(CHECKIN_TIMES),
        'checkout': getRandomArrayItem(CHECKOUT_TIMES),
        'features': getRandomFeatures(roomsFeatures),
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

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (data.location.x - PIN_WIDTH) + 'px; top: ' + (data.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.addEventListener('click', function () {
    closeCard();
    renderCard(data);
  });
  return pinElement;
};

var renderPin = function () {
  var frag = document.createDocumentFragment();
  for (var i = 0; i < adv.length; i++) {
    frag.appendChild(createPin(adv[i]));
  }
  pinElements.appendChild(frag);
};

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
  var cardTemplate = document
    .querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
  cardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = mapCard.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = '';
  for (var i = 0; i < mapCard.offer.features.length; i++) {
    cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + mapCard.offer.features[i] + '"></li>');
  } cardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
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
  map.insertBefore(fragment, document.querySelector('.map__filters-container'));
};

var closeCard = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
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
  renderPin();
};

mainPin.addEventListener('mouseup', function () {
  activateMap();
});

var fillAddress = function () {
  inputAddress.value = Math.round((mainPin.offsetTop + MAIN_PIN_HEIGHT)) + ', ' + Math.round((mainPin.offsetLeft + MAIN_PIN_WIDTH / 2));
};
fillAddress();

var roomsSelect = adForm.querySelector('#room_number');
var guestsSelect = adForm.querySelector('#capacity');

var checkRoomsCapacity = function () {
  var roomsSelectValue = parseInt(roomsSelect.value, 10);
  var guestsSelectValue = parseInt(guestsSelect.value, 10);


  if (roomsSelectValue === 1 && guestsSelectValue !== 1) {
    guestsSelect.setCustomValidity('Не больше 1 гостя');
  } else if (roomsSelectValue === 2 && guestsSelectValue !== 2 && guestsSelectValue !== 1) {
    guestsSelect.setCustomValidity('Не больше 2 гостей');
  } else if (roomsSelectValue === 3 && guestsSelectValue !== 3 && guestsSelectValue !== 2 && guestsSelectValue !== 1) {
    guestsSelect.setCustomValidity('Не больше 3 гостей');
  } else if (roomsSelectValue === 100 && guestsSelectValue !== 0) {
    guestsSelect.setCustomValidity('100 мест не для гостей');
  } else {
    guestsSelect.setCustomValidity('');
  }
};

roomsSelect.addEventListener('change', checkRoomsCapacity);
guestsSelect.addEventListener('change', checkRoomsCapacity);

adFormSubmit.addEventListener('click', checkRoomsCapacity);

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
