// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with a center and zoom level.
// This method is useful when we need to add multiple tile layers, 
// or a background image of our map(s)
let map = L.map("mapid", {
    center: [
      45.42, -75.69
    ],
    zoom: 12
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);