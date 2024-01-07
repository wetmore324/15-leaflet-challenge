function createMap(earthQuakes) {

// Create the tile layer that will be the background of our map.
let worldmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object to hold the streetmap layer.
let baseMaps = {
    "World Map": worldMap
  };

// Create an overlayMaps object to hold the earthQuakes layer.
let overlayMaps = {
    "Earthquakes": earthQuakes
  };

// Create the map object with options.
let map = L.map("map", {
    center: [-68.3586, 19.1591],
    zoom: 5,
    layers: [worldMap, earthQuakes]
  });

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

function createMarkers(response) {

    //Pull the earthquakes property from response.data.
    let
}

// Use this link to get the GeoJson data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform an API call to the Earthquake Hazards Program API to get the earthquake information. Call createMarkers when it completes.
d3.json(link).then(createMarkers);

}
