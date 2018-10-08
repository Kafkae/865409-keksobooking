'use strict';

(function () {
  var roomsSelect = window.map.adForm.querySelector('#room_number');
  var guestsSelect = window.map.adForm.querySelector('#capacity');
  var adFormSubmit = window.map.adForm.querySelector('.ad-form__submit');


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
})();
