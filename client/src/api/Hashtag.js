import API from './axios'

const base = '/hashtag'
export const hashtagAPI = {
  async gelHashtagTreding() {
    return await API.get(`${base}/trending?limit=20`)
  },

}