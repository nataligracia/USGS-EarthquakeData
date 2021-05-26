// We create the tile layers that will be the selectable backgrounds of our map.

// Create a L.tilelayer() using the 'mapbox/light-v10' map id
var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    // noWrap: true,
    // bounds: [[-90, -180],[90, 180]],
    accessToken: API_KEY
  }
);

// Create a L.tilelayer() using the 'mapbox/satellite-v9' map id
var satelliteview = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    // noWrap: true,
    // bounds: [[-90, -180],[90, 180]],
    accessToken: API_KEY
  }
);

// Create a L.tilelayer() using the 'mapbox/satellite-v9' map id
var outdoorslayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  // noWrap: true,
  // bounds: [[-90, -180],[90, 180]],
  accessToken: API_KEY
});



// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.


// Create a L.map(), reference the 'mapid' element in the HTML page, and pass in the three layers above
var allMap = L.map("mapid", {
  // center: [40.7, -94.5],
  center: [40.52, 34.34],
  zoom: 2,
  // minZoom: 1,
  // maxZoom: 1,
  layers: [grayscale, satelliteview, outdoorslayer]
});

// map.setView([0, 0], 0);

// We create the layers for our two different sets of data, earthquakes and
// tectonicplates.
var tectonicPlates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// Defining an object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
// Create a basemaps object for the three tileLayers from above. 
// The key should be a human readable name for the tile layer, and the value should be a tileLayer variable
var baseMaps = {
  Grayscale: grayscale,
  Satellite: satelliteview,
  Outdoors: outdoorslayer,
};

// // We define an object that contains all of our overlays. Any combination of
// // these overlays may be visible at the same time!

// // Create a overlays object for the two LayerGroups from above. 
// // The key should be a human readable name for the layer group, and the value should be a LayerGroup variable
var overlayMaps = {
  "Tectonic Plates": tectonicPlates,
  "Earthquakes": earthquakes
};

// // Add a L.control.layers() object and pass in the baseMaps and overlayMaps, and then .addTo myMap
L
  .control
  .layers(baseMaps, overlayMaps)
  .addTo(allMap);

function styleInfo(feature) {
  return {
    radius: getRadius(feature.properties.mag),
    opacity: 1,
    fillOpacity: 1,
    color: "#000000",
    stroke: true,
    weight: 0.5,
    fillColor: getColor(feature.geometry.coordinates[2]),
  }
}

function getColor(depth) {
  switch (true) {
  case depth > 90:
    return "red";
  case depth > 75:
    return "orange";
  case depth > 50:
    return "lightgreen";
  case depth > 25:
    return "cornflowerblue";
  case depth > 10:
    return "lavender";
  default:
    return "lemonchiffon";
  }
}

function getRadius(mag) {
  if (mag === 0) {
    return 1;
  }
    return mag * 3;
}

// Use d3.json() to call the API endpoint for earthquake geoJSON data, 
// .then() fire off an anonymous function that takes a single argument `data`.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(function(data) {
  // Use L.geoJson() to parse the data, and do the following:
  L.geoJson(data, {
    // use pointToLayer to convert each feature to an L.circleMarker, see https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/ for a tutorial
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // use style to set the color, radius, and other options for each circleMarker dynamically using the magnitude data
    style: styleInfo,
    // use onEachFeature to bind a popup with the magnitude and location of the earthquake to the layer (see above tutorial for an example)
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<h3>Earthquake</h3><br>"
          + "Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
      );
    }
  }).addTo(earthquakes)
  
  // Then we add the earthquake layer to our map.
  earthquakes.addTo(allMap); // use .addTo to add the earthquakes LayerGroup to the myMap object
});
  // Create a dynamic legend that describes the color scheme for the circles
  // see this tutorial for guidance: https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 10, 25, 50, 75, 90]
    var colors = ["lemonchiffon", "lavender", "cornflowerblue", "lightgreen", "orange", "red"];
  
    div.innerHTML += "<h1>Earthquake</h1><br>"
  
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: "
      + colors[i]
      + "'></i> "
      + grades[i]
      + (grades[i + 1] ? "&ndash;" + (grades[i + 1]-1) + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(allMap);

  // BONUS
  // Make another d3.json() call to the tectonic plates API endpoint
  // then fire off an anonymous function that takes a single argument plateData
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(platedata) {
      // Create an L.geoJson() that reads the plateData, and sets some options per your choosing 
      L.geoJson(platedata, {
        color: "orange",
        weight: 2
      })
      .addTo(tectonicPlates); // use .addTo() to add the l.geoJson layer to the tectonicPlates LayerGroup

      // Then add the tectonicplates layer to the map.
      tectonicPlates.addTo(allMap); // use .addTo to add the tectonicPlates LayerGroup to the myMap object
    });