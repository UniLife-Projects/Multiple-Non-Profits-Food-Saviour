import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
let temp = [];
function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <div

        onChange={(e) => {
          if (e.target.checked) {
            temp.push(e.target.value);
            setFormData({ ...formData, Roles: temp });
            console.log(temp)

          } else {
            temp.pop(e.target.value);
            setFormData({ ...formData, Roles: temp });
          }



        }}


      >
        <div className="form-check">
          <input

            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault1"
            name="roles[]"
            value="User non-profit managers/CEO"
          />
          <label className="form-check-label" for="flexCheckDefault1">
            User non-profit managers/CEO
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault2"
            name="roles[]"
            value="User non-profit warehouse boss"

          />
          <label className="form-check-label" for="flexCheckDefault2">
            User non-profit warehouse boss
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault3"
            name="roles[]"
            value="User non-profit volunteer"

          />
          <label className="form-check-label" for="flexCheckDefault3">
            User non-profit volunteer
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault4"
            name="roles[]"
            value="Sponsors"

          />
          <label className="form-check-label" for="flexCheckDefault4">
            Sponsors
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault5"
            name="roles[]"
            value="Admin"

          />
          <label className="form-check-label" for="flexCheckDefault5">
            Admin
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input flexCheckDefault"
            type="checkbox"
            id="flexCheckDefault6"
            name="roles[]"
            value="Experts"

          />
          <label className="form-check-label" for="flexCheckDefault6">
            Experts
          </label>





        </div>

      </div>

    </div >

  );
}

export default PersonalInfo;