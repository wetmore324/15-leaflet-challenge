# 15-leaflet-challenge

In this challenge we were asked to utilize the USGS GeoJSON Feed and find a dataset of earthquakes that have taken place across the globe.  I choose to pull data from the previous 7 days.

Using Leaflet, I created a map that plots all the earthquakes from the dataset based on their longitude and latitude.  The markers on the map represent an earthquake that occured.  The size of the marker was determined by the magnitude of the earthquake while the color represents the depth of the earthquake.

Upon clicking on the marker you will find information about the earthquake, magnitude, the nearest place the earthquake occured at and the depth of the earthquake. There is a legend on the bottom right corner that shows the meaning for each color marker which represents the depth of the earthquake.

I was able to determine how to do certain features in code from the following urls:
.bindPopup(`${feature.properties.mag} | ${feature.properties.place} | ${feature.geometry.coordinates[2]}`);
            // Learned how to add multiple elements to pop up from following url: https://stackoverflow.com/questions/62837270/insert-multiple-elements-in-bindpopup-in-leaflet

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
