import { server_name, token_prefix } from "../../namespace";

export const deleteRoom = async ({token, roomId}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/roomDetail/${roomId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_prefix} ${token}`,
            },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        alert('Không thể xóa phòng');
        console.log("Failed to delete parent room: ", error)
    }
}