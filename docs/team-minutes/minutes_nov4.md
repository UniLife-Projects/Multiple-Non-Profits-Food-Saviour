# Team Meeting Minutes - Nov. 4th, 2022

**Important:** We have changed the project from tracking users' health metrics to tracking organizations' food waste
- Essentially what this website will do is allow people (i.e. employees, volunteers) from organizations to use this website as an easy way to calculate how much food waste they have saved and keep track of this data for their records. They need this data/records for when they apply for government grants.

<hr>

## Website features:

  - Be able to create and log into an account
  - Be able to input the amount of food they started with for each metric/tracker
  - Be able to offer different techniques to prevent food waste depending on the type of food they have
  - Be able to input the amount of food they have diverted from food waste
  - Be able to calculate the impact the food waste they saved on the environment (i.e. carbon footprint)
  - Be able to generate a visual graphic to support this data
  - Be able to export these numbers and graphics into a PDF or CSV file for them to save
  - Be able to connect with other organizations using this website (networking)
    - Organizations should be able to offer or request services to help reduce food waste
  - User accounts have roles assigned to them which give them different levels of access to features on the website dependning on their role:
    - According to Barb's document, there are 7 roles:
        1. non-profit managers/CEO
        2. non-profit warehouse boss
        3. non-profit staff
        4. non-profit volunteer
        5. sponsors
        6. admin
        7. experts

        *Please check [FoodSaviourDescription.md](https://github.com/COSC499demo-rtp/coscdemo/blob/main/FoodSaviourDescription.md) on Barb's repo for more information*

<hr>

## Upcoming Deadlines:

**For COSC 499:**

November 18th: 
- Prototype Demo Video
- List of Usability Tasks for Peer Testing #1

November 23rd/25th:
- Peer Testing #1

December 2nd:
- Peer Testing #1 Report
- Peer Evaluations #2

<br>

**For Barb:**

*(This information is taken from her document)*

November 16th:
- Write the one-page summary of your search and identify the gap you’re filling:

  - Do basic DJango pages with modules or components for 3 of these web-pages with MINIMAL details. Start getting as much as you can in your 10 hours a week you should spend on this class into the documents.
  - Work with Barb to scope the work and ensure you meet the requirements.
  - Other deadlines before December: Let Barb know
  - Deadline - December 2022: Gema needs you to have a basic web-site by first week of December 2022 with basic user testing.
  - Teams need to move to Django rough pages quickly. Barb does not think we need Figma mock-up with this version, and should go to Django and CMS samples because they should already be setup on each student’s machine. If not complete, get Django and CMS extensions installed.
  - Gema does not need FIGMA mockups. You should be able to use the modules and components of Django and Graphics tools to illustrate rough examples. Put boxes as place holders like Barb did in her prior system (e.g., Box around the letters “Discussion Board”).

<hr>

## Important Information

These are the things that Gema expects us to have done in time for the peer testing:

1. Setup user accounts
    - This means we need to create an account for each role that will be in the system. With each account, there is a level of access they have to the website's functionality. As of right now, we only know:
        - CEO/Manager has the ability to approve roles for the user accounts, be able to access the work/calculations that has been done for the organization, and be able to do their own calculations and generate graphics
        - Volunteer has the ability to do calculations and generate graphics
    - Maysey has emailed the TA/Gema regarding this as we only know the access level of 2 roles even though Barb has told us there are 7 roles

2. Enter one metric/tracker and generate graphics
    - The entire project requires us to have 5 metrics, but for the peer testing, we only need to have one completed for now. 
    - This is where the research that Barb has instructed us to do comes in. 
      - First, we need to selected a metric (Maysey thinks fresh produce would be the easiest one to start with). 
      - Then, we need to be able to offer the user different methods/techniques they can use to reduce the food waste. This would include the cost, how much of their carbon footprint they reduced, etc. 
      - We also need to generate graphics based on the data they've entered.

3. View/Interact with the Networking dashboard
    - As previously mentioned, there will be a page where organizations can offer or request services to reduce food waste
      - For example, a farmer might have 1000lbs of apples they need to get rid of. They can make a post on the dashboard to let other organizations know, who might be interested in taking those apples or have a service they can offer to get rid of them.

<hr>

## Our Plan/Schedule

As you can see, there are many deadlines coming up very soon. And while it is reading week next week, we need to do some work to meet these deadlines in time. 

Currently, we only have the homepage and the registration page coded. Jordan says he will get the login page done either Sunday or Monday. 

Once the login page is completed, Harman will begin setting up the backend, which will presumably be on Thursday, Nov. 10th at the latest. And once the backend is setup, we can begin creating user accounts and limit their access depending on their role. 

In the meantime, Maysey will begin designing the tracker page where users input their data. 

What still needs to be done ASAP:
1. Someone needs to do the research that Barb has requested. 
    - This includes finding different methods to reduce food waste of FRESH PRODUCE and the formulas to calculate how much food waste is reduced using those methods. 
    - There are some methods mentioned in Barb's document already, so look into those as well before you begin your own research. 
    - Only once this task is done can we start coding the graphics that will be generated.
2. Someone needs to start designing the networking dashboard
    - This would include the overall layout of the page
    - How users can post on the board and what information/fields are needed to make a post
    - How users can interact on this board
3. Someone has to make all the pages coded so far responsive.
4. Javascript validation of the login and register forms. 


Some more tasks that Harman will do - 
1. Add the consent for registration form 
2. left-align the roles to give them a cleaner look (center alignment is not ideal)
3. Add an 'I disagree' option in the consent

Maysey can try to add content to the homepage. 
