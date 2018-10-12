'use strict';
(function () {

  var mapFilter = document.querySelector('.map__filters');
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeaturesElements = document.querySelectorAll('.map__checkbox');
  var selectedFeatures = [];

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var hoisePrice = {
    'low': {
      minPrice: 0,
      maxPrice: 10000
    },
    'middle': {
      minPrice: 10000,
      maxPrice: 50000
    },
    'high': {
      minPrice: 50000,
      maxPrice: Infinity
    }
  };

  var getFilterType = function (adv, filterElem) {
    if (filterElem.value === 'any') {
      return true;
    }
    return adv.offer.type === filterElem.value;
  };
  var getFilterRooms = function (adv, filterElem) {
    if (filterElem.value === 'any') {
      return true;
    }
    return adv.offer.rooms === Number(filterElem.value);
  };
  var getFilterGuests = function (adv, filterElem) {
    if (filterElem.value === 'any') {
      return true;
    }
    return adv.offer.guests === Number(filterElem.value);
  };

  var getPrices = function (ads, filterElem) {
    if (filterElem.value === 'any') {
      return true;
    }
    var minPrice = hoisePrice[filterElem.value].minPrice;
    var maxPrice = hoisePrice[filterElem.value].maxPrice;
    return ads.offer.price >= minPrice && ads.offer.price <= maxPrice;
  };

  var getFilterFeatures = function (adv) {
    var where = adv.offer.features;
    var what = selectedFeatures;
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var onFilterChange = function () {
    selectedFeatures = [];
    filterFeaturesElements.forEach(function (cur) {
      if (cur.checked) {
        selectedFeatures.push(cur.value);
      }
    });
    var filtersAds = window.ads.filter(function (data) {
      var adType = getFilterType(data, filterType);
      var adRooms = getFilterRooms(data, filterRooms);
      var adPrice = getPrices(data, filterPrice);
      var adGuests = getFilterGuests(data, filterGuests);
      var adFeatures = getFilterFeatures(data);
      return adType && adRooms && adPrice && adGuests && adFeatures;
    });
    window.ads = filtersAds;
    debounce(window.pin.renderPin);
  };

  mapFilter.addEventListener('change', onFilterChange);
})();
