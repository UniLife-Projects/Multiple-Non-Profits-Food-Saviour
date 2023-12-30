# Client Meeting 8 February 2023 1000

## Follow-Ups from Last Week

- REST API connection

## Agenda

- Refresher on the progress of the REST API connection.
- Progress check on the Landing page.

## Minutes

- Group C (Mitch's group) are working on connecting the tracker page back end to the front end through the REST API
  - They're wondering how it works with Reactjs because with Django, CSRF tokens were utilised, now they're not sure of how it works
- Group A (Ilya's group) is also figuring out
- We're utilising what Harman calls session tokens
  - Harman uses JSON to connect to back end database from Reactjs
  - When he gets the JSON data then he connects it to the front end using the session tokens
  - Session tokens are only in the front end
- Barbs is utilising the JSON web tokens for the tracker page
  - Barbs recommends 30 minutes for cookies to expire
  - Group C says it's recommended to make about week of cookie duration or even more
  - This is because short cookie duration expiry would make clients login frequently hence too many cookies sent to the front end and over population of requests for the server
  - Default cookie duration expiry is about a week
- Other groups are passing the user names to the database

###### Landing page

- Group A (Ilya) is planning on placing the 'Discussions' on the 'Landing page'
- Group B (us) as well as Group C (Mitch) plan on having separate pages for the Landing and Discussions / Sharing page.
  - There will be icons on the landing page leading to the Discussions page
- Group C will allow anyone that clicks the link to view the page.
- Aziz is working on the implementation of the Discussions page

## Decisions

- Project timeline constrained to August due to availability.

## Questions

> Does anyone have a concern if the JSON token expires in 30 minutes?

- Group C is not sure about how to implement that at all

## Harman's Additions

- send session tokens as part of login data
- they dont expire for 30 mins
- default 7-8 days
- json tokens
- test to see how long they last
- gonna have to use some framework for this
- the only change to make in the backend is make tokens and pass it on to the frontend
- then use this token to set time etc etc
- csrf token
- auth token
- no security in login yet
- only checking for the correct credentials
- need to integrate tokens and such into it which i have no idea yet how to do
- not sending username password, sending hashed link
- api session information
- saving hashed password in the db
- other before landfill
- description
- Something like this:
- Image

###### Editing Tracker functionality

- sharing page graph
- sharing; who to share with - goes in the form
- discussion posts - posts display as per permissions set
- display aggregate shared data / take same graphic on - tracker and page repeat with data from 3 people
- graphics of different organizations
- previously first before ..😆
- remove id from admin tables
- withdrawing permissions is not optional
  add datetime field to tables

- Profile > consent:
  - If they decide to withdraw their consent, their account is deactivated immediately. Have a blurb (Maysey could explain what she meant by that) that tells the user to download their data before they withdraw
