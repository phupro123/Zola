import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import User from "../api/User"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useFollowStatus = (username, me) => {
  return useQuery({
    queryKey: ['followStatus', username, me],
    queryFn: () => User.getFollowStatus({ username, me })
  })
}
export const useFollowUser = (username, me) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (username) => User.follow(username),
    onMutate: () => {
      toast.loading("Đang gửi yếu cầu theo dõi...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["followStatus", username, me])
      toast.success("Theo dõi thành công!")
    }
  })
}

export const useUnfollowUser = (username, me) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (username) => User.unFollow(username),
    onMutate: () => {
      toast.loading("Đang gửi yêu cầu bỏ theo dõi...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["followStatus", username, me])
      toast.success("Bỏ theo dõi thành công!")
    }
  })
}

export const useFriend = () => {
  return useQuery({
    queryKey: ["getFriend"],
    queryFn: User.getFriends
  })
}

export const useSearchFriend = () => {
  return useMutation({
    mutationFn: (name) => User.searchUser(name)
  })
}

export const userInfoUser = (username) => {
  return useQuery({
    queryKey: ["getInfoUser", username],
    queryFn: () => User.getInfoUser(username)
  })
}

export const useChangeUserName = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => User.changeUsername(payload),
    onMutate: () => {
      toast.loading("Đang kiểm tra thông tin")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getInfo"])
      toast.success("Đổi tên người dùng thành công!")
    }
  })
}

export const useSuggestFriend = () => {
  return useQuery({
    queryKey: ['friendSuggest'],
    queryFn: () => User.getSuggestFriends()
  })
}

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: () => User.deleteAccount(),
    onMutate: () => {
      toast.loading("Đang xóa tài khoản...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.clear();
      localStorage.removeItem('token');
      navigate('/auth/login');
    }
  })
}

export const useUpdateInfo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => User.updateInfo(payload),
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(['getInfo'])
      toast.success("Cập nhật thông tin cá nhân thành công!")
    }
  })
}

export const useChangeCover = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file) => User.changeCover(file),
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(['getInfo'])
      toast.success("Cập nhật hình nền thành công!")
    }
  })
}

export const useChangeAvatar = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file) => User.changeAvatar(file),
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(['getInfo'])
      toast.success("Cập nhật hình đại diện thành công!")
    }
  })
}