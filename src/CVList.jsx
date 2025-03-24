import "./CVList.css";
import DATA from "./data";
import CvForm from "./CvForm";
import { useState } from "react";

function CvBasicDisplay({
  fullName = "John Smith",
  dateLastEdit = "1900-01-01",
  isVisible = isVisible,
  setIsVisible = setIsVisible,
  setUser = setUser,
  data = data,
}) {
  return (
    <div className="cv-basic-display">
      <div className="left-div-basic-display">
        <h2 className="text-basic-display text-full-name">{fullName}</h2>
        <p className="text-basic-display text-date">
          last edit: {dateLastEdit}
        </p>
      </div>
      <div className="right-div-basic-display">
        <Button
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          useUser={data}
          setUser={setUser}
          img="../edit-3-svgrepo-com.svg"
        ></Button>
      </div>
    </div>
  );
}

function Button({ isVisible, setIsVisible, useUser, setUser, img }) {
  function newDisplayClick() {
    setIsVisible(!isVisible);
    setUser(useUser);
    console.log(useUser);
  }

  return (
    <>
      <button className="cv-add-button" onClick={newDisplayClick}>
        <img src={img} className="plus-icon"></img>
      </button>
    </>
  );
}

function CvList({ useData, isVisible, setIsVisible, setUser }) {
  return (
    <>
      {useData.map((dat) => (
        <CvBasicDisplay
          fullName={dat.fullName}
          key={dat.keyID}
          dateLastEdit={dat.dateLastEdit}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setUser={setUser}
          data={dat}
        ></CvBasicDisplay>
      ))}
    </>
  );
}

function CV() {
  const [isVisible, setIsVisible] = useState(false);
  const [useData, setUseData] = useState(DATA);
  const [useUser, setUser] = useState({});

  return (
    <>
      {!isVisible && (
        <div className="main">
          <h1 className="title">CV List</h1>
          <div className="add-cv-button-div">
            <h2>Add Cv form</h2>
            <Button
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              useUser={{}}
              setUser={setUser}
              img="../add-plus-svgrepo-com.svg"
            ></Button>
          </div>

          <CvList
            useData={useData}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setUser={setUser}
          ></CvList>
        </div>
      )}

      {isVisible && (
        <div className="pop-up-editor">
          <CvForm
            data={useUser}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setUseData={setUseData}
            useData={useData}
          ></CvForm>
        </div>
      )}
    </>
  );
}

export default CV;
