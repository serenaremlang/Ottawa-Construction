from flask import Flask, jsonify
from flask_cors import CORS
import json
from bson import json_util
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

@app.route("/construction")
def index():
    results = mongo.db.geo_.find()
    data = []
    print(results)
    for row in results:
        del row['_id']
        data.append(row)

    #@TODO create 'template' for geojson
    return jsonify(data)

    # for k,v in results.items():
    #     print(k)
    #     if k!="_id":
    #         data.append({k:v})
    # return jsonify(data)

    # return jsonify(database = 'geo_', construction_data = json.loads(json_util.dumps(data)))
    


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