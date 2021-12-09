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

let ottawajson = "https://opendata.arcgis.com/datasets/d2fe8f7e3cf24615b62dfc954b5c26b9_0.geojson";

function getColor(FEATURE_TYPE) {
    if (FEATURE_TYPE === 'MMUP') return 'green';
    else if (FEATURE_TYPE === 'RD_RESF') return 'red';
    else if (FEATURE_TYPE === 'MCR') return 'yellow';
    else if (FEATURE_TYPE ==='SCR') return 'aqua';
  
};

var biked3 = d3.json(ottawajson).then(function(bikedata){
    L.geoJson(bikedata, {
      filter: bikefilter, 
      style: function(feature){
        return{
          color: getColor(feature.properties.FEATURE_TYPE), 
          fillColor: getColor(feature.properties.FEATURE_TYPE), 
          fillOpacity: 1, 
          weight: 4
        };
      },
    }).addTo(map);
  
    function bikefilter(feature) {
      if (feature.properties.FEATURE_TYPE === 'MCR') return true
    };
  });
  
  console.log(biked3)