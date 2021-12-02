# HOW TO
---
## STEP 1: Data Acquisition



## STEP 2 Data Cleansing
We only wanted the english fields so we can use the query tool provided [here] (https://open.ottawa.ca/datasets/ottawa::construction-road-resurfacing-watermain-sewer-multi-use-pathways-bike-lanes/api)

This allowed us to create a filtered geojson file as desired.  When done, [this link](https://maps.ottawa.ca/arcgis/rest/services/ConstructionForecastData/MapServer/0/query?where=1%3D1&outFields=FEATURE_TYPE,STATUS,TARGETED_START,PROJECT_MANAGER&outSR=4326&f=json) is genereated. 



## STEP 3 Data Storage
We wanted to store our data into a NOSQL database and chose to work with MongoDB. 

In order to import them directly in, as our data was cleaned and filtered already and did not require further munging, we made use of the Mongo command line tool `mongoimport` and `jq`.

We then ran the following piped commands in our Terminal/gitbash.

```
jq --compact-output ".features" ward.geojson | mongoimport --db Ottawa -c geo_ward --jsonArray 
```

```
jq --compact-output ".features" ottawa.geojson | mongoimport --db Ottawa -c geo_ --jsonArray
```