import API from "./axios";

class Post {
  async createPost(payload) {
    const { files, content, scope } = payload;
    const formData = new FormData();
    formData.append('content', content);
    formData.append('scope', scope);
    files?.forEach(async (file) => {
      formData.append('attach_files', file);
    });

    return await API({
      method: "POST",
      url: "/post/create",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  }

  async getPostById(id) {
    const url = `/post/${id}`;
    try {
      const { data } = await API.get(url);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }

  async getPostTimeline(id, offset) {
    const url = `/post/timeline/${id}?offset=${offset}`;
    try {
      const { data } = await API.get(url);
      return data;
    } catch (error) {
      const data = error.response.data;
      return data;
    }
  }

  async getUserPosted(params) {
    return await API.get(`/post/profile/${params?.username}`, { params });
  }

  async getPostUserLiked(params) {
    return await API.get("/post/like", { params });
  }

  async likeOrUnLikePost(postId) {
    return await API.put(`/post/${postId}/like`);
  }

  async suggestPost() {
    return API.get(`/post/recommend`);
  }

  async hotPost(offset) {
    return await API.get(`/post/hot?offset=${offset}&pageSize=10`);
  }
  async searchPost(params) {
    return await API.get('/post', { params });

  }
  async deletePost(postId) {
    return await API.delete(`/post/${postId}`);
  }
}

export default new Post();
