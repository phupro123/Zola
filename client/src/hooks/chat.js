import { useEffect, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SocketContext } from '~/context/socket';
import { playSound } from '../helpers/file';
import { useUser } from './auth';
import Chat from '../api/Chat';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export const useChat = () => {
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const { data: user } = useUser();
  useQuery({
    queryKey: ['getRooms'],
    queryFn: () => Chat.getRoomOfUser(),
    onSuccess: data => {
      const rooms = data?.data?.Rooms?.map(room => room?._id);
      socket.emit('join_room', {
        _id: user?.data?.data?._id,
        username: user?.data?.data?.username,
        rooms,
      });
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!user?.data?.data?.username,
  });

  useEffect(() => {

    socket.emit('connection');
    socket.off('receive_message').on('receive_message', async data => {
      if (data?.userId !== user?.data?.data?._id) {
        document.title = `${data?.sender?.fullname} đã gửi ${data?.content}`;
        playSound();
      }

      queryClient.setQueryData(['getMessageOfRoom', data?.roomId], oldData => {
        oldData?.data?.messages.push({ ...data, messageType: user?.data?.data?.username === data?.sender?.username ? 'sender' : 'receiver' })
        return oldData
      }
      );
      queryClient.invalidateQueries(["getMessageOfRoom", data?.roomId])
    });

    socket.on('recall_message', data => {
      queryClient.setQueryData(['getMessageOfRoom', data?.roomId], oldData => {
        const update = entity => {
          if (entity.nanoid === data?.nanoid) {
            return { ...entity, deleted_at: Date.now() };
          }
          return entity;
        };

        return { ...oldData, data: { messages: oldData?.data?.messages.map(update) } }

      });
    });

  }, []);
}

export const useGetAllRoom = () => {
  return useQuery({
    queryKey: ["getAllRoom"],
    queryFn: () => Chat.getRoomOfUser(),

  })
}
export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.createRoom(payload),
    onMutate: () => {
      toast.loading("Đang gửi yêu cầu tạo nhóm...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Tạo nhóm thành công!")
      queryClient.invalidateQueries(['getAllRoom'])
    },
    onError: (error) => {
      toast.dismiss()
      toast.error(error?.message)
    }
  })
}

export const useGroupInfo = (id) => {
  return useQuery({
    queryKey: ['getGroupInfo', id],
    queryFn: () => Chat.getRoomInfo(id)
  })
}

export const useRenameGroup = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.renameRoom(payload),
    onMutate: () => {
      toast.loading("Đang gửi yêu cầu...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getGroupInfo", id])
      queryClient.invalidateQueries(["getAllRoom"])
      toast.success("Đổi tên nhóm thành công!")
    }
  })
}
export const useLeaveGroup = (id) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (id) => Chat.leaveRoom(id),
    onMutate: () => {
      toast.loading("Đang rời nhóm...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getAllRoom"])
      navigate("/messages")
      toast.success("Rời nhóm thành công!")
    },
    onError: () => {
      toast.dismiss()
      toast.error("Không thể rời nhóm!")
    }
  })
}


export const useMessageInRoom = (id) => {
  return useQuery({
    queryKey: ["getMessageOfRoom", id],
    queryFn: () => Chat.getMessagesOfRoom(id),
    staleTime: Infinity,
  })
}

export const useCreateMessage = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.sendMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessageOfRoom", id])
    }
  })
}

export const useSendFileMessage = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.sendFileMessage(payload),
    onMutate: () => {
      toast.loading("Đang gửi hình...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getMessageOfRoom", id])
      toast.success("Gửi hình thành công!")
    }
  })
}

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: (payload) => Chat.deleteMessage(payload)
  })
}

export const useRemoveUserOfRoom = (roomId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.removeUserOfRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["getGroupInfo", roomId])
      queryClient.invalidateQueries(["getUserInRoom", roomId])

    },
    onError: () => {
      toast.error("Không thể xóa thành viên!")
    }
  })
}

export const useAddUserToRoom = (roomId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => Chat.addUserToRoom(payload),
    onMutate: () => {
      toast.loading("Đang thêm thành viên vào phòng...")
    },
    onSuccess: () => {
      toast.dismiss()
      queryClient.invalidateQueries(["getGroupInfo", roomId])
      toast.success("Thêm bạn vào phòng thành công!")
    },
    onError: () => {
      toast.dismiss()
      toast.error("Không thể thêm thành viên!")
    }
  })
}

export const useDeleteRoom = (roomId) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (roomId) => Chat.deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllRoom"])
      navigate('/messages')
    },
    onError: () => {
      toast.dismiss()
      toast.error("Không thể xóa nhóm!")
    }
  })
}

export const useUserInRoom = (roomId) => {
  return useQuery({
    queryKey: ['getUserInRoom', roomId],
    queryFn: () => Chat.getUserInRoom({ roomId })
  })
}