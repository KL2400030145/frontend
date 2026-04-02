import React, { useEffect, useState } from 'react';
import './App.css';
import { callApi } from './lib';

const App = () => 
{
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [sid, setSid] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [savePopup, setSavePopup] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Load all data
  function loadData() {
    callApi("GET", "/getall", null, readResponse);
  }

  function readResponse(data) {
    setStudentData(data);
  }

  // 🔹 Save
  function saveData() {
    if (name.trim() === "") {
      alert("Enter Name");
      return;
    }

    if (dept.trim() === "") {
      alert("Enter Department");
      return;
    }

    let data = {
      sname: name,
      sdept: dept
    };

    callApi("POST", "/insert", data, saveResponse);
  }

  function saveResponse(data) {
    alert(data);
    closeSaveData();
    loadData();
  }

  function showSaveData() {
    setName("");
    setDept("");
    setSid("");
    setSavePopup(true);
  }

  function closeSaveData() {
    setSavePopup(false);
  }

  // 🔹 Delete
  function deleteData(id) {
    let res = confirm("Do you want to delete?");
    if (!res) return;

    callApi("DELETE", "/delete/" + id, null, deleteResponse);
  }

  function deleteResponse(data) {
    alert(data);
    loadData();
  }

  // 🔹 Edit
  function editData(id) {
    callApi("GET", "/getbyId/" + id, null, editResponse);
  }

  function editResponse(data) {
    setSid(data.sid);
    setName(data.sname);
    setDept(data.sdept);
    setSavePopup(true);
  }

  // 🔹 Update
  function updateData() {
    if (name.trim() === "") {
      alert("Enter Name");
      return;
    }

    if (dept.trim() === "") {
      alert("Enter Department");
      return;
    }

    let data = {
      sname: name,
      sdept: dept
    };

    callApi("PUT", "/updateAll/" + sid, data, updateResponse);
  }

  function updateResponse(data) {
    alert(data);
    closeSaveData();
    loadData();
  }

  return (
    <div className='app'>

      {savePopup &&
        <div className='overlay'>
          <div className='panel'>
            <label onClick={closeSaveData}>&times;</label>
            <h3>Student Details</h3>

            <legend>Student Name*</legend>
            <input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <legend>Department*</legend>
            <input
              type='text'
              placeholder='Enter Department'
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />

            {sid === "" ?
              <button onClick={saveData}>Save</button>
              :
              <button onClick={updateData}>Update</button>
            }
          </div>
        </div>
      }

      <div className='header'>Student Details</div>

      <div className='section'>
        <table>
          <thead>
            <tr>
              <th>SID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((ele) => (
              <tr key={ele.sid}>
                <td>{ele.sid}</td>
                <td>{ele.sname}</td>
                <td>{ele.sdept}</td>
                <td>
                  <button onClick={() => editData(ele.sid)}>Edit</button>
                  <button onClick={() => deleteData(ele.sid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='footer'>
        <button onClick={showSaveData}>Add New</button>
      </div>

    </div>
  );
}

export default App;