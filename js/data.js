'use strict';

(function () {
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

  window.data = {
    adv: adv
  };
})();

