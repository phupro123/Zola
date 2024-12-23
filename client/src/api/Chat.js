import API from "./axios";
class Chat {
  async getRoomOfUser() {
    return await API.get('/room');
  }
  async createRoom(payload) {
    return await API.post("/room/create", payload);
  }

  async getRoomInfo(id) {
    return await API.get(`/room/${id}`);
  }

  async renameRoom(payload) {
    return await API.patch(`/room/change-room-name/${payload?.id}`, payload);
  }

  async leaveRoom(id) {
    return await API.patch(`/room/leave-room/${id}`)
  }

  async checkUserInRoom(params) {
    return await API.get(`/room/check-user`, { params })
  }

  async deleteRoom(id) {
    return await API.delete(`/room/delete-room/${id}`);
  }

  async getMessagesOfRoom(id) {
    return await API.get(`/message/find/${id}`);
  }

  async sendMessage(payload) {
    return await API.post(`/message/send`, payload);
  }

  async sendFileMessage(payload) {
    const formData = new FormData();
    formData.append('roomId', payload?.roomId);
    formData.append('type', payload?.type);
    payload?.attach_files?.forEach(async (file) => {
      formData.append('attach_files', file);
    });

    return await API({
      method: "POST",
      url: "/message/send-file",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  }

  async deleteMessage(params) {
    return await API.delete("/message/recall", { params });
  }

  async addUserToRoom(payload) {
    return await API.patch(`room/add-user/${payload?.roomId}`, payload);
  }
  async removeUserOfRoom(payload) {
    return await API.patch(`room/remove-user/${payload?.roomId}`, payload);
  }
  async getUserInRoom(params) {
    return await API.get("/room/user", { params })
  }

}
export default new Chat();
