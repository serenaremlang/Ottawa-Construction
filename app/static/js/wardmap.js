streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

var map = L.map("mapid", {
  center: [
    45.42, -75.69
  ],
  zoom: 11
  
});

streetmap.addTo(map);


let wardjson = "http://127.0.0.1:5000/geo_ward";

function wardColor(ward) {
    if (ward === '1') return 'green';
    else if (ward === '2') return 'orange';
    else if (ward === '3') return 'yellow';
    else if (ward ==='5') return 'aqua';
    else if (ward ==='6') return 'teal';
    else if (ward ==='7') return 'burgundy';
    else if (ward ==='8') return 'purple';
    else if (ward ==='9') return 'magenta';
    else if (ward ==='10') return 'fuschia';
    else if (ward ==='11') return 'pink';
    else if (ward ==='12') return 'violet';
    else if (ward ==='13') return 'navy';
    else if (ward ==='14') return 'blue';
    else if (ward ==='15') return 'olive';
    else if (ward ==='16') return 'black';
    else if (ward ==='17') return 'brown';
    else if (ward ==='18') return 'grey';
    else if (ward ==='19') return 'gold';
    else if (ward ==='20') return 'silver';
    else if (ward ==='21') return 'beige';
    else if (ward ==='22') return 'crimson';
    else if (ward ==='23') return 'white';
}

wardd3 = d3.json(wardjson).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      return {
        color: wardColor(feature.properties.WARD_NUM),
    
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: wardColor(feature.properties.WARD_NUM),
        fillOpacity: 0.3,
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
          //map.fitBounds(event.target.getBounds());         
          filterWard(feature.properties.WARD_NUM);

          let gaugePlotData = getGaugeData(feature.properties.WARD_NUM);
          gaugePlotData.layout.paper_bgcolor='rgba(0,0,0,0)';
          gaugePlotData.layout.plot_bgcolor='rgba(0,0,0,0)';         
          Plotly.react('gauge', gaugePlotData.trace, gaugePlotData.layout); 
        }
      });
    
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup(`Ward: ${feature.properties.WARD_NUM} Councillor: ${feature.properties.COUNCILLOR}`);
    }
  }).addTo(map);

  let gaugePlotData = getGaugeData(0);
  gaugePlotData.layout.paper_bgcolor='rgba(0,0,0,0)';
  gaugePlotData.layout.plot_bgcolor='rgba(0,0,0,0)';
  //gaugePlotData.layout.title_font_color='rgba(255,255,255,0)';
  Plotly.newPlot('gauge', gaugePlotData.trace, gaugePlotData.layout);   
});

