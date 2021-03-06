'use strict';

var L = require('leaflet'),
    LocationControl = require('locationview/LocationControl');

L.Icon.Default.imagePath = 'images';

var map = new L.Map(document.querySelector('.map'), {
  center: new L.LatLng(40.0, -105.0),
  zoom: 3
});
var lc = new LocationControl({
  includePointControl: true,
  includeCoordinateControl: true,
  includeGeocodeControl: true,
  includeGeolocationControl: true,
  el: document.querySelector('.map')
});
var natgeo = new L.TileLayer('http://server.arcgisonline.com' +
    '/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}');

lc.on('location', function(/*loc*/) {
  console.log(this.getLocation());
});

map.addLayer(natgeo);
map.addControl(lc);