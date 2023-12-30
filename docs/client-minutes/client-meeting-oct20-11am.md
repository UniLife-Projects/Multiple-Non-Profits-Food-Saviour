# Thursday 20 October 2022

## Attendees

- Barb Marcolin
- AbdulAziz Almutlaq
- Harman Sahota
- Maysey Lu
- Jordan Onwuvuche

## Follow-Ups from Last Week

- Was Barb able to complete the demo walkthrough of the website?

## Agenda

-

## To Do

- [ ] Design website page hierarchy.
- [ ] Design website dashboards.
- [ ] Get anyone with Linux skills reach out to Barb
  - Wade gave Barb the syntax for that

## Research

- [ ] Have to look at how we can help Barb visualize the tracker data

## Minutes

- Barb has the code to get our SSH Keys on virtual machine.
- Make sure to keep the SSH Keys private.
  - Regenerate one if you put it anywhere through the internet.
- There are members on other teams with Linux skills that will co-ordinate with Barb and Abdul on the virtual machine.
- Barb asks where we're documenting requirements
  - Told her we have a shared repo and documents.
  - She recommends this for generic requirements.
  - Don't put people's names such as those of partners and others involved in the project.
  - Putting Info in Google Docs goes against federal and provincial law since it goes past the border.
  - Use a VPN as you work on the project.
- Have to adapt test plans to create testing for our work.
- Use view used in the sql file to maintain consistence with the tracker data collected.
- Barb will not release any demo.
- Individual graphs contains all graphs belonging to individuals.
- Tracker Home is where people feed in their data..
- There are access controls to filter the display of dashboards according to the type of user signing in.

## Decisions

- Put a functionality on the TA page to add new user groups, using a button.
- Use similar terminology with project as Barb.
- Make sure there is adequate content in the 'Physical Activity' dashboard in case people's doctors or personal trainers come in to analyse.
- Place dietician content under 'Healthy Eating'.
- Replicate 'Discussion board' functionality on other pages.
- Make the discussions by health professionals private from other user groups.
- Make Everyone with an account can see this page: 'Weekly Challenge'.
  - This will entice those.
- Make Tracker Home, Individual Graph, up to a .......... private to each user.
- Make the landing page the only page open to the outside Internet.

  - Will decide this later

- Bands in the graph are designated by the Health Professionals to represent different value categories.
- We're getting rid of the 'Public ORT Survey'.
  - Will replace with a content box that displays messages or announcements to the entire community. Not everyone will be able to. To discuss this later.
- Don't make graphs clickable, represent graphs representing all kinds of data.
  - Limit the data users have to fill in as much as possible.

## Questions

###### Shall we be making a patient dashboard?

> **Answered below**

###### More clarification on the patients dashboard

    - These are the people that will receive the health services
    - We need to change this terminology to the dashboards on the site since this is a generic term that integrates some other dashboards already on the site

###### Any information on the demo?

    - Not releasing any demo

###### On the trackers page, there's three buttons: consent, permission, and privacy. What is the difference between these three and how will that affect the data?

    - To be given the details on this later
    - There are a bunch of the categories already marked in the database

###### In the screenshots, is there a reason why there is an individual graphs page with physical activity and health measures graphs, but then also a separate page for the physical activity graphs and a separate page for the health measures graphs (basically, we have duplicate graphs)

    - Barb cut and paste content all over to fill the dashboards.
    - These dashboards will contain specialised content.
    - Individual graphs only has physical activities, filtered by the exercise category
    - Health Measures have only health trackers filtered by the 'Health' category

###### Are the homeless a separate user group?

    - They will be in the 'General' group according to the sql database.
    - They might or might not even get accounts on the website.

###### Please double check who are the user groups are and compare it to what we have in the report

    - The User Groups are built into the database
    - New groups could be added in by adding rows in the sql database
    - Could add functionality that adds new user groups using a button
    - Barb is trying not to have any groups created

###### Who makes the ToDo List or Target Goals?

    - Will go through this later on.

###### Will info be encrypted??

    - No info will be encrypted

###### Will weather be loaded from API?

    - Nop

###### Location tracking?

    - No, just a map displaying the trail
    - No tracking individuals
