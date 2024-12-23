import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from '../api/Comment';
import { toast } from 'react-hot-toast';

export const useCommentByPost = param => {
  return useQuery({
    queryKey: ['getCommentByPost', param],
    queryFn: () => Comment.getCommentsByPostId(param),
  });
};

export const useReplyComment = (commentId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => Comment.replyComment(data),
    onMutate: () => {
      toast.loading('Đang gửi...');
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries(["getReplyComment", commentId])
      toast.success('Phản hồi thành công!');
    },
  });
};

export const useGetReplyComment = param => {
  return useQuery({
    queryKey: ['getReplyComment', param],
    queryFn: () => Comment.getReplyComment(param),
  });
};

export const useLikeComment = (postId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => Comment.likeComment(id),
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getCommentByPost", postId])
    }
  })
}
export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => Comment.deleteComment(id),
    onMutate: () => { },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getCommentByPost", postId])
      toast.success("Đã xóa bình luận thành công!")
    }
  })
}