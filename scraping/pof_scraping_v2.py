# import dependencies
from bs4 import BeautifulSoup as bs
from lxml import html
import requests
import pymongo
from splinter import Browser
import time
import pandas as pd
import numpy as np



def profileScrape(soup):
    profile_dict = {}
    
    ## USERNAME AND HEADLINE ##
    ###########################

    # use bs and splinter to find username and headline
    user = soup.find(id = "username").text
    headline = soup.find(id = "headline").text

    #print(user)
    #print(headline)

    #add to dict
    profile_dict["username"] = user
    profile_dict["headline"] = headline


    ## GET INFO FROM PROFILE TABLE 1 ##
    ###################################
    # use bs and splinter to find first table of profile information
    # this is done in parts
    # part 1: find header names for first profile table

    about_head = soup.find_all("div", class_= "profileheadtitle")
    headers = []
    for info in about_head:
        headers.append(info.text.replace("\n", ""))
    #headers

    # part 2: find first half of content (left side of table)
    about_content_1 = soup.find_all("div", class_="profileheadcontent")
    content = []
    for info in about_content_1:
        content.append(info.text.replace("\n\n", "").replace("\n", " "))
    #len(content)

    # part 3: find 2nd half of content (right side of table)

    about_content_2 = soup.find_all("div", class_="profileheadcontent-narrow")
    content_2 = []
    for info in about_content_2:
        content_2.append(info.text.replace("\n\n", "").replace("\n", " "))
    #len(content_2)

    # part 4: combine both content into one list
    all_content = np.array([content, content_2])
    all_content_ordered = np.ravel(all_content, order = "F")
    #all_content_ordered

    # define dictionary to hold data in the first profile table. keys = header/title, value = content

    profile_info_1 = dict(zip(headers, all_content_ordered))
    #profile_info_1

    # add to dict
    profile_dict["profile_info_1"] = profile_info_1

    ## GET INFO FROM PROFILE TABLE 2 ##
    ###################################

    about_head_2 = soup.find_all("span", class_="headline")

    headers_2 = []
    for i in range(9, 25):
        headers_2.append(about_head_2[i].text.replace("\n",""))
        
    #headers_2

    about_content_3 = soup.find_all("table")[1]("span", class_="txtGrey")
    content_3 = []
    for info in about_content_3:
        content_3.append(info.text.replace("\n", ""))
    #content_3

    profile_info_2 = dict(zip(headers_2, content_3))
    #profile_info_2

    # add to dict
    profile_dict["profile_info_2"] = profile_info_2

    ## INTERESTS ##
    ###############

    # interests
    try:
        interests = soup.find(id="interests").text.split("\n")[1:4]
    except: 
        interests = "None"
        print("No interests were entered")

    #interests
    # add to dict
    profile_dict["interests"] = interests

    ## ABOUT ME DESCRIPTION ##
    ##########################

    about_me = soup.find(id="description").text.replace("\n", "")
    about_me_split = about_me.split(" ")
    #about_me_split

    profile_dict["about_me_text"] = about_me
    profile_dict["about_me_split"] = about_me_split

    ## DICTIONARY WITH PROFILE DATA OF ONE USER
    #print (profile_dict)

    return profile_dict

def init_brower():
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)

def main():

    browser = init_brower()
    
    # define initial login page and the pages we want to visit after logging in ##
    ##############################################################################

    pof_login_url = 'https://login.pof.com' #define login url (need to add username and password) 

    pof_online = 'https://www.pof.com/basicsearch.aspx' # currently online url - page 1

    pof_base = 'https://www.pof.com/' # base url

    pof_nextpage = 'everyoneonline.aspx?page_id=' # base next_page

    ######################
    ## visit login page ##
    browser.visit(pof_login_url) 

    # input login credentials
    browser.fill("username", "akela_1111") 
    browser.fill("password", "plentyoffish")

    browser.click_link_by_id("logincontrol_submitbutton") # click submit to enter credentials

    browser.visit(pof_online) # next go to the page that shows everyone who is online now - page 1

    

    count = 0
    profile_urls = []
    page = 2


    while len(profile_urls) < 1000:
        
        html = browser.html
        soup = bs(html, "html.parser")
        
        
        online_results = soup.find_all("div", class_="results")
        
        
        
        for info in online_results:
            profile_page = pof_base + info.find('a')['href']
            
            if profile_page not in profile_urls:
                
                profile_urls.append(profile_page)
                print(f"{count + 1} profile urls found")
                count += 1
            else:
                continue
        
        page += 1
        try:
            new_page = pof_base + soup.find(id = 'basicsearch_nextpage')['href']
            browser.visit(new_page)
        
        except:
            print("last page")
            browser.visit(pof_base + 'abandon.aspx')
            browser.visit(pof_login_url)
            browser.fill("username", "serruhb") 
            browser.fill("password", "password")
            browser.click_link_by_id("logincontrol_submitbutton") # click submit to enter credentials
            browser.visit(pof_online) # everyone who is online - page 1
            continue
            


    # loop through and visit each profile page and scrape
    datamate_profiles = {}
    profile_num = 0

    for url in profile_urls:
        browser.visit(url)
        
        html = browser.html
        soup = bs(html, "html.parser")

        username = 'match_' + str(profile_num)
        datamate_profiles[username] = profileScrape(soup)
        print(f"profile {profile_num + 1} of {count} scraped")
        profile_num += 1
    
    print(datamate_profiles)
    return datamate_profiles


main()
