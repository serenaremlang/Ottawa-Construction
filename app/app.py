from flask import Flask, render_template
import pymongo
from flask_pymongo import PyMongo

# Flask instance
app = Flask(__name__)
# mongo = PyMongo(app, uri="mongodb://localhost:27017/Ottawa")
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.Ottawa
construction = db.geo_
wards = db.geo_ward

# Home route to render template
@app.route("/")
def index():

    ott_data = list(db.geo_.find())
    print(ott_data)
    return render_template('index.html', ott_data=ott_data)


# @app.route('/bike')
# def bike():

# @app.route('/road')
# def road():

# @app.route('/ward')
# def ward():

if __name__ == "__main__":
    app.run(debug=True)