import API from "./axios";
class User {
  async getUserByUsername(username, currentUser) {
    try {
      let query;
      if (currentUser) {
        query = `me=${currentUser}`;
      }
      const url = `/user/get/?username=${username}&&${query}`;
      const { data } = await API.get(url);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async getFriends() {
    return await API.get(`/user/friends`);
  }

  async getFollowers(username) {
    try {
      const { data } = await API.get(`/user/followers?username=${username}`);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async getFollowing(username) {
    try {
      const { data } = await API.get(`/user/followings?username=${username}`);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }

  async getFollowStatus(params) {
    return await API.get("/user/get", { params })
  }

  async follow(username) {
    return await API.patch(`/user/follow/${username}`)
  }
  async unFollow(username) {
    return await API.patch(`/user/unfollow/${username}`)
  }

  async getSuggestFriends() {
    return await API.get(`/user/recommend-friends`);
  }

  async searchUser(name) {
    return await API.get(`/user`, { params: { search: name } });
  }

  async getInfoUser(username) {
    return await API.get('/user/get', { params: { username } })
  }

  async changeUsername(payload) {
    return await API.put("/user/change-username", payload)
  }
  async deleteAccount() {
    return await API.delete("/user/destroy")
  }

  async updateInfo(payload) {
    return await API.patch(`/user/update-info`, payload);
  }

  async changeCover(file) {
    const formData = new FormData();
    formData.append('file', file);
    let options = {
      method: 'patch',
      url: "/user/change-cover",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    return await API(options);
  }

  async changeAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);
    let options = {
      method: 'patch',
      url: "/user/change-avatar",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    return await API(options);
  }

}

export default new User();
