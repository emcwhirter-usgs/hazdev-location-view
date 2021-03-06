'use strict';

var LocationView = require('locationview/LocationView'),
    L = require('leaflet');


L.Icon.Default.imagePath = 'images';

var _showLocationButton = document.querySelector('#showLocationView'),
    _locationResult = document.querySelector('#locationResult'),
    _onLocationCallback,
    locationView;

_onLocationCallback = function (loc) {
  _locationResult.innerHTML = JSON.stringify(loc, null, 2);
};

locationView = new LocationView({
  callback: _onLocationCallback
});

// Open location view when button is clicked
_showLocationButton.addEventListener('click', function () {
  locationView.show({'location':null});
});