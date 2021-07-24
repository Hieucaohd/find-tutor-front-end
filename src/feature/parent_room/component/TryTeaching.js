import React from "react";

function TryTeaching({tryTeach, addToTeaching, deleteFromTryTeaching, userId}) {
  return (
    <div>
      <li key={tryTeach.id}>
        id: {tryTeach.id}, tutor: {tryTeach.tutor}, parent_try_teach:
        {tryTeach.parent_room}
        {tryTeach.parent_room === userId && !tryTeach.parent_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y thue
          </button>
        ) : null}
        {tryTeach.parent_agree && tryTeach.parent_room === userId ? (
          <button>Cho gia su dong y</button>
        ) : null}
        {tryTeach.tutor === userId && !tryTeach.tutor_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y day chinh thuc
          </button>
        ) : null}
        {tryTeach.tutor_agree && tryTeach.tutor === userId ? (
          <button>Cho phu huynh dong y</button>
        ) : null}
        {tryTeach.tutor === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong day tiep
          </button>
        ) : null}
        {tryTeach.parent_room === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong muon tiep tuc thue
          </button>
        ) : null}
      </li>
    </div>
  );
}

export default TryTeaching;
