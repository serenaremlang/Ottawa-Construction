from flask import Flask, jsonify
from flask_cors import CORS
import json
from bson import json_util
import pymongo
from flask_pymongo import PyMongo

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

@app.route("/")
def index():
    results = mongo.db.geo_.find()
    data = []
    for row in results:
        data.append(row)

    return jsonify(database = 'geo_', construction_data = json.loads(json_util.dumps(data)))
    


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