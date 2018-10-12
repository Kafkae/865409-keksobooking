'use strict';
(function () {
  var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MAX_USER = 8;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var minGuests = 1;
  var maxGuests = 10;
  var maxX = document.querySelector('.map').offsetWidth;

  var getRandNum = function (num) {
    return Math.floor(Math.random() * (num + 1));
  };

  var getRandInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getParameterIndex = function (array) {
    var parameterIndex = Math.floor(Math.random() * array.length);
    return array[parameterIndex];
  };

  var shuffle = function (arr) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });
  };

  shuffle(OFFER_TITLE);


  var createUserArray = function (max) {
    var userArray = [];
    for (var j = 1; j <= max; j++) {
      userArray.push(j);
    }
    return userArray;
  };

  var Users = createUserArray(MAX_USER);

  var getRandOrderArray = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var getRandomArray = function (initialArr) {
    var RandomArray = [];
    var amount = getRandNum(initialArr.length);
    for (var i = 0; i < amount; i++) {
      RandomArray.push(initialArr[i]);
    }
    return RandomArray;
  };

  var ads = [];
  var getAdsList = function () {

    var createAd = function () {
      var locationX = getRandNum(maxX);
      var locationY = getRandInRange(MIN_Y, MAX_Y);

      var ad = {
        'author': {
          'avatar': 'img/avatars/user0' + Users[i] + '.png'
        },
        'offer': {
          'title': OFFER_TITLE[i],
          'address': locationX + ', ' + locationY,
          'price': getRandInRange(MIN_PRICE, MAX_PRICE),
          'type': getParameterIndex(OFFER_TYPE),
          'rooms': getRandInRange(MIN_ROOMS, MAX_ROOMS),
          'guests': getRandInRange(minGuests, maxGuests),
          'checkin': getParameterIndex(CHECKIN),
          'checkout': getParameterIndex(CHECKOUT),
          'features': getRandomArray(FEATURES),
          'description': '',
          'photos': getRandOrderArray(PHOTOS)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };

      return ad;
    };

    for (var i = 0; i < MAX_USER; i++) {
      ads.push(createAd(i));
    }
  };

  getAdsList();

  window.data = {
    ads: ads
  };
})();
