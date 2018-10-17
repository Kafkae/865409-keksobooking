'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  window.filtersFeat = filters;

  var filterPin = function (adv) {
    var FILTER_PRICE_MIN = 10000;
    var FILTER_PRICE_MAX = 50000;
    var selects = filters.querySelectorAll('select');
    var features = filters.querySelectorAll('input[type = checkbox]:checked');
    var selectPins = adv.slice();
    var FilterSet = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return selectPins.filter(function (data) {
        return data.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (filterPrice) {
      return selectPins.filter(function (data) {
        var filterPriceValue = {
          'low': data.offer.price <= FILTER_PRICE_MIN,
          'middle': data.offer.price >= FILTER_PRICE_MIN && data.offer.price <= FILTER_PRICE_MAX,
          'high': data.offer.price >= FILTER_PRICE_MAX
        };
        return filterPriceValue[filterPrice.value];
      });
    };

    var filterByFeatures = function (element) {
      return selectPins.filter(function (data) {
        return data.offer.features.indexOf(element.value) === -1;
      });
    };

    if (selects.length !== undefined) {
      selects.forEach(function (element) {
        if (element.value !== 'any') {
          if (element.id !== 'housing-price') {
            selectPins = filterByValue(element, FilterSet[element.id]);
          } else {
            selectPins = filterByPrice(element);
          }
        }
      });
    }

    if (features !== undefined) {
      features.forEach(function (element) {
        selectPins = filterByFeatures(element);
      });
    }

    if (selectPins.length) {
      window.pin.renderPin(selectPins);
    }
  };
  window.filter = {
    filterPin: filterPin,
  };
})();
