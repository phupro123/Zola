import { useMutation } from "@tanstack/react-query"
import Otp from "../api/Otp"
import { toast } from "react-hot-toast"

export const useOtp = () => {
  return useMutation({
    mutationFn: (payload) => Otp.getOtp(payload),
    onMutate: () => {
      toast.loading("Đang gửi mã xác nhận...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Chúng tôi đã gửi mã xác nhận, vui lòng kiểm tra email của bạn!")
    },
    onError: () => {
      toast.dismiss();
      toast.error("Email đã được sử dụng bởi một tài khoản khác!")
    }
  })
}


export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (payload) => Otp.verifyOtp(payload),
    onError: () => {
      toast.error("Mã xác nhận không chính xác!")
    }
  })
}

export const useForgotOtp = () => {
  return useMutation({
    mutationFn: (payload) => Otp.getForgotOtp(payload),
    onMutate: () => {
      toast.loading("Đang gửi mã xác nhận...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Chúng tôi đã gửi mã xác nhận, vui lòng kiểm tra email của bạn!")
    },
    onError: () => {
      toast.dismiss();
      toast.error("Email đã được sử dụng bởi một tài khoản khác!")
    }
  })
}


export const useVerifyForgotOtp = () => {
  return useMutation({
    mutationFn: (payload) => Otp.verifyForgotOtp(payload),
    onMutate: () => {
      toast.loading("Đang xác nhập mã...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Vui lòng nhập mật khẩu mới!")
    },
    onError: () => {
      toast.dismiss()
      toast.error("Mã xác nhận không chính xác!")
    }
  })
}