import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addRoom } from "./homeSlice";

import { selectToken } from "../auth/authSlice";

function CreateRoom(props) {
  const dispatch = useDispatch();

  const [day_can_teach, setDay_can_teach] = useState([]);
  const [checkedArray, SetCheckedArray] = useState(new Array(7).fill(false)); // to save state check before.
  const days = [2, 3, 4, 5, 6, 7, 8];

  const handleOnChange = (position) => {
    const updateCheckedState = checkedArray.map((item, index) =>
      position === index ? !item : item
    );

    SetCheckedArray(updateCheckedState);

    const empty_array = [];
    updateCheckedState.map((item, index) => {
      if (item) {
        empty_array.push(days[index]);
      }
    });
    setDay_can_teach(empty_array);
  };

  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [lop, setLop] = useState("");
  const [other_require, setOther_require] = useState("");

  const token = useSelector(selectToken);

  const createRoom = () => {
    const roomInfor = {
      day_can_teach: day_can_teach,
      location: location,
      subject: subject,
      lop: lop,
      other_require: other_require,
    };
    const args = {
      roomInfor: roomInfor,
      token: token,
    };
    dispatch(addRoom(args));
  };

  return (
    <div>
      {days.map((day, index) => {
        return (
          <div>
            <label for={index}>{day === 8 ? "chu nhat" : "thu " + day}</label>
            <input
              type="checkbox"
              value={day}
              checked={checkedArray[index]}
              onChange={() => handleOnChange(index)}
              name={String(day)}
              id={index}
            />
          </div>
        );
      })}

      <br />
      <label for="location">location: </label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        id="location"
      />
      <br />
      <label for="subject">subject: </label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        id="subject"
      />
      <br />
      <label for="lop">lop: </label>
      <input
        type="text"
        value={lop}
        onChange={(e) => setLop(e.target.value)}
        id="lop"
      />
      <br />
      <label for="other_require">Other require: </label>
      <input
        type="text"
        value={other_require}
        onChange={(e) => setOther_require(e.target.value)}
        id="other_require"
      />
      <br />
      <button onClick={createRoom}>Create</button>
      <button onClick={props.closeCreateRoom}>Close</button>
    </div>
  );
}

export default CreateRoom;
