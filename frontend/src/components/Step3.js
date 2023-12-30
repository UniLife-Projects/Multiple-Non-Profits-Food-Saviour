
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Step3({ formData, setFormData }) {
  return (
    <div className="other-info-container">
      <textarea readonly rows="5" cols="auto">
        The information you enter will be stored in a secure database
        that meets Canadian privacy regulations. If you have any
        concerns, please contact UBC Behavioural Research Ethics Council
        (BREB) about Barb Marcolin's study or call Dr. Marcolin at
        (250)807-9637 to ask any questions.
      </textarea>
      <div className="consent form-check ">
        <input
          className="form-check-input"
          type="radio"
          id="consent-check1"
          name="consent"
          value="consented"
          onChange={(e) => {
            if(e.target.checked){
            setFormData({ ...formData, Consent: e.target.value });
            }
            
          }}
        />
        <label
          className="form-check-label consent-text"
          for="consent-check1"
        >
          I accept
        </label>
      </div>
      <div className="consent form-check">
        <input
          className="form-check-input"
          type="radio"
          id="consent-check2"
          name="consent"
          value="not-consented"
          onChange={(e) => {
            if(e.target.checked){
            setFormData({ ...formData, Consent: e.target.value });
            }
          }}
        />
        <label
          className="form-check-label consent-text"
          for="consent-check2"
        >
          I refuse
        </label>
      </div>
      <div className="consent form-check">
        
        <a href="#"> More info</a>
       
         
        
      </div>
    </div>
  );
}

export default Step3;