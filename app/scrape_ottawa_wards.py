import requests
from bs4 import BeautifulSoup as bs
# from splinter import Browser
# from webdriver_manager.chrome import ChromeDriverManager
import os
import codecs

def scrape():
 
    # Scrape into Soup - hit the url and save it as a file (delete the file from the filesystem to have it fetch live again)
    if os.path.isfile("wards_scrape.html"):
        html = codecs.open("wards_scrape.html", "r", "ISO-8859-1").read()
    else:
        response = requests.get(f'https://ottawa.ca/en/planning-development-and-construction/construction-and-infrastructure-projects')
        f = open("wards_scrape.html", "x")
        f.write(response.text)
        f.close()
        html = codecs.open("wards_scrape.html", "r", "ISO-8859-1").read()

    #html.encoding = 'utf-8'
    soup = bs(html, 'html.parser')

    ottawa_wards = []
 
    # All of the ward titles are in strong tags wrapped by an h3  
    items = soup.select('h3 > strong')
    
    # loop through each strong tag now, and only process ones that are a ward. Also get the UL sibling to the parent h3 tag that has the data for each ward 
    for item in items:
    
        # get the ward title
        if item.text.lower().startswith('ward'):
            title = item.parent
            listData = title.find_next_sibling('ul')

            ward_dict = {
                "title": str(title),
                "listData":str(listData)
            }

            # Append the dictionary with the image url string and the hemisphere title to a list. This list will contain one dictionary for each hemisphere.
            ottawa_wards.append(ward_dict)      

    # Return results
    return ottawa_wards
