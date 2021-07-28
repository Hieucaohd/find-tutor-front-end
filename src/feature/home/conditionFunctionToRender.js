export const renderThem = (roomId, list_room_waiting, list_room_invited, list_room_try_teaching) => {
    let isRender_1 = false;
    if (
      list_room_waiting &&
      !list_room_waiting.find((waitingId) => waitingId === roomId)
    ) {
      isRender_1 = true;
    }

    let isRender_2 = false;
    if (
      list_room_invited &&
      !list_room_invited.find((invitedId) => invitedId === roomId)
    ) {
      isRender_2 = true;
    }

    let isRender_3 = false;
    if (
      list_room_try_teaching &&
      !list_room_try_teaching.find(
        (try_teachingId) => try_teachingId === roomId
      )
    ) {
      isRender_3 = true;
    }

    return isRender_1 && isRender_2 && isRender_3;
  };