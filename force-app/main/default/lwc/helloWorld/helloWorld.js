import { api, LightningElement, track } from "lwc";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import getPropertyList from "@salesforce/apex/PropertiesController.getPropertyList";
import getMarketList from "@salesforce/apex/PropertiesController.getMarketList";
import Leaflet from "@salesforce/resourceUrl/Leaflet";

export default class HelloWorld extends LightningElement {
  @track map;
  @track markerGroup;

  @api pin;
  @api height;
  @track pinp = "asdasd";

  @track qwerty;
  @track allData;

  @api
  setMarkers(pins) {
    this.resetMarkerGroup();

    const newMarkers = pins.map(this.createMarker);
    newMarkers.forEach((marker) => marker.addTo(this.markerGroup));

    this.sizeMap();

    return newMarkers;
  }

  @api
  addMarker(pin) {
    const newMarker = this.createMarker(pin);
    newMarker.addTo(this.markerGroup);
    this.sizeMap();
    return newMarker;
  }

  @api
  removeMarker(marker) {
    this.markerGroup.removeLayer(marker);
    this.sizeMap();
  }

  @api
  sizeMap() {
    this.map.fitBounds(this.markerGroup.getBounds().pad(0.1));
  }

  createMarker(pin) {
    const marker = L.marker([pin.lat, pin.lng], { record: pin.record });
    marker.bindTooltip(pin.record.Name);
    return marker;
  }

  resetMarkerGroup() {
    if (this.markerGroup) {
      this.markerGroup.clearLayers();
    } else {
      this.markerGroup = new L.featureGroup();
      this.markerGroup.on("click", (event) => this.clickMarker(this, event));
      this.markerGroup.on("mouseover", (event) => {
        event.target.openToolTip();
      });
      this.markerGroup.addTo(this.map);
    }
  }

  

  renderedCallback() {
    this.initializeLeaflet();
  }


  async initializeLeaflet() {
    const url = window.location.href;
    const urlArray = url.split("/");
    const market = urlArray.indexOf("Market__c");
    const id = urlArray[market + 1];
    await loadScript(this, Leaflet + "/Leaflet/leaflet.js");
    await loadScript(this, Leaflet + "/Leaflet/leaflet.draw.js");
    await loadScript(this, Leaflet + "/Leaflet/leaflet.markercluster.js");
    await loadStyle(this, Leaflet + "/Leaflet/leaflet.css");
    await loadStyle(this, Leaflet + "/Leaflet/leaflet.draw.css");
    await loadStyle(this, Leaflet + "/Leaflet/MarkerCluster.css");
    await loadStyle(this, Leaflet + "/Leaflet/MarkerCluster.Default.css");
        Promise.all([
          getPropertyList({ MarkerId: id }),
          getMarketList({ MarkerId: id })
        ]).then(res => {
          console.log(res);
          const markers = res[0].filter(
            (r) => r.Latitude != undefined && r.Longitude != undefined
          );
          const [{Latitude__c, Average_Longitude__c}] = res[1];
  
          this.init(markers, Latitude__c, Average_Longitude__c);
          const ready = new CustomEvent("ready");
          this.dispatchEvent(ready);
        }).catch((error) => {
          console.error("Error loading leaflet styles", error);
        });
  }

  init(res, Lat, Long) {
    const url = window.location.href;
    const urlArray = url.split("/");
    const market = urlArray.indexOf("Market__c");
    const id = urlArray[market + 1];

    const mapContainer = this.template.querySelector(".map-container");
    Object.assign(mapContainer.style, {
      position: "relative",
      height: "600px"
    });
    const mapEl = this.template.querySelector(".map");
    Object.assign(mapEl.style, {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      top: 0
    });
    this.map = L.map(mapEl).setView([Lat, Long], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    var markers = L.markerClusterGroup();

    res.forEach((r) => {
        markers.addLayer(L.marker([r.Latitude, r.Longitude])
        .bindPopup(r.Name)
        .on("click", (e) => {
          this.qwerty = {pin: r, data: res};
        }));
    });


    var editableLayers = new L.FeatureGroup();

    this.map.addLayer(editableLayers);

    this.map.addLayer(markers);

    const drawControlSettings = {
      draw : {
          position : 'topleft',
          polyline : false,
          rectangle : false,
          circle : false,
          marker: false,
          circlemarker: false,
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
  };

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawControlSettings);
this.map.addControl(drawControl);






this.map.on('draw:created', (e) => {
  
  var type = e.layerType,
    layer = e.layer;

  editableLayers.addLayer(layer);

  const mapData = [];
  const layers= Object.values(editableLayers._layers);
  layers.forEach(layer => {
    mapData.push(res.filter(r => this.isMarkerInsidePolygon(r, layer)));
  })

  this.qwerty = {pin: undefined, data: res, mapData: mapData.flat(2)};
});

this.map.on('draw:edited', (e) => {
  const mapData = [];
  const layers= Object.values(editableLayers._layers);
  layers.forEach(layer => {
    mapData.push(res.filter(r => this.isMarkerInsidePolygon(r, layer)));
  })

  const array = mapData.flat(2).length > 0 ? mapData.flat(2) : undefined;

  this.qwerty = {pin: undefined, data: res, mapData: array};
});

this.map.on('draw:deleted', (e) => {
  const mapData = [];
  const layers= Object.values(editableLayers._layers);
  layers.forEach(layer => {
    mapData.push(res.filter(r => this.isMarkerInsidePolygon(r, layer)));
  })

  const array = mapData.flat(2).length > 0 ? mapData.flat(2) : undefined;

  this.qwerty = {pin: undefined, data: res, mapData: array};
});

const preparedData = res.map(r => {
  return {
    ...r, label: r.Name, value: r.Id
  }
});

this.qwerty = {pin: undefined, data: preparedData};


    
  }

  fireMapReady() {}

  clickMarker(self, { layer }) {
    self.fireMarker(layer);
  }

  fireMarker(layer) {
    const pinclick = new CustomEvent("pinclick", {
      detail: layer.options.record.Id
    });

    this.dispatchEvent(pinclick);
  }

  isMarkerInsidePolygon(marker, poly) {
    var polyPoints = poly.getLatLngs();     
    var x = marker.Latitude, y = marker.Longitude;


    var inside = false;
    for (var i = 0, j = polyPoints[0].length - 1; i < polyPoints[0].length; j = i++) {

      
        var xi = polyPoints[0][i].lat, yi = polyPoints[0][i].lng;
        var xj = polyPoints[0][j].lat, yj = polyPoints[0][j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
}