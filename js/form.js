'use strict';

(function () {
  var roomsSelect = window.map.adForm.querySelector('#room_number');
  var guestsSelect = window.map.adForm.querySelector('#capacity');
  var adFormTimeiin = window.map.adForm.querySelector('#timein');
  var adFormTimeout = window.map.adForm.querySelector('#timeout');
  var priceForm = window.map.adForm.querySelector('#price');
  var typeOfHouse = document.querySelector('#type');
  var adFormSubmit = window.map.adForm.querySelector('.ad-form__submit');
  var cleanButton = window.map.adForm.querySelector('.ad-form__reset');
  var MainPinCoords = {
    CoordTop: '375px',
    CoordLeft: '570px'
  };
  var onReset = function () {
    window.map.adForm.reset();
    window.filtersFeat.reset();
    window.pin.closePins();
    [].forEach.call(window.map.adForm, function (element) {
      element.disabled = true;
    });
    window.map.fillAddress();
    window.map.onActive();
    window.map.mapKeks.classList.add('map--faded');
    window.map.adForm.classList.add('ad-form--disabled');
    if (window.map.card) {
      window.map.mapKeks.removeChild(window.map.card);
    }
    window.card.closeCard();
    window.map.mainPin.style.top = MainPinCoords.CoordTop;
    window.map.mainPin.style.left = MainPinCoords.CoordLeft;
  };

  var getPrice = function () {
    if (typeOfHouse.value === 'flat') {
      priceForm.min = '1000';
      priceForm.placeholder = '1000';
    }
    if (typeOfHouse.value === 'palace') {
      priceForm.min = '10000';
      priceForm.placeholder = '10000';
    }
    if (typeOfHouse.value === 'house') {
      priceForm.min = '5000';
      priceForm.placeholder = '5000';
    }
    if (typeOfHouse.value === 'bungalo') {
      priceForm.min = '0';
      priceForm.placeholder = '0';
    }
  };

  var onTimeinValue = function () {
    adFormTimeout.value = adFormTimeiin.value;
  };
  var onTimeoutValue = function () {
    adFormTimeiin.value = adFormTimeout.value;
  };

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

  var onSubmit = function () {
    window.backend.upload(new FormData(window.map.adForm), window.map.onSuccess, window.map.onError);
  };

  roomsSelect.addEventListener('change', checkRoomsCapacity);
  guestsSelect.addEventListener('change', checkRoomsCapacity);

  adFormTimeiin.addEventListener('change', onTimeinValue);
  adFormTimeout.addEventListener('change', onTimeoutValue);

  adFormSubmit.addEventListener('click', checkRoomsCapacity);

  typeOfHouse.addEventListener('change', getPrice);

  cleanButton.addEventListener('click', onReset);

  window.map.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onSubmit();
    onReset();
  });
})();
