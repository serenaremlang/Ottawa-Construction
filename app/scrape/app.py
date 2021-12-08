from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_ottawa_wards

# Flask instance
app = Flask(__name__)

# Mongo connection with pyMongo
app.config["MONGO_URI"] = "mongodb://localhost:27017/Ottawa"
mongo = PyMongo(app)

# Home route to render template
@app.route("/")
def home():

    # Get all the data from mongo
    all_wards = mongo.db.wards.find({})

    # Return templated data
    return render_template("index.html", wards=all_wards)


# Route for scraping
@app.route("/scrape")
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
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
