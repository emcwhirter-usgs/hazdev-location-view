'use strict';


var ConfidenceCalculator = require('locationview/ConfidenceCalculator'),
    L = require('leaflet');


var CLASS_NAME = 'location-geolocation-control';
var METHOD = 'geolocation';
var ENABLED_CLASS = 'location-control-enabled';


var DEFAULTS = {
  'method': METHOD,
  'geolocation': navigator.geolocation,
  'position': 'topleft',
  'iconClass': 'location-control-icon',
  'helpText': 'Use Current Location',
  'infoText': 'Attempt to automatically locate my <b>current location</b>.'
};



/**
 * @params geolocation {object} optional api to replace navigator.geolocation
 *         should have a getCurrentPosition call.
 */
var GeolocationControl = L.Control.extend({
  includes: L.Mixin.Events,

  initialize: function (options) {
    L.Util.setOptions(this, L.Util.extend({}, DEFAULTS, options));
    this._geolocateSuccess = this._geolocateSuccess.bind(this);
    this._geolocateError = this._geolocateError.bind(this);
  },

  onAdd: function (map) {
    var options = this.options,
        stop = L.DomEvent.stopPropagation,
        container,
        toggle;

    container = document.createElement('div');
    container.classList.add('location-control');
    container.classList.add(CLASS_NAME);
    container.innerHTML = [
      '<a class="', options.iconClass, '"></a>',
      '<span class="help">', options.helpText, '</span>'
    ].join('');

    toggle = container.querySelector('a');

    this._map = map;
    this._container = container;
    this._toggle = toggle;

    L.DomEvent.addListener(toggle, 'click', this.toggle, this);
    L.DomEvent.addListener(container, 'click', stop);
    L.DomEvent.addListener(container, 'dblclick', stop);
    L.DomEvent.addListener(container, 'keydown', stop);
    L.DomEvent.addListener(container, 'keyup', stop);
    L.DomEvent.addListener(container, 'keypress', stop);
    L.DomEvent.addListener(container, 'mousedown', stop);

    return container;
  },

  onRemove: function () {
    var stop = L.DomEvent.stopPropagation,
        container = this._container,
        toggle = this._toggle;

    L.DomEvent.removeListener(toggle, 'click', this.toggle);
    L.DomEvent.removeListener(container, 'click', stop);
    L.DomEvent.removeListener(container, 'dblclick', stop);
    L.DomEvent.removeListener(container, 'keydown', stop);
    L.DomEvent.removeListener(container, 'keyup', stop);
    L.DomEvent.removeListener(container, 'keypress', stop);
    L.DomEvent.removeListener(container, 'mousedown', stop);
    this._container = null;
    this._toggle = null;
    this._map = null;
  },

  doGeolocate: function () {
    var geolocation = this.options.geolocation;

    this._container.classList.add(ENABLED_CLASS);

    if (geolocation) {
      geolocation.getCurrentPosition(this._geolocateSuccess,
        this._geolocateError);
    } else {
      this._geolocateError({
        code: 0,
        message: 'Geolocation not supported'
      });
    }

    this.fire('enabled');
  },

  _geolocateSuccess: function (position) {
    this._container.classList.remove(ENABLED_CLASS);

    this.setLocation({
        place: null,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        method: METHOD,
        confidence: ConfidenceCalculator.computeFromGeolocate(
          position.coords.accuracy)
    });
  },

  _geolocateError: function (error) {
    this._container.classList.remove(ENABLED_CLASS);

    this.fire('locationError', error);
  },

  setLocation: function (location, options) {
    // API method, this control has nothing to do
    if (!(options && options.silent)) {
      this.fire('location', {'location': location});
    }
  },

  toggle: function (clickEvent) {
    this.enable();
    L.DomEvent.stop(clickEvent);
  },

  enable: function () {
    this.doGeolocate();
  },

  disable: function () {
    // API method, this control has nothing to do
  }

});


GeolocationControl.METHOD = METHOD;


module.exports = GeolocationControl;
