# Ottawa-Construction
### *Project 3*

![Ottawa-Construction](https://i.cbc.ca/1.5488602.1583516539!/cpImage/httpImage/west-block-parliament-tour-20180615.jpg)

---

If you're from Ottawa, you're likely getting pretty tired of all the construction. It almost seems like Ottawa is starting to compete with Montreal's never ending [Vito Rizzuto construction Empire](https://www.theguardian.com/world/2015/nov/24/corrupt-quebec-construction-industry-ruled-by-untouchable-groups-report). We propose to build a tool to help locals and visitors alike to navigate all the projects taking place in Ottawa and how they might impact travel within the city.

---
### The situation
**Setting**
With the pandemic keeping a lot of us homebound, we’re not traveling our normal routes on the daily anymore.

**The Problem**
Now, when we do go out into the world, we’re often faced with lots of detours and construction that we didn’t realize we needed to account for.

**The Solution**
We propose to build a website to help you navigate these projects and see where those tax dollars are going!
---
## Project outline
![Project-Cycle, crop out header](images/project_cycle.png) 

## STEP 1: Data Acquisition

We acquired our data from a number of locations and in a number of formats. First, we were able to access `.geoJson` files for our first two datasets. (See links 1 and 2 in data sources). For the third data source, we scrapped link 3 in data sources. For code on how this was done see [scrape_ottawa_wards.py](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/scrape_ottawa_wards.py).

**Data Source**: 
1. [City of Ottawa Open Data](https://open.ottawa.ca/datasets/ottawa::construction-road-resurfacing-watermain-sewer-multi-use-pathways-bike-lanes/about)
2. [City of Ottawa Wards](https://opendata.arcgis.com/datasets/0fdfb868ce3b4d58a36dfadb38a482a2_0.geojson)
3. [City of Ottawa Project Summaries](https://ottawa.ca/en/planning-development-and-construction/construction-and-infrastructure-projects)

## STEP 2: Data Storage
We wanted to store our data into a NOSQL database and chose to work with MongoDB. 

In order to import them directly in, as our data was cleaned and filtered already and did not require further munging, we made use of the Mongo command line tool `mongoimport` and `jq`.

We then ran the following piped commands in our Terminal/gitbash.

```
jq --compact-output ".features" Wards.geojson | mongoimport --db Ottawa -c geo_ward --jsonArray 
```
```
jq --compact-output ".features" ottawa.geojson | mongoimport --db Ottawa -c geo_ --jsonArray
```
The files uploaded to our MongoDb can be found in the [Resources Folder](https://github.com/serenaremlang/Ottawa-Construction/tree/main/Resources)

For the scrape it was first dumped into an `.html` (see [wards_scrape.html](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/wards_scrape.html)), and then we used Python along with BeautifulSoup to clean and PyMongo to export it to MongoDB.

## STEP 3: Data Transformation
Here we used PyMongo to pull our data back out from our database and pull it into a Jupyter Notebook (see [data-cleaning.ipynb](https://github.com/serenaremlang/Ottawa-Construction/blob/main/code/data-cleaning.ipynb)) along with both Pandas and Beautiful Soup to wrangle our data for our visualizations. Using Pymongo once again to insert or update the data with the cleaned information.

## STEP 4: Data Retrieval
Once the data was cleaned and in the appropriate format we built a Flask APP to create routes to call in our data into a JS file via a D3 call.

## STEP 5: Data Visualization
We created three categories of visualizations. A Master Map using Mapbox and Leaflet, individual maps with Leaflet and a Speedomitor using Plotly.

These visualizations can be viewed on the following pages once the Flask APP from `app.py` is launched:
 - [Main/Master Map](http://127.0.0.1:5000)
    - made with all construction work types and wards layered in with colours
    - pop-ups with more details
    - can zoom, navigate with mouse, and toggle laters with controller
    - for logic see [map2.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/map2.js)
 - [Ward Map and Project Cost Speedometer](http://127.0.0.1:5000/wards)
    - Made with ward map that zooms and filters project list below upon click on map
    - Button to scrape data for live projects list
    - and reset list to show all wards
    - when ward selected total project cost range shown on speedometer
    - for logic of speedometer see [speedometer.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/speedometer.js)
    - for logic of map see [wardmap.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/wardmap.js)
 - [Road Map]()
    - for logic see [roadmap.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/roadmap.js)
 - [Multi-use Pathways Map](http://127.0.0.1:5000/multi-pathway)
    - single work type on map
    - pop-ups with more details
    - can zoom and navigate with mouse
    - for logic see [multimap.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/multimap.js)
 - [Water-Main Map](http://127.0.0.1:5000/water-main)
    - single work type on map
    - pop-ups with more details
    - can zoom and navigate with mouse
    - for logic see [watermap.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/watermap.js)
 - [Sewer Map](http://127.0.0.1:5000/sewer)
    - single work type on map
    - pop-ups with more details
    - can zoom and navigate with mouse
 - [Bike-lanes Map](http://127.0.0.1:5000/bike-lanes)
    - single work type on map
    - pop-ups with more details
    - can zoom and navigate with mouse
    - for logic, see [bikemap.js](https://github.com/serenaremlang/Ottawa-Construction/blob/main/app/static/js/bikemap.js)

 Individual html pages were made for each view and can be see in the [template folder](https://github.com/serenaremlang/Ottawa-Construction/tree/main/app/templates).
 
---

### Tools used:
- Database: MongoDB
- Website structure and presentation: Javascript, HTML, CSS/Bootstrap
- Mapping and chart: Leaflet, Mapbox, Plotly
- Data Import: JQ, Mongoimport
- Data Transformation and Retreival: Python, Pandas, BeautifulSoup, Flask


