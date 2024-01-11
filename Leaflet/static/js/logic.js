// Store our API endpoint as url
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//collect data with d3
d3.json(url).then(function (data) {
    console.log(data);
    let features = data.features;
    console.log(features);
});

// Create the tile layer that will be the background of our map.
let worldMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object.
let myMap = L.map("map", {
    center: [40, -120],
    zoom: 3,
    layers: [worldMap]
});

// Define the basemaps as the worldmap
let baseMaps = {
    "worldMap": worldMap
};

// Define the earthquake layergroup for the map
let earthquakeData = new L.LayerGroup();

// Define the overlay and link to the layergroup
let overlays = {
    "Earthquakes": earthquakeData
};

// Create a layer control, and pass it baseMaps and overlayMaps.
L.control.layers(baseMaps, overlays, {
    collapsed: false
}).addTo(myMap);

// Use legendInfo function to style the earthquake points on the map
function legendInfo(features) {
    return {
        color: chooseColor(features.geometry.coordinates[2]),
        radius: chooseRadius(features.properties.mag),  //sets readius based on magnitude
        fillColor: chooseColor(features.geometry.coordinates[2]), //sets fill color to the depth of the earthquake
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 1
    };
}

// Creating the fillColor of the earthquake based on depth
function chooseColor(depth) {
    if (depth <= 10) return "red";
    else if (depth > 10 & depth <= 30) return "orange";
    else if (depth > 30 & depth <= 50) return "yellow";
    else if (depth > 50 & depth <= 70) return "green";
    else if (depth > 70 & depth <= 90) return "blue";
    else return "purple";
};

// Creating function to determine radius of each earthquake marker
function chooseRadius(magnitude) {
    return magnitude;
};

// Get the json data with d3.
d3.json(url).then(function(data) {
    console.log(earthquakeData);
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {
            return L.circleMarker(latlon).bindPopup(`${feature.properties.mag} | ${feature.properties.place} | ${feature.geometry.coordinates[2]}`);
            // Learned how to add multiple elements to pop up from following url: https://stackoverflow.com/questions/62837270/insert-multiple-elements-in-bindpopup-in-leaflet
        },
        style: legendInfo
    }).addTo(earthquakeData);
    earthquakeData.addTo(myMap);
});

    // Learned how to better sytle legend on Leaflet from the following url: https://codepen.io/haakseth/pen/KQbjdO
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += "<h4>Depth Legend</h4>";
            div.innerHTML += '<i style="background: red"></i><span>(-10-10)</span><br>';
            div.innerHTML += '<i style="background: orange"></i><span>(10-30)</span><br>';
            div.innerHTML += '<i style="background: yellow"></i><span>(30-50)</span><br>';
            div.innerHTML += '<i style="background: green"></i><span>(50-70)</span><br>';
            div.innerHTML += '<i style="background: blue"></i><span>(70-90)</span><br>';
            div.innerHTML += '<i style="background: purple"></i><span>(90+)</span><br>';
   
        return div;
    };
      
    // Add legend to map
    legend.addTo(myMap);