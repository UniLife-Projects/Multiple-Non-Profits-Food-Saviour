# Client Meeting 25 January 2023 10 am

## Follow-Ups from Last Week

- The conversion of all pages to React

## Agenda

- Give Barbs access to the repository and the database.
- The next phases and completion of front end conversion.

## To Do

###### Network / Sharing page

- [ ] Make a version that is open to logged in users and a version that is open to the public
- [ ] The 'network' page should be renamed into the 'sharing' page
- [ ] Grant users the ability to share items to a particular organization / person within an organization
- [ ] Should logged in users wish, they can decide to make their post visible to non-logged-in users (public)
- [ ] Everything non-logged-in users post should be visible to both logged-in and non-logged-in users

###### Barb's Access

- [ ] Have to grant Barbs access to edit the database
  - This may mean having the ability to add / alter rows
- [ ] Configure Django to grant Barbs access to the backend administration
  - Has to be done to ensure that she can setup the inbuilt django admin developer portal
  - /admin **(built in to django)**
- [ ] Notify the final API coding choices in the Barb's project repository discussions

###### Database

- [ ] Make a third normal form diagram for the database
  - Best done in both our group repository and Barb's repository

###### FrontEnd

- [ ] Proceed to continue work on the front end
  - This consists of finishing touches including the charts on the tracker page

## Minutes

- The back end has to be able to deal with large amounts of data
  - The front end has to be adapted to display those large amounts (wide and well positioned fields)
- Groups A and C seem to be almost done with their back end integration of the REST API
  - Fortunately, Group B (us) seem to be ahead on the front end conversion to Reactjs
