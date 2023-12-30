import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Step4({ formData }) {

    return (
             <>
             <p>First Name: {formData.FirstName}</p>
             <p>Last Name: {formData.LastName}</p>
             <p>Email: {formData.Email}</p>
             <p>Organization: {formData.Organization}</p>
             <p>Roles: {formData.Roles}</p>
             <p>Consent: {formData.Consent}</p>
             </>
    );
}

export default Step4;