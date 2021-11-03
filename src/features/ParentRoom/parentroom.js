import { server_name, token_prefix } from "namespace";

export const deleteFromWaitingList = async ({waitingId, token}) => {
    try {
        await fetch(
            `${server_name}/findTutor/waitingTutorDetail/${waitingId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
              },
            }
        );
        return true;
    } catch (error) {
        console.log("Failed to delete tutor from waiting list: ", error);
    }
}

export const deleteTutorFromTeachingList = async ({teachingId, token}) => {
    try {
        await fetch(
            `${server_name}/findTutor/teachingDetail/${teachingId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
              },
            }
        );
        return true;
    } catch(error) {
        console.log("Failed to delete tutors from teaching list: ", error)
    }
}

export const isOnList = (userId, waitingList) => {
  if(!waitingList) return false;
  if(waitingList?.length === 0) {
    return false;
  }
  for(let i = 0; i<waitingList?.length; i++) {
    if(Number(waitingList[i]?.tutor?.user?.id) === Number(userId)) {
      return true;
    }
  }
  return false;
}