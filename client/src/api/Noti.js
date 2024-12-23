import API from './axios'

const base = '/notification'
export const notiAPI = {
  async gelAll(params) {
    return await API.get(base, { params })
  },
  async countUnread() {
    return await API.get(`${base}/count-unread`)
  },
  async readNoti(id) {
    return await API.patch(`${base}/read/${id}`)
  },
  async deleteNoti(id) {
    return await API.delete(`${base}/delete/${id}`)
  }
}