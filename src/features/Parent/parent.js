import { server_name } from "../../namespace";

export const deleteRoom = async ({roomId}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/roomDetail/${roomId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        alert('Không thể xóa phòng');
        console.log("Failed to delete parent room: ", error)
    }
}