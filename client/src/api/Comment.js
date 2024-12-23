import API from "./axios";
class Comment {
  async addComment(post) {
    try {
      const { data } = await API.post(`/comment/create`, post);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async getCommentsByPostId(postId) {
    try {
      const { data } = await API.get(`/comment/post/${postId}`);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async getCommentsOfUser(username) {
    try {
      const { data } = await API.get(`/comment/user/${username}`);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async replyComment(payload) {
    try {
      const { data } = await API.post(`/comment/create`, payload);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async getReplyComment(id) {
    try {
      const { data } = await API.get(`/comment/reply/${id}`);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }
  async likeComment(id) {
    return await API.put(`/comment/${id}/like`);
  }

  async deleteComment(id) {
    return await API.delete(`/comment/${id}`);
  }
}
export default new Comment();
