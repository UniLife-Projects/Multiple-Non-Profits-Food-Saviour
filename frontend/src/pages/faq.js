import 'bootstrap/dist/css/bootstrap.min.css';
import startedCSS from './faq.module.css';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

function FAQ() {
   localStorage.clear();
   return (

      <section>
         <div className='container p-2'>
            <div className='card'>
               <div className='card-body'>
                  <h4 className='card-title'>Frequently Asked Questions</h4>
                  <h8 className='card-subtitle mb-2 text-muted'>If you need more support, please contact example@email.com.</h8>

                  <hr />

                  <nav>
                     <ul>
                        <li><a href='#register'>How to create an account</a></li>
                        <li><a href='#login'>How to log into your account</a></li>
                        <li><a href='#tracker'>How to use the tracker</a></li>
                     </ul>
                  </nav>

                  <hr />

                  <h5 id='register'>How to create an account</h5>
                  <ol>
                     <li>Register for an account by clicking on one of the two icons on the Home page.</li>
                     <li>Enter your credentials, select your role(s), and give consent.</li>
                     <li>Click on the 'Submit' button.</li>

                     <p>And you're done! You have successfully created an account and can now start tracking how much food you have saved and start connecting with other organizations in the Food Saviour community.</p>
                  </ol>

                  <h5 id='login'>How to log into your account</h5>
                  <ol>
                     <li>Log into your account by clickon on one of the two icons on the Home page.</li>
                     <li>Enter the email and password you used to create your account.</li>
                     <li>Click on the 'Login' button.</li>
                  </ol>

                  <h5 id='tracker'>How to use the tracker</h5>
                  <ol>
                     <li>Navigate to the Tracker page by clicking on 'Tracker' in the navigation bar.</li>
                     <li>Select the category your food best falls under.</li>
                     <li>(Optional) Enter a description for your food (i.e. Apples).</li>
                     <li>Select the weight unit.</li>
                     <li>Enter the amount of food according to your selected weight unit.</li>
                     <li>Enter how much food had been diverted to each source according to your selected weight unit. As you enter the numbers, the calculator will automatically convert the data you entered into percentages on the right hand side.</li>
                     <li>Once you are finished entering your data, click on the 'Save' button.</li>
                     <li>Scroll down below and you should see a graph generated based on the data you entered.</li>
                     <li>Below the graph, you can view the data you entered and delete the data entry by click on the 'Delete' button.</li>
                  </ol>

               </div>
            </div>
         </div>
      </section>
   );
}

export default FAQ;