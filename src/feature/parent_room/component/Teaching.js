import React from "react";

function Teaching({teach}) {
  return (
    <div>
      <li key={teach.id}>
        id: {teach.id}, tutor: {teach.tutor}, parent_teach: {teach.parent_room}
      </li>
    </div>
  );
}

export default Teaching;
