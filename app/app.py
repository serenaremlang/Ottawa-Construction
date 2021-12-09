from flask import Flask, render_template, redirect, jsonify
from flask_cors import CORS
import json
from bson import json_util
from flask_pymongo import PyMongo
import collections
import scrape_ottawa_wards

# Flask instance
app = Flask(__name__)

# Mongo connection with pyMongo
app.config["MONGO_URI"] = "mongodb://localhost:27017/Ottawa"
mongo = PyMongo(app)

CORS(app, support_credentials=True)
# conn = "mongodb://localhost:27017"
# client = pymongo.MongoClient(conn)
# db = client.Ottawa
# construction = db.geo_
# wards = db.geo_ward

# Home route to render template
@app.route("/")
def home():

    # Return templated data
    return render_template("index.html")


# road work route to render template
@app.route("/road-work")
def road_work():

    # Return templated data
    return render_template("road-work.html")


# water main route to render template
@app.route("/water-main")
def water_main():

    # Return templated data
    return render_template("water-main.html")


# sewer route to render template
@app.route("/sewer")
def sewer():

    # Return templated data
    return render_template("sewer.html")


# multi pathway route to render template
@app.route("/multi-pathway")
def multi_pathway():

    # Return templated data
    return render_template("multi-pathway.html")


# bike lanes route to render template
@app.route("/bike-lanes")
def bike_lanes():

    # Return templated data
    return render_template("bike-lanes.html")


# Wards route to render template
@app.route("/wards")
def wards():

    # Get all the data from mongo
    all_wards = mongo.db.wards.find({})

    # Return templated data
    return render_template("wards.html", wards=all_wards)


# Route for scraping
@app.route("/wards/scrape")
def scrape():

    # ref to mongo 
    mongo_wards = mongo.db.wards

    # call scrape function
    wards_data = scrape_ottawa_wards.scrape()
    
    # clear out the existing documents
    mongo_wards.delete_many({})

    # Update the Mongo db with the latest data
    mongo_wards.insert_many(wards_data)

    # Redirect back home
    return redirect("/wards", code=302)


@app.route("/construction")
def index():
    results = mongo.db.geo_.find()
    data = []
    # jdata = collections.OrderedDict()
    
    # jdata['type'] ='FeatureCollection'
    # jdata['name'] = 'Construction_Road_resurfacing%2C_watermain%2C_sewer%2C_multi-use_pathways%2C_bike_lanes'
    # jdata['crs'] = { 'type': 'name', 'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' } } 
    
    for row in results:
        del row['_id']
        data.append(row)

    #jdata['features'] = data 
    return jsonify(type = 'FeatureCollection', name =  'Construction_Road_resurfacing%2C_watermain%2C_sewer%2C_multi-use_pathways%2C_bike_lanes', crs = { 'type': 'name', 'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' } } , features = json.loads(json_util.dumps(data)))

    # for k,v in results.items():
    #     print(k)
    #     if k!="_id":
    #         data.append({k:v})
    # return jsonify(data)

    #return jsonify(database = 'geo_', construction_data = json.loads(json_util.dumps(data)))
    

@app.route('/geo_ward')
def geo_ward():
    results = mongo.db.geo_ward.find()
    data = []
    for row in results:
        data.append(row)
    return jsonify(database = 'geo_ward', geo_ward_data = json.loads(json_util.dumps(data)))


@app.route('/ward')
def ward():
    results = mongo.db.wards.find()
    data = []
    for row in results:
        data.append(row)
    return jsonify(database = 'wards', ward_data = json.loads(json_util.dumps(data)))


if __name__ == "__main__":
    app.run(debug=True)