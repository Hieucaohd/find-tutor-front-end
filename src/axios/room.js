import axios from "axios";
import { server_name, token_prefix } from "namespace";

export const deleteRoom = async ({roomId}) => {
    return axios({
        method: 'delete',
        url: `${server_name}/findTutor/roomDetail/${roomId}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
    }).then(response => {
        if(response.data) return response.data;
    }).catch(error => {
        console.log("Failed to delete parent room: ", error);
    })
}

export const deleteFromWaitingList = async ({waitingId}) => {
    return axios({
        method: 'delete',
        url: `${server_name}/findTutor/waitingTutorDetail/${waitingId}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        }
    }).then(response => {
        if(response.data) return true;
    }).catch(error => {
        console.log("Failed to delete tutor from waiting list: ", error);
        return false;
    })
}

export const deleteTutorFromTeachingList = async ({teachingId}) => {
    return axios({
        method: 'delete',
        url: `${server_name}/findTutor/teachingDetail/${teachingId}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        }
    }).then(response => {
        if(response.data) return true;
    }).catch(error => {
        console.log("Failed to delete tutor from teaching list: ", error);
        return false;
    })
}