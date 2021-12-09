from flask import Flask, jsonify
from flask_cors import CORS
import json
from bson import json_util
from flask_pymongo import PyMongo
import collections

# Flask instance
app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/Ottawa"
mongo = PyMongo(app)

CORS(app, support_credentials=True)
# conn = "mongodb://localhost:27017"
# client = pymongo.MongoClient(conn)
# db = client.Ottawa
# construction = db.geo_
# wards = db.geo_ward

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

    #orderToChaos = jdata
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