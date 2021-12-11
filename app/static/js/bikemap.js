streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

var map = L.map("mapid", {
  center: [
    45.42, -75.69
  ],
  zoom: 12
  
});

streetmap.addTo(map);

let ottawajson = "http://127.0.0.1:5000/construction";

function getColor(FEATURE_TYPE) {
  if (FEATURE_TYPE === 'Multi-Pathway') return 'green';
  else if (FEATURE_TYPE === 'Road-Work') return 'red';
  else if (FEATURE_TYPE === "Bike-Lanes") return 'yellow';
  else if (FEATURE_TYPE === "Sewer") return 'aqua';

};
function onEachFeature(feature, layer){
  for (i=0;i<feature.length;i++) {
    layer.bindPopup((`Work Type: ${feature.properties.FEATURE_TYPE}  Targeted Start Date: ${feature.properties.TARGETED_START}`));

  }
  
}
var biked3 = d3.json(ottawajson).then(function(bikedata){
  L.geoJson(bikedata, {
    filter: bikefilter, 
    style: function(feature){
      return{
        color: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillColor: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillOpacity: 1, 
        weight: 4
      };
    }, onEachFeature: onEachFeature
  }).addTo(map);

  function bikefilter(feature) {
    if (feature.properties.WORK_TYPE_GROUP === 'Bike-Lanes') return true
  };
});
  console.log(biked3)