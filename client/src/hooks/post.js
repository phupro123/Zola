import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Post from '../api/Post';
import Comment from '../api/Comment';
import { toast } from 'react-hot-toast';

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload) => Post.createPost(payload),
    onMutate: () => {
      toast.loading("Đang tạo bài viết...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Tạo bài viết thành công!")
    }
  })
}

export const useHotPost = params => {
  return useQuery({
    queryKey: ['getHotPost', params],
    queryFn: () => Post.hotPost(params),
  });
};

export const useCommentPost = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => Comment.addComment(data),
    onMutate: () => {
      toast.loading('Đang gửi bình luận!');
    },
    onSuccess: data => {
      if (data.message) {
        toast.dismiss();
        queryClient.invalidateQueries(['getCommentByPost', id])
        toast.success('Bình luận thành công!');
      }
    },
  });
};

export const useLikePost = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => Post.likeOrUnLikePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['getPost', id])
    }
  })
}

export const usePostRecommend = () => {
  return useQuery({
    queryKey: ['postRecommend'],
    queryFn: () => Post.suggestPost()
  })
}

export const useSearchPost = () => {
  return useMutation({
    mutationFn: (params) => Post.searchPost(params)
  })
}

export const useDeletePost = (username) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => Post.deletePost(id),
    onMutate: () => {
      toast.loading("Đang xóa bài viết...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getPostUserProfile", username])
      toast.success("Xóa bài viết thành công!")
    }
  })
}
