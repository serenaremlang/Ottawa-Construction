streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

var layers = {
  Road_work: new L.LayerGroup(),
  Bike_path: new L.LayerGroup(),
  Sewer_water: new L.LayerGroup(),
  Wards: new L.LayerGroup(),
  Multi_use: new L.LayerGroup()
};


var map = L.map("mapid", {
    center: [
      45.42, -75.69
    ],
    zoom: 12,
    layers: [
      layers.Road_work,
      layers.Bike_path,
      layers.Sewer_water,
      layers.Wards,
      layers.Multi_use

    ]
    
});


streetmap.addTo(map);

var overlays = {
  'Road Work': layers.Road_work,
  'Bike Path': layers.Bike_path,
  'Multi-Use Pathways': layers.Multi_use,
  'Sewers and Watermains': layers.Sewer_water,
  'Wards': layers.Wards
}

L.control.layers(null, overlays).addTo(map);

//let ottawajson = "https://opendata.arcgis.com/datasets/d2fe8f7e3cf24615b62dfc954b5c26b9_0.geojson";
let ottawajson = "http://127.0.0.1:5000/construction";

//let wardjson = "https://opendata.arcgis.com/datasets/0fdfb868ce3b4d58a36dfadb38a482a2_0.geojson";
let wardjson = "http://127.0.0.1:5000/geo_ward"

function getColor(FEATURE_TYPE) {
    if (FEATURE_TYPE === 'Multi-Pathway') return 'green';
    else if (FEATURE_TYPE === 'Road-Work') return 'red';
    else if (FEATURE_TYPE === "Bike-Lanes") return 'yellow';
    else if (FEATURE_TYPE === "Sewer") return 'aqua';
  
};

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


};

console.log(ottawajson);
console.log(wardjson);


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
          map.fitBounds(event.target.getBounds());
        }
      });

    
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup(`Ward: ${feature.properties.WARD_NUM} Councillor: ${feature.properties.COUNCILLOR}`);

    }
  }).addTo(layers.Wards);
});

console.log(wardd3)

// var biked3 = d3.json(ottawajson).then(function(ottdata) {
//   L.geoJson(ottdata, {
//     style: function(feature) {
//       return {
//         color: getColor(feature.properties.FEATURE_TYPE),
//         fillColor: getColor(feature.properties.FEATURE_TYPE),
//         fillOpacity: 1,
//         weight: 2.5
//       };
//     },
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(`Work Type: ${feature.properties.FEATURE_TYPE} Start Date: ${feature.properties.TARGETED_START}`);
//       }
//     }).addTo(layers.Bike_path);
//   }
    
      
        

    
      




// });

var biked3 = d3.json(ottawajson).then(function(bikedata){
  L.geoJson(bikedata, {
    filter: bikefilter, 
    style: function(feature){
      return{
        color: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillColor: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillOpacity: 1, 
        weight: 2.5
      };
    },
  }).addTo(layers.Bike_path);

  function bikefilter(feature) {
    if (feature.properties.WORK_TYPE_GROUP === 'Bike-Lanes') return true
  };
});

console.log(biked3)


var multid3 = d3.json(ottawajson).then(function(multidata){
  L.geoJson(multidata, {
    filter: bikefilter, 
    style: function(feature){
      return{
        color: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillColor: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillOpacity: 1, 
        weight: 2.5
      };
    },
  }).addTo(layers.Multi_use);

  function bikefilter(feature) {
    if (feature.properties.WORK_TYPE_GROUP === 'Multi-Pathway') return true
  };
});

console.log(multid3)


var waterd3 = d3.json(ottawajson).then(function(waterdata){
  L.geoJson(waterdata, {
    filter: bikefilter, 
    style: function(feature){
      return{
        color: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillColor: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillOpacity: 1, 
        weight: 5
      };
    },
  }).addTo(layers.Sewer_water);

  function bikefilter(feature) {
    if (feature.properties.WORK_TYPE_GROUP === 'Sewer') return true
  };
});

console.log(waterd3)

var roadd3 = d3.json(ottawajson).then(function(roaddata){
  L.geoJson(roaddata, {
    filter: bikefilter, 
    style: function(feature){
      return{
        color: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillColor: getColor(feature.properties.WORK_TYPE_GROUP), 
        fillOpacity: 1, 
        weight: 2.5
      };
    },
  }).addTo(layers.Road_work);

  function bikefilter(feature) {
    if (feature.properties.WORK_TYPE_GROUP === 'Road-Work') return true
  };
});

console.log(biked3)




// layerd3 = d3.json(ottawajson).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Styling each feature (in this case, a neighborhood)
//     style: function(feature) {
//       return {
//         color: getColor(feature.properties.FEATURE_TYPE),
    
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: getColor(feature.properties.FEATURE_TYPE),
//         fillOpacity: 0.3,
//         weight: 2.5
//       };
//     },
//     // This is called on each feature.
//     onEachFeature: function(feature, layer) {
//       // Set the mouse events to change the map styling.
//       layer.on({
//         // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//         click: function(event) {
//           map.fitBounds(event.target.getBounds());
//         }
//       });

    
//       // Giving each feature a popup with information that's relevant to it
//       layer.bindPopup(`Ward: ${feature.properties.WARD_NUM} Councillor: ${feature.properties.COUNCILLOR}`);

//     }
//   }).addTo(layers.Multi_use);
// });
// //   // Creating a GeoJSON layer with the retrieved data
// //   L.geoJson(ottdata, {

   
//     // Styling each feature (in this case, a neighborhood)
//     style: function(feature) {
//       return {
//         color: getColor(feature.properties.FEATURE_TYPE),
    
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: getColor(feature.properties.FEATURE_TYPE),
//         fillOpacity: 0.3,
//         weight: 2.5
//       };
//     },
//     // This is called on each feature.
//     onEachFeature: function(feature, layer) {
//       // Set the mouse events to change the map styling.
//       layer.on({
//         // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//         click: function(event) {
//           map.fitBounds(event.target.getBounds());
//         }
//       });

    
//       // Giving each feature a popup with information that's relevant to it
//       layer.bindPopup(`Work Type: ${feature.properties.FEATURE_TYPE} Start Date: ${feature.properties.TARGETED_START}`);

//     }
//   }).addTo(layers.Bike_path);
// });













// // Getting our GeoJSON data
// d3.json(ottawajson).then(function(data) {


//   d3.json(wardjson).then(function(ward_data) {
//     L.geoJson(data, ward_data, {
//       // Styling each feature (in this case, a neighborhood)
//       style: function(feature) {
//         return {
//           color: getColor(feature.properties.FEATURE_TYPE),
//           // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//           fillColor: getColor(feature.properties.FEATURE_TYPE),
//           fillOpacity: 1,
//           weight: 2.5
//         };
//       },
//       // This is called on each feature.
//       onEachFeature: function(feature, layer) {
//         // Set the mouse events to change the map styling.
//         layer.on({
//           // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.9
//             });
//           },
//           // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//           mouseout: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.5
//             });
//           },
//           // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//           click: function(event) {
//             map.fitBounds(event.target.getBounds());
//           }
      

      
//         // Giving each feature a popup with information that's relevant to it
//         layer.bindPopup("<h1>" + feature.properties.FEATURE_TYPE + "</h1> <hr> <h2>" + feature.properties.TARGETED_START + "</h2>");
  
      
//     });

    



  
    
