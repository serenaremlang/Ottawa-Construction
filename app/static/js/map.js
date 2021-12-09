// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with a center and zoom level.
// This method is useful when we need to add multiple tile layers, 
// or a background image of our map(s)




// We create the tile layer that will be the background of our map.


function getColor(FEATURE_TYPE) {
  if (FEATURE_TYPE === 'MMUP') return 'green';
  else if (FEATURE_TYPE === 'RD_RESF') return 'orange';
  else if (FEATURE_TYPE === 'MCR') return 'yellow';
  else if (FEATURE_TYPE ==='SCR') return 'aqua';

};

let ottawajson = "http://127.0.0.1:5000/"

console.log(ottawajson)

d3.json(ottawajson).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(featuredata) {

  
  function onEachFeature(feature, layer){
    for (i=0;i<feature.construction_data.length;i++) {
      layer.bindPopup((`Work Type: ${feature.construction_data[i].attributes.FEATURE_TYPE}  Targeted Start Date: ${feature.construction_data[i].attributes.TARGETED_START}`));

    }
    
  }
  
  var featuretype = L.geoJSON(featuredata, {

    style: function(feature) {
      for (i=0;i<feature.construction_data.length;i++) {
        return {
          color: getColor(feature.construction_data[i].attributes.FEATURE_TYPE),
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: getColor(feature.construction_data[i].attributes.FEATURE_TYPE),
        fillOpacity: 1,
        weight: 3
        };
      
      };
    },
    onEachFeature: onEachFeature});

    createMap(featuretype)
  };
  
//   var featuretype = L.geoJSON(featuredata, {
//     style: function(feature) {
//       return{
        
//         color: getColor(feature.construction_data.attributes.FEATURE_TYPE),
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: getColor(feature.construction_data.attributes.FEATURE_TYPE),
//         fillOpacity: 1,
//         weight: 3
//       };
//     },
        
        
//     onEachFeature: onEachFeature});

//   createMap(featuretype)
// }

function createMap(featuretype) {
  
  var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  });

  var baseMaps = {
    'Street Map': streets
  }

  let bikes = new L.layerGroup();
  let sewers = new L.layerGroup();
  let roads = new L.layerGroup();
  let waters = new L.layerGroup();
  let multipath = new L.layerGroup();

  let overlays = {
    All: featuretype
  
  };

  let map = L.map("mapid", {
    center: [
      45.42, -75.69
    ],
    zoom: 12
    
  });

  L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(map);















  // // Create a legend control object.
  // let legend = L.control({
  //   position: "bottomright"
  // });

  // // Then add all the details for the legend.
  // legend.onAdd = function() {
  //   let div = L.DomUtil.create("div", "info legend");
  //     const magnitudes = [0, 1, 2, 3, 4, 5];
  //     const colors = [
  //       "#98ee00",
  //       "#d4ee00",
  //       "#eecc00",
  //       "#ee9c00",
  //       "#ea822c",
  //       "#ea2c2c"
  //     ];

  

};
// Then we add our 'graymap' tile layer to the map.
