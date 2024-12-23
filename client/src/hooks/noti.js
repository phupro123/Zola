import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { notiAPI } from "../api/Noti"
import { toast } from "react-hot-toast"

export const useNoti = (params) => {
  return useQuery({
    queryKey: ['getNoti', params?.filter],
    queryFn: () => notiAPI.gelAll(params)
  })
}

export const useCountUnread = () => {
  return useQuery({
    queryKey: ['countUnread'],
    queryFn: () => notiAPI.countUnread()
  })
}

export const useReadNoti = (param) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => notiAPI.readNoti(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['countUnread'])
      queryClient.invalidateQueries(['getNoti', param])
    }
  })
}

export const useDeleteNoti = (param) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => notiAPI.deleteNoti(id),
    onMutate: () => {
      toast.loading("Đang xóa thông báo...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(['getNoti', param])
      queryClient.invalidateQueries(['countUnread'])
      toast.success("Xóa thông báo thành công!")
    }
  })
}