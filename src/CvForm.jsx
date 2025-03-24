import { useEffect, useState } from "react";
import "./CvForm.css";

function LaboralExperience(props) {
  const [laboralExperienceForm, setLaboralExperienceForm] = useState(
    props.experience || {
      companyName: "",
      ciudad: "",
      dateStart: "",
      dateEnd: "",
      jobDescription: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaboralExperienceForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrap">
      <label htmlFor="companyName" className="label-form">
        company name
        <input
          type="text"
          name="companyName"
          value={laboralExperienceForm.companyName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="ciudad" className="label-form">
        city
        <input
          type="text"
          name="ciudad"
          value={laboralExperienceForm.ciudad}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="dateStart" className="label-form">
        date start
        <input
          type="date"
          name="dateStart"
          value={laboralExperienceForm.dateStart}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="dateEnd" className="label-form">
        date end
        <input
          type="date"
          name="dateEnd"
          value={laboralExperienceForm.dateEnd}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="jobDescription" className="label-form">
        job description
        <textarea
          name="jobDescription"
          rows={4}
          cols={40}
          value={laboralExperienceForm.jobDescription}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function Education(props) {
  const [educationForm, setEducationForm] = useState(
    props.education || {
      educationType: "",
      date: "",
      place: "",
      institution: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrap">
      <label htmlFor="educationType" className="label-form">
        Type Education{" "}
        <select
          name="educationType"
          value={educationForm.educationType}
          onChange={handleChange}
        >
          <option value="Select">Select</option>
          <option value="University">University</option>
          <option value="Secundaria">High School</option>
          <option value="Primaria">Elementary School</option>
        </select>
      </label>
      <label htmlFor="educationDate" className="label-form">
        Date{" "}
        <input
          type="date"
          name="educationDate"
          value={educationForm.date}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="place" className="label-form">
        Place
        <input
          type="text"
          name="place"
          value={educationForm.place}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="institution" className="label-form">
        institution
        <input
          type="text"
          name="institution"
          value={educationForm.institution}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function CvForm({ data, isVisible, setIsVisible, setUseData, useData }) {
  const [formData, setFormData] = useState({
    keyID: data.keyID || useData.length + 1,
    fullName: data.fullName || "",
    dateLastEdit: data.dateLastEdit || new Date().toISOString().split("T")[0],
    contactNumber: data.contactNumber || "",
    email: data.email || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
    personalWebSite: data.personalWebSite || "",
    introductionText: data.introductionText || "",
    laboralExperience: data.laboralExperience || [
      {
        companyName: "",
        ciudad: "",
        dateStart: "",
        dateEnd: "",
        jobDescription: "",
      },
    ],
    education: data.education || [
      {
        educationType: "",
        date: "",
        place: "",
        institution: "",
      },
    ],
    extraSkill: data.extraSkill || [],
  });

  const handleChange = (e, index = null, arrayName = null) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      if (arrayName !== null && index !== null) {
        // Si el cambio es dentro de un array (education, laboralExperience)
        return {
          ...prevState,
          [arrayName]: prevState[arrayName].map((item, i) =>
            i === index ? { ...item, [name]: value } : item
          ),
        };
      } else {
        // Si el cambio es en un campo normal
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const Data = new FormData(event.target);
    const formObject = Object.fromEntries(Data.entries());

    const updatedFormData = {
      ...formData,
      ...formObject,
      dateLastEdit: new Date().toISOString().split("T")[0],
    };

    setFormData(updatedFormData);

    setUseData((prevUseData) => {
      if (Array.isArray(prevUseData)) {
        const updatedData = prevUseData.map((cv) =>
          cv.keyID === updatedFormData.keyID ? updatedFormData : cv
        );

        return prevUseData.some((cv) => cv.keyID === updatedFormData.keyID)
          ? updatedData
          : [...prevUseData, updatedFormData];
      }

      return [updatedFormData];
    });

    setIsVisible(!isVisible);
  };

  const newEducationClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [
        ...prevFormData.education,
        {
          id: prevFormData.education.length + 1,
          educationType: "",
          date: "",
          place: "",
          institution: "",
        },
      ],
    }));
  };

  const newExperienceClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      laboralExperience: [
        ...prevFormData.laboralExperience,
        {
          id: prevFormData.laboralExperience.length + 1,
          companyName: "",
          ciudad: "",
          dateStart: "",
          dateEnd: "",
          jobDescription: "",
        },
      ],
    }));
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="fullName" className="label-form">
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          ></input>
        </label>

        <label htmlFor="contactNumber" className="label-form">
          Phone Number
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email" className="label-form">
          Email{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="linkedin" className="label-form">
          Linkedin
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="github" className="label-form">
          Github
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="personalWebSite" className="label-form">
          Personal Website
          <input
            type="text"
            name="personalWebSite"
            value={formData.personalWebSite}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="introductionText" className="label-form">
          Introduce your self
          <textarea
            name="introductionText"
            rows={4}
            cols={40}
            value={formData.introductionText}
            onChange={handleChange}
          />
        </label>

        <div className="group">
          <div className="button-wrap">
            Experience
            <button
              className="cv-editor-button"
              onClick={newExperienceClick}
              type="button"
            >
              <img
                src="../add-plus-svgrepo-com.svg"
                className="add-form-button"
              ></img>
            </button>
          </div>
          {formData.laboralExperience.map((obj, index) => (
            <div className="wrap" key={"laboralExperience" + index}>
              <label htmlFor="companyName" className="label-form">
                company name
                <input
                  type="text"
                  name="companyName"
                  value={obj.companyName}
                  onChange={(e) => handleChange(e, index, "laboralExperience")}
                />
              </label>
              <label htmlFor="ciudad" className="label-form">
                city
                <input
                  type="text"
                  name="ciudad"
                  value={obj.ciudad}
                  onChange={(e) => handleChange(e, index, "laboralExperience")}
                />
              </label>
              <label htmlFor="dateStart" className="label-form">
                date start
                <input
                  type="date"
                  name="dateStart"
                  value={obj.dateStart}
                  onChange={(e) => handleChange(e, index, "laboralExperience")}
                />
              </label>
              <label htmlFor="dateEnd" className="label-form">
                date end
                <input
                  type="date"
                  name="dateEnd"
                  value={obj.dateEnd}
                  onChange={(e) => handleChange(e, index, "laboralExperience")}
                />
              </label>
              <label htmlFor="jobDescription" className="label-form">
                job description
                <textarea
                  name="jobDescription"
                  rows={4}
                  cols={40}
                  value={obj.jobDescription}
                  onChange={(e) => handleChange(e, index, "laboralExperience")}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="group">
          <div className="button-wrap">
            Education
            <button
              className="cv-editor-button"
              onClick={newEducationClick}
              type="button"
            >
              <img
                src="../add-plus-svgrepo-com.svg"
                className="add-form-button"
              ></img>
            </button>
          </div>

          {formData.education.map((obj, index) => (
            <div className="wrap" key={"education" + index}>
              <label htmlFor="educationType" className="label-form">
                Type Education
                <select
                  name="educationType"
                  value={obj.educationType}
                  onChange={(e) => handleChange(e, index, "education")}
                >
                  <option value="Select">Select</option>
                  <option value="University">University</option>
                  <option value="Secundaria">High School</option>
                  <option value="Primaria">Elementary School</option>
                </select>
              </label>
              <label htmlFor="date" className="label-form">
                Date
                <input
                  type="date"
                  name="date"
                  value={obj.date}
                  onChange={(e) => handleChange(e, index, "education")}
                />
              </label>
              <label htmlFor="place" className="label-form">
                Place
                <input
                  type="text"
                  name="place"
                  value={obj.place}
                  onChange={(e) => handleChange(e, index, "education")}
                />
              </label>
              <label htmlFor="institution" className="label-form">
                Institution
                <input
                  type="text"
                  name="institution"
                  value={obj.institution}
                  onChange={(e) => handleChange(e, index, "education")}
                />
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CvForm;
