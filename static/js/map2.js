var map = L.map("mapid", {
    center: [
      45.42, -75.69
    ],
    zoom: 12
    
});

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}).addTo(map);

let ottawajson = "https://opendata.arcgis.com/datasets/d2fe8f7e3cf24615b62dfc954b5c26b9_0.geojson"

console.log(ottawajson)

function getColor(FEATURE_TYPE) {
    if (FEATURE_TYPE === 'MMUP') return 'green';
    else if (FEATURE_TYPE === 'RD_RESF') return 'red';
    else if (FEATURE_TYPE === 'MCR') return 'yellow';
    else if (FEATURE_TYPE ==='SCR') return 'aqua';
  
};




// Getting our GeoJSON data
d3.json(ottawajson).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a neighborhood)
      style: function(feature) {
        return {
          color: getColor(feature.properties.FEATURE_TYPE),
          // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
          fillColor: getColor(feature.properties.FEATURE_TYPE),
          fillOpacity: 1,
          weight: 2.5
        };
      },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          click: function(event) {
            map.fitBounds(event.target.getBounds());
          }
        });

      
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.FEATURE_TYPE + "</h1> <hr> <h2>" + feature.properties.TARGETED_START + "</h2>");
  
      }
    }).addTo(map);
  });