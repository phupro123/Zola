import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Auth from '../api/Auth';
import nookies from 'nookies';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payload => Auth.login(payload),
    onMutate: () => {
      toast.loading('Đăng nhập vào ứng dụng...');
    },
    onSuccess: data => {
      localStorage.setItem('token', JSON.stringify(data?.data?.token));
      nookies.set(null, 'token', JSON.stringify(data?.data?.token), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      toast.dismiss();
      navigate('/');
      toast.success('Đăng nhập thành công!');
    },
    onError: error => {
      toast.dismiss();
      error?.response ? toast.error(error?.response?.data?.message) : toast.error("Không thể kết nối đến hệ thống!")
    },
  });
};

export const useVerifyUser = () => {
  return useMutation({
    mutationFn: (payload) => Auth.verifyUser(payload)
  })
}

export const useRegister = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: payload => Auth.register(payload),
    onMutate: () => {
      toast.loading('Đăng ký tài khoản...');
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success('Đăng ký thành công!');
      navigate('/auth/login');
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => Auth.logout(),
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('token');
      navigate('/');
    }
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['getInfo'],
    queryFn: Auth.getInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });
};


export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload) => Auth.changePassword(payload),
    onMutate: () => {
      toast.loading("Đang gửi yêu cầu đổi mật khẩu...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Đổi mật khẩu thành công!")
    },
    onError: () => {
      toast.dismiss()
      toast.error("Đổi mật khẩu không thành công!")
    }
  })
}

export const useResetPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (payload) => Auth.resetPassword(payload),
    onMutate: () => {
      toast.loading("Đang thay đổi mật khẩu...")
    },
    onSuccess: () => {
      toast.dismiss()
      navigate('/auth/login')
      toast.success("Mật khẩu đã thay đổi thành công!")
    },
    onError: () => {
      toast.dismiss()
      toast.error("Không thể thay đổi mật khẩu!")
    }
  })
}